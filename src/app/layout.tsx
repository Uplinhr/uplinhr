import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Script from "next/script"; // 👈 importante
import BotPenguin from "@/components/botPenguin/botPenguin";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Uplin",
  description: "RRHH Flexible para tu Empresa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="antialiased">
        {/* <LandbotChat /> */}
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <Toaster position="top-right" />
        <BotPenguin />

      </body>
    </html>
  );
}

