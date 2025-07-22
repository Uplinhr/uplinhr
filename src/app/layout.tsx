import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Uplin",
  description: "RRHH Flexible para tu Empresa",
   icons: {
    icon: "/logoUplin.svg",
    apple: "/logoUplin.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}