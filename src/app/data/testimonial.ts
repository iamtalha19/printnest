export interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
}

export const testimonialsData = {
  header: {
    label: "// CLIENT'S FEEDBACK //",
    titleMain: "Success Stories From",
    titleHighlight: "Our Customers",
  },
  testimonials: [
    {
      name: "Arlene McCoy",
      role: "Web Designer",
      image: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-1.webp",
      content: "Our company has been using this service for over a year now, and it transformed how we handle branded merchandise.",
    },
    {
      name: "Brooklyn Simmons",
      role: "Web Designer",
      image: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-2.webp",
      content: "This printing service helped elevate my brand to the next level. I needed cost-effective yet premium-quality prints.",
    },
    {
      name: "Guy Hawkins",
      role: "Marketing Manager",
      image: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-3.webp",
      content: "I've used several print services in the past, but none have matched the level of professionalism and consistency.",
    },
    {
      name: "Jane Cooper",
      role: "Creative Director",
      image: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-1.webp",
      content: "The attention to detail in their packaging is second to none. Every order arrives in pristine condition.",
    },
    {
      name: "Robert Fox",
      role: "Entrepreneur",
      image: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-2.webp",
      content: "Finding a reliable printing partner was a challenge until we found PrintNest. Their dashboard makes tracking easy.",
    },
    {
      name: "Cody Fisher",
      role: "Store Owner",
      image: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-3.webp",
      content: "The quality of the prints for our custom apparel exceeded our expectations. The colors are crisp and vibrant.",
    },
    {
      name: "Esther Howard",
      role: "Brand Strategist",
      image: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-1.webp",
      content: "Working with PrintNest has streamlined our entire production process. Their tools are incredibly intuitive.",
    },
    {
      name: "Dianne Russell",
      role: "Product Designer",
      image: "https://themexriver.com/wp/printnest/wp-content/uploads/2025/12/author-2.webp",
      content: "The turnaround time is incredible without sacrificing quality. They delivered ahead of schedule for our show.",
    },
  ] as Testimonial[],
};