import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import {Toaster} from 'sonner'
import LandbotChat from "@/components/LandbotChatbot/LandbotChatbot";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"], 
  subsets: ["latin"], 
  display: "swap", 
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Uplin",
  description: "RRHH Flexible para tu Empresa",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180x180.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "android-chrome", url: "/favicon-192x192.png", sizes: "192x192" }],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="antialiased">
        <LandbotChat />
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
