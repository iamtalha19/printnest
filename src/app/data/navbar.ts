
export const navbarData = {
  assets: {
    logo: {
      src: "https://themexriver.com/wp/printnest/wp-content/uploads/2026/01/logo-1.svg",
      alt: "PrintNest Logo",
      width: 160,
      height: 45,
    },
  },
  search: {
    placeholder: "Search",
  },
  actions: {
    cart: { badge: null },
    user: { badge: null },
    wishlist: { badge: null },
  },
  navigation: [
    { label: "Home", href: "/", active: true, hasDropdown: true },
    { label: "About Us", href: "/about", active: false, hasDropdown: false },
    { label: "Services", href: "/services", active: false, hasDropdown: true },
    { label: "Pages", href: "/pages", active: false, hasDropdown: true },
    { label: "Shop", href: "/shop", active: false, hasDropdown: true },
    { label: "Contact Us", href: "/contact", active: false, hasDropdown: false },
  ],
};