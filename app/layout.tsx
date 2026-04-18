import "./globals.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Header from "./components/Header";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0">

        <CartProvider>
          <WishlistProvider>

            <Header />

            {/* ❗️مفيش padding نهائي */}
            <main className="min-h-screen">
              {children}
            </main>

            <Toaster position="top-right" />

          </WishlistProvider>
        </CartProvider>

      </body>
    </html>
  );
}