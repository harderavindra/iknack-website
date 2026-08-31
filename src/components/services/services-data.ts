export type ServiceCategory = {
  title: string;
  subtitle?: string;
  description: string;
  links: string[];
  video: string;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "Creative & Branding",
    subtitle: "Brands with character, identities with impact",
    description:
      "We create visual identities, campaign creatives and brand systems that strengthen recognition, consistency and recall.",
    links: ["Brand Identity Design", "Logo Design", "Campaign Creatives", "Print & OOH Design", "Visual Systems & Guidelines"],
    video: "/service/service-thumb-v-1.mp4",
  },
  {
    title: "Films & AV Production",
    subtitle: "Stories that inspire, content that connects",
    description:
      "From brand films and corporate narratives to campaign content and product showcases, every production is crafted to engage audiences and elevate brands.",
    links: ["Brand Films", "Corporate Videos", "Campaign Films", "Product AVs", "Testimonial Films"],
    video: "/service/service-thumb-v-2.mp4",
  },
  {
    title: "Digital & Social Media",
    subtitle: "Conversations that matter",
    description:
      "Strategic content, platform-first thinking and performance-driven execution help brands stay relevant, visible and connected.",
    links: ["Social Media Strategy", "Content Creation", "Campaign Management", "Community Building", "Performance Creatives"],
    video: "/service/service-thumb-v-3.mp4",
  },
  {
    title: "AI & Innovation",
    subtitle: "Creativity powered by possibility",
    description:
      "By combining creative expertise with emerging technologies, we create smarter workflows, richer experiences and future-ready solutions.",
    links: ["AI Visual Concepts", "AI Content Creation", "Creative Automation", "Innovation Consulting"],
    video: "/service/service-thumb-v-4.mp4",
  },
  {
    title: "Experiential & installations",
    subtitle: "Experiences that bring brands to life",
    description:
      "Immersive activations and memorable interactions create meaningful connections between brands and audiences.",
    links: ["Brand Activations", "Experiential Campaigns", "Installations", "Event Experiences"],
    video: "/service/service-thumb-v-5.mp4",
  },
  {
    title: "Photography & Creative Direction",
    subtitle: "Every frame tells a story.",
    description:
      "Thoughtfully crafted visuals strengthen brand perception, communicate value and create lasting impressions.",
    links: ["Product Photography", "Campaign Shoots", "Lifestyle Photography", "Creative Direction"],
    video: "/service/service-thumb-v-6.mp4",
  },
];
