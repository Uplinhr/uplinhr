import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import BotPenguin from "@/components/botPenguin/botPenguin";
import { Auth0ProviderWithNavigate } from "@/providers/auth0-provider";

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
        {/* App Providers */}
        <Auth0ProviderWithNavigate>
          {/* <LandbotChat /> */}
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
          <Toaster position="top-right" />
          <BotPenguin />
        </Auth0ProviderWithNavigate>
      </body>
    </html>
  );
}

