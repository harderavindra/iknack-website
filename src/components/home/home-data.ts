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
    type: "video",
    src: "/iknack-home-v-4.mp4",
    poster: "/home-video-img-4.webp",
  },
  {
    id: "slide-5",
    type: "image",
    src: "/mbull-features-posts.jpg",
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
       src: "/iknack-vid-2.mp4",
    poster: "/home-video-img-2.webp",
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
     media: {
      type: "video",
      src: "/iknack-home-v-4.mp4",
      poster: "/home-video-img-4.webp",
    },
  },
  {
    id: "c5",
    heading: ["Social", "Media"],
    list: ["Social Media Strategy", "Content Creation", "Campaign Management", "Performance-driven Creative Assets"],
    media: { type: "image", src: "/mbull-features-posts.jpg" },
  },
];

export const WHY_US_HOME = [
  {
    number: "01",
    title: "Experience That Adds Value",
    text: "Years of hands-on expertise across industries shape thoughtful solutions and meaningful outcomes.",
  },
  {
    number: "02",
    title: "Creativity With Purpose",
    text: "Every idea is designed to strengthen brands, engage audiences and support business goals.",
  },
  {
    number: "03",
    title: "Integrated Approach",
    text: "Strategy, design, content and production work together seamlessly from concept to delivery.",
  },
  {
    number: "04",
    title: "Agile Execution",
    text: "Focused teams, collaborative processes and efficient delivery create momentum at every stage.",
  },
  {
    number: "05",
    title: "Future-Ready Mindset",
    text: "Creative thinking combined with emerging technologies opens new opportunities for brands to grow.",
  },
];
