import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter, Lato } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-alt",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poshaq | Modern Heritage",
  description: "Curated Indian craftsmanship for the modern world.",
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${lato.variable}`}>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
