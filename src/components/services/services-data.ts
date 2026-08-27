export type ServiceCategory = {
  title: string;
  description: string;
  links: string[];
  video: string;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "Creative & Branding",
    description:
      "We craft distinctive visual identities and campaign creatives that define how your brand is seen and remembered. From logo design to complete brand systems, every element is thoughtfully developed to ensure consistency and impact. Our approach blends strategy with creativity, creating identities that stand strong across platforms. We focus on building brands that are not only visually compelling but also meaningful and enduring.",
    links: ["Brand Identity & Logo Design", "Campaign Creatives", "Print & OOH Designs", "Visual Systems & Guidelines"],
    video: "/service/service-thumb-v-1.mp4",
  },
  {
    title: "Films & AV Production",
    description:
      "From concept to final cut, we create cinematic visual stories that communicate with clarity, emotion, and impact. Our in-house production team handles every stage with precision, ensuring seamless execution. Whether it's brand films, product AVs, or campaign videos, each project is crafted to engage and inspire. We transform ideas into powerful visual narratives that leave a lasting impression.",
    links: ["Digital Brand Films", "Product AVs", "Testimonial Videos", "Festival & Campaign Films", "Corporate Videos"],
    video: "/service/service-thumb-v-2.mp4",
  },
  {
    title: "Digital & Social Media",
    description:
      "We build strategic digital ecosystems that engage audiences and drive measurable growth. From content creation to campaign execution, every initiative is aligned with your brand's voice and objectives. We focus on creating meaningful interactions that strengthen online presence. Our approach ensures your brand stays relevant, visible, and connected in an ever-evolving digital landscape.",
    links: ["Social Media Strategy", "Content Creation", "Campaign Management", "Performance-driven Creative Assets"],
    video: "/service/service-thumb-v-3.mp4",
  },
  {
    title: "Gen AI & Innovation",
    description:
      "We combine creativity with emerging technologies to deliver future-ready visual solutions. By integrating AI-driven thinking with design expertise, we explore new creative possibilities. Our work pushes boundaries, enabling brands to stand out with innovative and intelligent visuals. This forward-looking approach ensures adaptability in a rapidly evolving creative environment.",
    links: ["AI-Generated Visual Concepts", "Content Creation", "Campaign Management", "Performance-driven Creative Assets"],
    video: "/service/service-thumb-v-4.mp4",
  },
  {
    title: "Creative Installations & Experiential",
    description:
      "We design immersive brand experiences that transform spaces into powerful storytelling platforms. From large-scale installations to experiential campaigns, every concept is built to engage audiences physically and emotionally. We focus on creating memorable interactions that go beyond traditional communication. The result is impactful brand presence that audiences can experience, not just see.",
    links: ["Large-scale Installations", "Brand Activations"],
    video: "/service/service-thumb-v-5.mp4",
  },
  {
    title: "Photography & Creative Direction",
    description:
      "We create concept-driven visuals where every frame reflects your brand's identity and narrative. From product to lifestyle shoots, each project is carefully planned and executed with artistic precision. Our creative direction ensures consistency in tone, style, and storytelling. The result is imagery that enhances brand perception and communicates with clarity and depth.",
    links: ["Product Shoots", "Lifestyle Shoots", "Campaign Photography", "Creative Direction & Styling"],
    video: "/service/service-thumb-v-6.mp4",
  },
];
