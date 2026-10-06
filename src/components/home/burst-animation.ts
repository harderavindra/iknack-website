// Hand-rolled Canvas2D "iridescent burst" hero animation — ribbons rendered with a
// lightweight 3D projection, mouse-driven tilt/spin, scroll-driven fly-in zoom, and
// service words that reveal themselves (blurred → sharp, tinted by the burst colours)
// while the mouse keeps moving. Lives in its own module (rather than inline in
// HomeContent.tsx) since it's a large, self-contained rendering engine unrelated to
// the GSAP/Lenis scroll-trigger setup around it — the caller only needs
// `updateScrollZoom()` (call from the page's scroll handler) and `destroy()` (call on
// unmount).

const COUNT = 52; // ribbons
const DARK_RATIO = 0.28; // share of dark ribbons that cut across the colour (depth / shadow)
const BASE_SPIN = 0.08; // idle rotation (rad/s)
const MOUSE_SPIN = 9; // how strongly mouse speed adds rotation
const MAX_SPIN = 7; // cap on extra spin (rad/s)
const SPIN_DECAY = 0.2; // fraction of extra spin left after 1s (lower = settles faster)
const SMEAR = 0.045; // motion-blur length per rad/s of rotation
const SMEAR_MIN = 0.035; // always a bit of smear for the soft look
const SMEAR_MAX = 0.32; // max smear angle (rad)
const SMEAR_STEPS = 6; // copies used for the rotational blur
const TWIST = 0.45;
const TILT_X = 0.8;
const TILT_Y = 1.0;
const DEPTH = 0.35;
const ZOOM_MAX = 0.72; // how much the ribbons fly in on scroll (0 = no zoom, 1 = full zoom)
const HOVER_R = 0.2;
const LINE_WIDTH = 0.5; // streak line thickness in screen px
const SCROLL_ZOOM = true; // page scroll drives the fly-in (Z) without capturing the scroll

// ---- Words that ride on the streaks ----
const WORD_FONT = '700 {size}px "Barlow Condensed", Poppins, "Arial Narrow", "Roboto Condensed", sans-serif';
const WORD_HOLD = 1.1; // seconds a word stays after the mouse stops
const WORD_CYCLE = 1.4; // while moving, a new word lands on a streak this often
const WORD_FADE_IN = 6;
const WORD_FADE_OUT = 0.9; // slow fade, so 2-3 words can be on screen together
const WORD_POS = 0.55; // where on the streak the word sits (0 = centre, 1 = tip)
const WORD_SLIDE = 0.2; // word slides out from the centre along its streak as it appears
const WORD_SIZE = 0.55; // text height relative to the streak's width at that point
const WORD_MIN = 24; // px
const WORD_MAX = 34; // px
const WORD_TRACK = 0.02; // letter spacing (em)
const WORD_TINT = 0.12; // 0 = pure white, 1 = coloured by the streak
const WORD_SHADOW = 0.55; // soft dark halo for legibility
const WORD_MAX_TILT = 40; // only streaks within this many degrees of horizontal carry text (readable)

const HUES = [190, 200, 210, 185, 175, 230, 0, 10, 20, 30, 45, 120, 350];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

type Fiber = { pos: number; a: number; dash: number[]; flow: number };
type Streak = {
  a: number;
  r0: number;
  len: number;
  w: number;
  z: number;
  elev: number;
  hue: number;
  curve: number;
  phase: number;
  breath: number;
  drift: number;
  alpha: number;
  dark: boolean;
  fibers: Fiber[];
};
type Cam = { f: number; push: number; ox: number; oy: number; cx: number; sx: number; cy: number; sy: number };
type Point = { x: number; y: number; k: number };
type BuiltRibbon = { s: Streak; p0: Point; p1a: Point; p1b: Point; pa: Point; pb: Point; k: number };
type Word = { text: string; a: number; s: Streak | null; lost: boolean };
type RibbonPoint = { x: number; y: number; tx: number; ty: number; w: number };

const DEFAULT_WORDS = ["Creative", "Video Production", "Photography", "Design", "Solutions", "Social Media", "Branding", "Campaigns", "Content Creation", "Strategy", "Innovation"];

