export const INTRO_TEXT =
  "iKnack is a dynamic advertising and creative agency with a proven track record of delivering impactful brand solutions. We combine strategy, creativity, and production to create work that stands out.";

export const INTRO_HIGHLIGHTS = [
  { title: "Integrated", sub: "in thinking." },
  { title: "Innovative", sub: "in execution." },
  { title: "Intuitive", sub: "in design." },
  { title: "Interactive", sub: "in engagement." },
  { title: "Inclusive", sub: "in vision." },
];

export type Slide = {
  id: string;
  type: "video" | "image";
  src: string;
  poster?: string;
};

export const SLIDES: Slide[] = [
  {
    id: "slide-1",
    type: "video",
    src: "/iknack-home-v-1.mp4",
    poster: "/home-video-img-1.webp",
  },
  {
    id: "slide-2",
    type: "video",
    src: "/iknack-vid-2.mp4",
    poster: "/home-video-img-2.webp",
  },
  {
    id: "slide-3",
    type: "video",
    src: "/final-4-mahindra-ganesha.mp4",
    poster: "/home-video-img-3.webp",
  },
  {
    id: "slide-4",
    type: "image",
    src: "/video4.webp",
  },
  {
    id: "slide-5",
    type: "image",
    src: "/video5.webp",
  },
];

export type ServiceCard = {
  id: string;
  heading: [string, string];
  list: string[];
  media: { type: "video" | "image"; src: string; poster?: string };
};

export const SERVICE_CARDS: ServiceCard[] = [
  {
    id: "c1",
    heading: ["Creative", "Services"],
    list: ["Brand Identity & Logo Design", "Campaign Creatives", "Print & OOH Designs", "Visual Systems & Guidelines"],
    media: {
      type: "video",
      src: "/iknack-home-v-1.mp4",
      poster: "/home-video-img-1.webp",
    },
  },
  {
    id: "c2",
    heading: ["Video", "Production"],
    list: ["Digital Brand Films", "Product AVs", "Testimonial Videos", "Corporate Videos"],
    media: {
      type: "video",
      src: "/final-4-mahindra-ganesha.mp4",
      poster: "/home-video-img-3.webp",
    },
  },
  {
    id: "c3",
    heading: ["Photography", "& Creative"],
    list: ["Product Shoots", "Campaign Photography", "Lifestyle Shoots", "Creative Direction & Styling"],
    media: {
      type: "video",
      src: "/final-4-mahindra-ganesha.mp4",
      poster: "/home-video-img-3.webp",
    },
  },
  {
    id: "c4",
    heading: ["Design", "Solutions"],
    list: ["UI & Digital Design", "Packaging Design", "Print Collateral", "Design Systems"],
    media: { type: "image", src: "/video4.webp" },
  },
  {
    id: "c5",
    heading: ["Social", "Media"],
    list: ["Social Media Strategy", "Content Creation", "Campaign Management", "Performance-driven Creative Assets"],
    media: { type: "image", src: "/video5.webp" },
  },
];

export const WHY_US_HOME = [
  {
    number: "01",
    title: "Experience",
    text: "Years of hands-on industry expertise shape the way we think, create, and execute — delivering work that resonates and endures. Having partnered with brands across diverse sectors, we understand both creative nuance and business realities, enabling us to transform ideas into impactful, results-driven outcomes.",
  },
  {
    number: "02",
    title: "Innovation",
    text: "We are not just a creative agency; we are a hub of innovation. Our team thrives on pushing boundaries, exploring new technologies, and reimagining possibilities. We embrace change and continuously evolve our craft to stay ahead of industry trends.",
  },
  {
    number: "03",
    title: "Collaboration",
    text: "We believe that the best work emerges from collaboration. We work closely with our clients, fostering open communication and a shared vision. By understanding your goals, challenges, and aspirations, we create a partnership that fuels creativity and drives success.",
  },
  {
    number: "04",
    title: "Results-Driven Approach",
    text: "We are committed to delivering measurable results that align with your business objectives. Our data-driven approach ensures that every campaign, strategy, and creative decision contributes to tangible growth and success.",
  },
  {
    number: "05",
    title: "Passion for Excellence",
    text: "At iKnack, we are passionate about excellence. We are dedicated to crafting work that not only meets but exceeds expectations. Our commitment to quality, creativity, and innovation drives us to deliver exceptional results that make a lasting impact.",
  },
];
