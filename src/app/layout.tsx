import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import BotPenguin from "@/components/botPenguin/botPenguin";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter-tight",
  display: "swap",
})


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
    <html lang="es" className={interTight.variable}>
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

