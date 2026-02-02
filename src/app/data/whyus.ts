import { Printer, Settings2, Headset, PenTool, LucideIcon } from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  theme: {
    iconBg: string;
    accent: string;
  };
}

export const whyChooseUsData = {
  header: {
    label: "// Why Choose Us //",
    titleMain: "Why Clients Love Working",
    titleHighlight: "With Us",
  },
  features: [
    {
      icon: Printer,
      title: "Premium Print Quality",
      description: "We use top-tier materials and high-resolution printing for a finish every time.",
      theme: {
        iconBg: "bg-purple-400",
        accent: "bg-purple-200",
      },
    },
    {
      icon: Settings2,
      title: "Customization Options",
      description: "From t-shirts to photo books, choose your product, design, colors, and finishes.",
      theme: {
        iconBg: "bg-teal-400",
        accent: "bg-teal-200",
      },
    },
    {
      icon: Headset,
      title: "Expert Support Team",
      description: "Friendly customer service ready to assist with design orders, & more.",
      theme: {
        iconBg: "bg-pink-400",
        accent: "bg-pink-200",
      },
    },
    {
      icon: PenTool,
      title: "Modern Design Tools",
      description: "Easy-to-use online design tools to help you personalize product in minutes.",
      theme: {
        iconBg: "bg-amber-400",
        accent: "bg-amber-200",
      },
    },
  ] as FeatureItem[],
};