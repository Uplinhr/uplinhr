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
        <div className="bg-canvas">
        <div className="bg-blob" style={{ width: 700, height: 700, background: "radial-gradient(circle, #CDBADA 0%, #E0D6EA 35%, transparent 70%)", top: "-15%", left: "-10%", opacity: 0.6 }} />
        <div className="bg-blob" style={{ width: 520, height: 520, background: "radial-gradient(circle, #A2D18F 0%, #D2E8C9 40%, transparent 70%)", top: "15%", right: "-8%", opacity: 0.5 }} />
        <div className="bg-blob" style={{ width: 480, height: 480, background: "radial-gradient(circle, #FDC57C 0%, #FDE6C7 40%, transparent 70%)", top: "48%", left: "42%", opacity: 0.4 }} />
        <div className="bg-blob" style={{ width: 600, height: 600, background: "radial-gradient(circle, #A482BB 0%, #E0D6EA 40%, transparent 70%)", top: "55%", right: "5%", opacity: 0.45 }} />
        <div className="bg-blob" style={{ width: 540, height: 540, background: "radial-gradient(circle, #BADCAC 0%, transparent 70%)", bottom: "-10%", left: "15%", opacity: 0.4 }} />
        <div className="bg-blob" style={{ width: 480, height: 480, background: "radial-gradient(circle, #E0D6EA 0%, transparent 70%)", bottom: "5%", right: "-5%", opacity: 0.5 }} />
        </div>
        <div className="bg-noise" />
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

