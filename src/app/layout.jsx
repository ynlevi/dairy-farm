import { Inter } from "next/font/google";
import Header from "@/components/header/Header";

import "./globals.css";

import Cart from "@/components/cart/Cart";
import { CartProvider } from "@/providers/cart-provider";
import { ProductsProvider } from "@/providers/products-provider";
// export const dynamicParams = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Our Glorious Bakery",
  description: "When Italian & French meets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <ProductsProvider>
            <div className="mx-auto py-5 px-5 sm:px-20 lg:px-32 2xl:px-52 relative ">
              {children}
            </div>
          </ProductsProvider>
        </CartProvider>
      </body>
    </html>
  );
}
