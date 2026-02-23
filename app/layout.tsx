import "modern-normalize";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Learn Lingo",
  description:
    "Find the best language teachers, book lessons, and improve your skills with Learn Lingo.",
  openGraph: {
    title: "Learn Lingo – Language Learning Platform",
    description:
      "Discover experienced teachers, flexible lessons, and personalized learning with Learn Lingo.",
    url: "https://learn-lingo-orcin-kappa.vercel.app/",
    images: [{ url: "/images/head.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />

            <main>{children}</main>

            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
