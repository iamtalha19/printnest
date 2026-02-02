import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ReduxProvider } from "@/app/redux/Provider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "PrintNest",
  description: "Custom Printing Services",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
