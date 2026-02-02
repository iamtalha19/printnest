export interface CheckoutData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  province: string;
  postcode: string;
  phone: string;
  paymentMethod: "cod" | "bank";
}

export const checkoutConfig = {
  provinces: [
    { code: "PB", name: "Punjab" },
    { code: "SD", name: "Sindh" },
    { code: "KP", name: "Khyber Pakhtunkhwa" },
    { code: "BA", name: "Balochistan" },
    { code: "IS", name: "Islamabad" },
    { code: "GB", name: "Gilgit-Baltistan" },
    { code: "JK", name: "Azad Kashmir" },
  ],
  breadcrumbs: {
    home: "Home",
    current: "Checkout",
  },
};