"use client";
// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react";
import Header from "./Components/Header";
import CartProvider from "./context/CartContext";
import CheckoutDataProvider from "./context/CheckoutDataContext";
import UserProvider from "./context/UserContext";
// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <UserProvider>
          <CartProvider>
            <CheckoutDataProvider>
              <body>
                <Header />
                {children}
                
              </body>
            </CheckoutDataProvider>
          </CartProvider>
        </UserProvider>
      </SessionProvider>
    </html>
  )

}