export type BurstAnimation = {
  updateScrollZoom: () => void;
  destroy: () => void;
};

export function createBurstAnimation(canvas: HTMLCanvasElement, hero: HTMLElement, labels: string[] = []): BurstAnimation {
  const ctx2d = canvas.getContext("2d");
  if (!ctx2d) return { updateScrollZoom: () => {}, destroy: () => {} };
  const ctx: CanvasRenderingContext2D = ctx2d;

  // Layers: ribbons → smear (rotational blur) → tiny glow (cheap huge bloom) → words
  const ribbons = document.createElement("canvas");
  const rctx = ribbons.getContext("2d")!;
  const fibersL = document.createElement("canvas"); // crisp striations
  const fctx = fibersL.getContext("2d")!;
  const fsmear = document.createElement("canvas");
  const fsctx = fsmear.getContext("2d")!;
  const smear = document.createElement("canvas");
  const sctx = smear.getContext("2d")!;
  const glow = document.createElement("canvas");
  const gctx = glow.getContext("2d")!;
  const textL = document.createElement("canvas"); // words, tinted by the burst
  const tctx = textL.getContext("2d")!;
  const R_SCALE = 0.5,
    G_SCALE = 0.14,
    F_SCALE = 1; // striations render at full resolution
  const FS_K = F_SCALE / R_SCALE;

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const streaks: Streak[] = Array.from({ length: COUNT }, (_, i) => {
    const fiberN = 8 + ((Math.random() * 10) | 0);
    return {
      a: (i / COUNT) * Math.PI * 2 + rand(-0.15, 0.15),
      r0: rand(0.06, 0.14),
      len: rand(0.45, 1.0),
      w: rand(0.012, 0.05), // wide ribbons
      z: rand(-DEPTH, DEPTH),
      elev: rand(-0.5, 0.5),
      hue: HUES[(Math.random() * HUES.length) | 0] + rand(-10, 10),
      curve: rand(-1, 1),
      phase: rand(0, Math.PI * 2),
      breath: rand(0.25, 0.7),
      drift: rand(-0.03, 0.03),
      alpha: rand(0.35, 0.8),
      dark: Math.random() < DARK_RATIO,
      fibers: Array.from({ length: fiberN }, () => ({
        pos: rand(-0.9, 0.9),
        a: rand(0.15, 0.7),
        dash: [rand(10, 60), rand(2, 18), rand(4, 30), rand(2, 10)],
        flow: rand(20, 70),
      })),
    };
  });

  // ================= Input =================
  const input = {
    mx: 0.5,
    my: 0.5,
    rotX: 0,
    rotY: 0,
    zoom: 0,
    zoomT: 0,
    spin: 0,
    spinVel: 0,
    px: null as number | null,
    py: null as number | null,
    pAng: null as number | null,
    dir: 1,
  };
  let lastMove = -1e9;

  const handlePointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const lx = e.clientX - rect.left,
      ly = e.clientY - rect.top;
    input.mx = lx / rect.width;
    input.my = ly / rect.height;
    if (input.px !== null && input.py !== null && input.pAng !== null) {
      const dx = e.clientX - input.px,
        dy = e.clientY - input.py;
      const speed = Math.hypot(dx, dy) / Math.max(rect.width, rect.height);
      // Direction: circling the centre clockwise / anticlockwise steers the spin
      const ang = Math.atan2(ly - rect.height / 2, lx - rect.width / 2);
      let dAng = ang - input.pAng;
      if (dAng > Math.PI) dAng -= Math.PI * 2;
      if (dAng < -Math.PI) dAng += Math.PI * 2;
      if (Math.abs(dAng) > 0.002) input.dir = Math.sign(dAng);
      // Any movement speeds the spin up, in the current direction
      input.spinVel = clamp(input.spinVel + input.dir * speed * MOUSE_SPIN, -MAX_SPIN, MAX_SPIN);
      input.pAng = ang;
    } else {
      input.pAng = Math.atan2(ly - rect.height / 2, lx - rect.width / 2);
    }
    input.px = e.clientX;
    input.py = e.clientY;
    lastMove = performance.now();
  };
  const handlePointerLeave = () => {
    input.px = null;
  };
  hero.addEventListener("pointermove", handlePointerMove);
  hero.addEventListener("pointerleave", handlePointerLeave);

  // Called from the page's own scroll handler (Lenis-driven here, not a native
  // `scroll` listener) — reads scroll progress only, never blocks it.
  function updateScrollZoom() {
    if (!SCROLL_ZOOM) return;
    const r = hero.getBoundingClientRect();
    const progress = clamp(-r.top / r.height, 0, 1); // 0 = hero at top, 1 = scrolled past
    input.zoomT = progress * ZOOM_MAX;
  }

  // Pause rendering while the hero is off-screen
  let heroVisible = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
  });
  visibilityObserver.observe(hero);

  // ================= Words =================
  const WORDS = (labels.length > 0 ? labels : DEFAULT_WORDS).map((w) => w.toUpperCase());
  const words: Word[] = WORDS.map((text) => ({ text, a: 0, s: null, lost: false }));
  let cur = -1,
    wasMoving = false,
    shownFor = 0;
  let ribbonList: BuiltRibbon[] = [];
  const hasTracking = "letterSpacing" in tctx;

  // Point, direction and width at parameter t along a ribbon (its edges are quadratic curves)
  function ribbonAt(r: BuiltRibbon, t: number): RibbonPoint {
    const u = 1 - t;
    const ex = (r.p1a.x + r.p1b.x) / 2,
      ey = (r.p1a.y + r.p1b.y) / 2;
    const cx = (r.pa.x + r.pb.x) / 2,
      cy = (r.pa.y + r.pb.y) / 2;
    const wx = 2 * u * t * (r.pa.x - r.pb.x) + t * t * (r.p1a.x - r.p1b.x);
    const wy = 2 * u * t * (r.pa.y - r.pb.y) + t * t * (r.p1a.y - r.p1b.y);
    return {
      x: u * u * r.p0.x + 2 * u * t * cx + t * t * ex,
      y: u * u * r.p0.y + 2 * u * t * cy + t * t * ey,
      tx: 2 * u * (cx - r.p0.x) + 2 * t * (ex - cx),
      ty: 2 * u * (cy - r.p0.y) + 2 * t * (ey - cy),
      w: Math.hypot(wx, wy),
    };
  }

  // The bright streak closest to the pointer (and not already carrying a word)
  function pickStreak(scale: number): Streak | null {
    const used = new Set(words.filter((w) => w.a > 0.05 && w.s).map((w) => w.s));
    const mx = input.mx * canvas.width,
      my = input.my * canvas.height;
    let best: Streak | null = null,
      bd = Infinity;
    for (const r of ribbonList) {
      if (r.s.dark || used.has(r.s) || r.k < 0.6) continue;
      const b = ribbonAt(r, WORD_POS);
      if (Math.abs((Math.atan(b.ty / b.tx) * 180) / Math.PI) > WORD_MAX_TILT) continue; // too steep to read
      const d = Math.hypot(b.x * scale - mx, b.y * scale - my) - b.w * scale * 0.6; // prefer wide streaks
      if (d < bd) {
        bd = d;
        best = r.s;
      }
    }
    return best;
  }

  function updateWords(dt: number, now: number, scale: number) {
    const moving = (now - lastMove) / 1000 < WORD_HOLD;
    if (moving) {
      if (!wasMoving || shownFor > WORD_CYCLE) {
        cur = (cur + 1) % words.length;
        const w = words[cur];
        w.s = pickStreak(scale);
        w.a = 0;
        w.lost = false;
        shownFor = 0;
      }
      shownFor += dt;
    }
    wasMoving = moving;
    if (moving && words[cur] && words[cur].lost) shownFor = WORD_CYCLE + 1; // streak turned away → next word now
    for (let i = 0; i < words.length; i++) {
      const w = words[i],
        target = moving && i === cur && w.s && !w.lost ? 1 : 0;
      w.a += (target - w.a) * (1 - Math.exp(-dt * (target ? WORD_FADE_IN : WORD_FADE_OUT)));
    }
  }

  function drawWords(W: number, H: number, omega: number, smearSrc: HTMLCanvasElement, scale: number) {
    if (!words.some((w) => w.a > 0.004)) return;
    const byStreak = new Map(ribbonList.map((r) => [r.s, r]));
    const spinBlur = Math.min(Math.abs(omega) * 0.8, 4) * DPR;

    tctx.setTransform(1, 0, 0, 1, 0, 0);
    tctx.globalCompositeOperation = "source-over";
    tctx.clearRect(0, 0, W, H);
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";
    for (const w of words) {
      if (w.a < 0.004 || !w.s) continue;
      const r = byStreak.get(w.s);
      if (!r) {
        w.a *= 0.85; // streak went out of view → fade
        continue;
      }
      const hidden = 1 - w.a;
      const b = ribbonAt(r, WORD_POS - hidden * WORD_SLIDE);
      // streak has rotated too steep to read → let this word go
      if (Math.abs((Math.atan(b.ty / b.tx) * 180) / Math.PI) > WORD_MAX_TILT + 12) w.lost = true;
      if (w.lost) w.a *= 0.86;
      let ang = Math.atan2(b.ty, b.tx); // along the streak, pointing outward
      if (Math.cos(ang) < 0) ang += Math.PI; // keep text readable left → right
      const size = clamp(b.w * scale * WORD_SIZE, WORD_MIN * DPR, WORD_MAX * DPR) * (1 + hidden * 0.15);
      tctx.save();
      tctx.globalAlpha = w.a;
      tctx.filter = `blur(${hidden * 10 * DPR + spinBlur}px)`;
      tctx.font = WORD_FONT.replace("{size}", String(size));
      if (hasTracking) tctx.letterSpacing = `${size * (WORD_TRACK + hidden * 0.3)}px`;
      tctx.fillStyle = "#ffffff";
      tctx.translate(b.x * scale, b.y * scale);
      tctx.rotate(ang);
      tctx.fillText(w.text, 0, 0);
      tctx.restore();
    }
    // faint tint from the streak colours so the white sits in the scene
    tctx.globalCompositeOperation = "source-atop";
    tctx.filter = "brightness(2.6) saturate(1.5)";
    tctx.globalAlpha = WORD_TINT;
    tctx.drawImage(smearSrc, 0, 0, W, H);
    tctx.globalAlpha = 1;
    tctx.filter = "none";
    tctx.globalCompositeOperation = "source-over";

    // halo → glow → solid letters on top
    ctx.globalCompositeOperation = "source-over";
    ctx.filter = `blur(${8 * DPR}px) brightness(0)`;
    ctx.globalAlpha = WORD_SHADOW;
    ctx.drawImage(textL, 0, 0);
    ctx.globalCompositeOperation = "lighter";
    ctx.filter = `blur(${7 * DPR}px)`;
    ctx.globalAlpha = 0.4;
    ctx.drawImage(textL, 0, 0);
    ctx.filter = "none";
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.drawImage(textL, 0, 0);
  }

  // ================= Sizing =================
  let DPR = 1;
  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * DPR);
    canvas.height = Math.round(canvas.clientHeight * DPR);
    ribbons.width = smear.width = Math.round(canvas.width * R_SCALE);
    ribbons.height = smear.height = Math.round(canvas.height * R_SCALE);
    fibersL.width = fsmear.width = Math.round(canvas.width * F_SCALE);
    fibersL.height = fsmear.height = Math.round(canvas.height * F_SCALE);
    glow.width = Math.max(2, Math.round(canvas.width * G_SCALE));
    glow.height = Math.max(2, Math.round(canvas.height * G_SCALE));
    textL.width = canvas.width;
    textL.height = canvas.height;
  }
  window.addEventListener("resize", resize);
  resize();
  if (typeof document.fonts !== "undefined") {
    document.fonts.load(WORD_FONT.replace("{size}", "40"));
  }

  // ================= 3D =================
  function project(x: number, y: number, z: number, cam: Cam): Point | null {
    const x1 = x * cam.cy + z * cam.sy;
    const z1 = -x * cam.sy + z * cam.cy;
    const y2 = y * cam.cx - z1 * cam.sx;
    const z2 = y * cam.sx + z1 * cam.cx;
    const denom = cam.f + z2 - cam.push;
    if (denom < cam.f * 0.12) return null;
    const k = cam.f / denom;
    return { x: cam.ox + x1 * k, y: cam.oy + y2 * k, k };
  }

  function buildRibbon(s: Streak, cam: Cam, S: number, t: number): BuiltRibbon | null {
    const ang = s.a + input.spin + s.drift * t + Math.sin(t * 0.35 + s.phase) * 0.05;
    const pulse = 0.75 + 0.25 * Math.sin(t * s.breath + s.phase);
    const start = s.r0 * S,
      end = start + s.len * S * pulse;
    const half = s.w * S * (0.85 + 0.3 * pulse);
    const dx = Math.cos(ang),
      dy = Math.sin(ang),
      nx = -dy,
      ny = dx;
    const bend = s.curve * TWIST * s.len * S * 0.35;
    const zAt = (r: number) => s.z * S + (r - start) * s.elev;
    const m = start + (end - start) * 0.55;
    const mx = dx * m + nx * bend,
      my = dy * m + ny * bend,
      mz = zAt(m);
    const p0 = project(dx * start, dy * start, zAt(start), cam);
    const p1a = project(dx * end + nx * half * 0.9, dy * end + ny * half * 0.9, zAt(end), cam);
    const p1b = project(dx * end - nx * half * 0.9, dy * end - ny * half * 0.9, zAt(end), cam);
    const pa = project(mx + nx * half * 2, my + ny * half * 2, mz, cam);
    const pb = project(mx - nx * half * 2, my - ny * half * 2, mz, cam);
    if (!p0 || !p1a || !p1b || !pa || !pb) return null;
    return { s, p0, p1a, p1b, pa, pb, k: (pa.k + pb.k) / 2 };
  }

  function drawRibbon(
    c: CanvasRenderingContext2D,
    fc: CanvasRenderingContext2D,
    r: BuiltRibbon,
    t: number,
    hx: number,
    hy: number,
    hr: number
  ) {
    const { s, p0, p1a, p1b, pa, pb, k } = r;
    const p1x = (p1a.x + p1b.x) / 2,
      p1y = (p1a.y + p1b.y) / 2;

    let depthA = clamp(Math.pow(k, 0.9), 0.25, 1.6);
    if (k > 5) depthA *= clamp(1 - (k - 5) / 4, 0, 1);

    const shape = (x: CanvasRenderingContext2D = c) => {
      x.beginPath();
      x.moveTo(p0.x, p0.y);
      x.quadraticCurveTo(pa.x, pa.y, p1a.x, p1a.y);
      x.lineTo(p1b.x, p1b.y);
      x.quadraticCurveTo(pb.x, pb.y, p0.x, p0.y);
    };

    // Dark ribbon: occludes colour behind it (gives the layered, shadowed depth)
    if (s.dark) {
      const g = c.createLinearGradient(p0.x, p0.y, p1x, p1y);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.3, `rgba(0,0,0,${0.85 * clamp(depthA, 0, 1)})`);
      g.addColorStop(0.85, `rgba(0,0,0,${0.75 * clamp(depthA, 0, 1)})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      c.globalCompositeOperation = "source-over";
      shape();
      c.fillStyle = g;
      c.fill();
      fc.globalCompositeOperation = "destination-out";
      shape(fc);
      fc.fillStyle = g;
      fc.fill();
      fc.globalCompositeOperation = "lighter";
      return;
    }

    const d = Math.hypot((pa.x + pb.x) / 2 - hx, (pa.y + pb.y) / 2 - hy);
    const hover = d < hr ? 1 + 1.2 * Math.pow(1 - d / hr, 2) : 1;
    const a = clamp(s.alpha * depthA * hover, 0, 1);
    const h = s.hue + Math.sin(t * 0.2 + s.phase) * 18;

    // Body: soft, low-alpha fill
    const g = c.createLinearGradient(p0.x, p0.y, p1x, p1y);
    g.addColorStop(0.0, `hsla(${h - 25}, 100%, 45%, 0)`);
    g.addColorStop(0.25, `hsla(${h - 10}, 100%, 35%, ${a * 0.3})`);
    g.addColorStop(0.55, `hsla(${h + 15}, 100%, 42%, ${a * 0.45})`);
    g.addColorStop(0.85, `hsla(${h + 40}, 100%, 40%, ${a * 0.35})`);
    g.addColorStop(1.0, `hsla(${h + 55}, 100%, 40%, 0)`);
    c.globalCompositeOperation = "lighter";
    shape();
    c.fillStyle = g;
    c.fill();

    // Striations: thin bright broken lines flowing along the ribbon, on their own crisp layer
    const fg = fc.createLinearGradient(p0.x, p0.y, p1x, p1y);
    fg.addColorStop(0.0, `hsla(${h}, 100%, 70%, 0)`);
    fg.addColorStop(0.3, `hsla(${h + 10}, 100%, 66%, ${a})`);
    fg.addColorStop(0.65, `hsla(${h + 30}, 95%, 78%, ${a})`);
    fg.addColorStop(1.0, `hsla(${h + 55}, 100%, 65%, 0)`);
    fc.globalCompositeOperation = "lighter";
    fc.strokeStyle = fg;
    fc.lineWidth = (LINE_WIDTH * DPR * F_SCALE * clamp(k, 0.7, 1.4)) / FS_K; // layer is scaled by FS_K
    for (const f of s.fibers) {
      const u = (f.pos + 1) / 2; // 0..1 across the ribbon
      const cxp = pb.x + (pa.x - pb.x) * u,
        cyp = pb.y + (pa.y - pb.y) * u;
      const ex = p1b.x + (p1a.x - p1b.x) * u,
        ey = p1b.y + (p1a.y - p1b.y) * u;
      fc.globalAlpha = f.a;
      fc.setLineDash(f.dash);
      fc.lineDashOffset = -t * f.flow;
      fc.beginPath();
      fc.moveTo(p0.x, p0.y);
      fc.quadraticCurveTo(cxp, cyp, ex, ey);
      fc.stroke();
    }
    fc.setLineDash([]);
    fc.globalAlpha = 1;
  }

  // ================= Loop =================
  let t = 0,
    last = performance.now();
  let destroyed = false;
  let rafId = 0;

  function loop(now: number) {
    if (destroyed) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!heroVisible) {
      rafId = requestAnimationFrame(loop);
      return;
    }
    t += dt * (reduceMotion ? 0 : 1);

    const e = 1 - Math.pow(0.001, dt);
    input.rotY += ((input.mx - 0.5) * TILT_Y - input.rotY) * e;
    input.rotX += ((0.5 - input.my) * TILT_X - input.rotX) * e;
    input.zoom += (input.zoomT - input.zoom) * e;
    input.spinVel *= Math.pow(SPIN_DECAY, dt);
    const omega = (reduceMotion ? 0 : BASE_SPIN * input.dir) + input.spinVel;
    input.spin += omega * dt;

    const rw = ribbons.width,
      rh = ribbons.height;
    const S = Math.max(rw, rh) * 0.62;
    const cam: Cam = {
      f: S * 1.6,
      push: input.zoom * S * 1.6,
      ox: rw * (0.5 + (input.mx - 0.5) * 0.08),
      oy: rh * (0.48 + (input.my - 0.5) * 0.08),
      cx: Math.cos(input.rotX),
      sx: Math.sin(input.rotX),
      cy: Math.cos(input.rotY),
      sy: Math.sin(input.rotY),
    };

    // 1. Ribbons, sorted far → near so dark ribbons occlude properly
    const list: BuiltRibbon[] = [];
    for (const s of streaks) {
      const r = buildRibbon(s, cam, S, t);
      if (r) list.push(r);
    }
    list.sort((a, b) => a.k - b.k);
    ribbonList = list;
    rctx.globalCompositeOperation = "source-over";
    rctx.clearRect(0, 0, rw, rh);
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.globalCompositeOperation = "source-over";
    fctx.clearRect(0, 0, fibersL.width, fibersL.height);
    fctx.setTransform(FS_K, 0, 0, FS_K, 0, 0); // same coordinates as the ribbon layer
    const hx = input.mx * rw,
      hy = input.my * rh,
      hr = Math.max(rw, rh) * HOVER_R;
    for (const r of list) drawRibbon(rctx, fctx, r, t, hx, hy, hr);

    // 2. Rotational motion blur around the burst centre — longer when spinning faster
    const o = project(0, 0, 0, cam) || { x: rw / 2, y: rh / 2, k: 1 };
    const smearAng = clamp(Math.abs(omega) * SMEAR, SMEAR_MIN, SMEAR_MAX) * Math.sign(omega || 1);
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.globalCompositeOperation = "source-over";
    sctx.clearRect(0, 0, rw, rh);
    sctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < SMEAR_STEPS; i++) {
      const f = i / (SMEAR_STEPS - 1); // 0 = now, 1 = oldest
      sctx.setTransform(1, 0, 0, 1, 0, 0);
      sctx.translate(o.x, o.y);
      sctx.rotate(-smearAng * f);
      sctx.translate(-o.x, -o.y);
      sctx.globalAlpha = (1 - f * 0.7) / (SMEAR_STEPS * 0.62);
      sctx.drawImage(ribbons, 0, 0);
    }
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.globalAlpha = 1;

    // Striations get a much shorter smear so they stay crisp, like the reference
    const FS = 3,
      fAng = smearAng * 0.3;
    fsctx.setTransform(1, 0, 0, 1, 0, 0);
    fsctx.globalCompositeOperation = "source-over";
    fsctx.clearRect(0, 0, fsmear.width, fsmear.height);
    fsctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < FS; i++) {
      const f = i / (FS - 1);
      fsctx.setTransform(1, 0, 0, 1, 0, 0);
      fsctx.translate(o.x * FS_K, o.y * FS_K);
      fsctx.rotate(-fAng * f);
      fsctx.translate(-o.x * FS_K, -o.y * FS_K);
      fsctx.globalAlpha = (1 - f * 0.6) / (FS * 0.7);
      fsctx.drawImage(fibersL, 0, 0);
    }
    fsctx.setTransform(1, 0, 0, 1, 0, 0);
    fsctx.globalAlpha = 1;

    // 3. Tiny glow layer: downscale + blur, then upscale = big, cheap bloom
    gctx.clearRect(0, 0, glow.width, glow.height);
    gctx.filter = "blur(2px)";
    gctx.drawImage(smear, 0, 0, glow.width, glow.height);
    gctx.filter = "none";

    // 4. Composite
    const W = canvas.width,
      H = canvas.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.85;
    ctx.drawImage(glow, 0, 0, W, H); // wide bloom
    ctx.filter = `blur(${7 * DPR}px)`;
    ctx.globalAlpha = 0.9;
    ctx.drawImage(smear, 0, 0, W, H); // soft ribbon bodies
    ctx.filter = "none";
    ctx.globalAlpha = 0.35;
    ctx.drawImage(smear, 0, 0, W, H); // a little body definition
    ctx.globalAlpha = 1;
    ctx.drawImage(fsmear, 0, 0, W, H); // crisp striations on top
    ctx.globalAlpha = 1;

    // 5. Dark core
    const sc = W / rw;
    const r = S * 0.1 * Math.min(o.k, 1.6) * sc,
      cx = o.x * sc,
      cy = o.y * sc; // capped so zooming in doesn't black out the view
    ctx.globalCompositeOperation = "source-over";
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.2);
    core.addColorStop(0, "rgba(0,0,0,1)");
    core.addColorStop(0.45, "rgba(0,0,0,0.92)");
    core.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = core;
    ctx.fillRect(0, 0, W, H);

    // 6. Service words, merged into the effect
    updateWords(dt, now, sc);
    drawWords(W, H, omega, smear, sc);

    rafId = requestAnimationFrame(loop);
  }
  rafId = requestAnimationFrame(loop);

  return {
    updateScrollZoom,
    destroy() {
      destroyed = true;
      cancelAnimationFrame(rafId);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
      visibilityObserver.disconnect();
    },
  };
}
