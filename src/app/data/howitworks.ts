import { MousePointer2, PencilLine, Printer } from "lucide-react";

export const howItWorksData = {
  sectionLabel: "// HOW IT WORKS //",
  headingMain: "Step-by-Step Process to Bring Your",
  headingHighlight: "Custom Ideas to Life",
  assets: {
    arrowOne: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/p1-item-arrow-1.webp",
    arrowTwo: "https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/p1-item-arrow-2.webp",
  },
  steps: [
    {
      id: 1,
      title: "Choose Your Product",
      description: "Browse our wide range of customizable items including t-shirts, and more.",
      icon: MousePointer2,
      positionClass: "lg:top-0 lg:left-0",
      theme: {
        bg: "bg-[#F4F1FE]",
        hoverBorder: "hover:border-purple-200",
        hoverShadow: "hover:shadow-purple-100/50",
        iconBg: "bg-[#A855F7]",
        iconShadow: "shadow-purple-300",
      }
    },
    {
      id: 2,
      title: "Personalize Your Design",
      description: "Upload your artwork or use our easy-to-use design tools to reflect your style.",
      icon: PencilLine,
      positionClass: "lg:top-[160px] lg:left-[40%]",
      theme: {
        bg: "bg-[#FFF0F3]",
        hoverBorder: "hover:border-pink-200",
        hoverShadow: "hover:shadow-pink-100/50",
        iconBg: "bg-[#FFAEB8]",
        iconShadow: "shadow-pink-200",
      }
    },
    {
      id: 3,
      title: "Print & Deliver",
      description: "We print with precision and deliver your order quickly to your guaranteed.",
      icon: Printer,
      positionClass: "lg:top-[500px] lg:left-[10%]",
      theme: {
        bg: "bg-[#EFF6FF]",
        hoverBorder: "hover:border-blue-200",
        hoverShadow: "hover:shadow-blue-100/50",
        iconBg: "bg-[#8BB6FF]",
        iconShadow: "shadow-blue-200",
      }
    },
  ],
  footerContent: {
    text: "We guide you through every step, from choosing a product to customizing your design, ensuring your creative vision becomes a printed reality.",
    btnText: "View More",
    videoText: "Watch Video",
  },
};