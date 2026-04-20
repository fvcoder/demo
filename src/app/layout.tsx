import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { Provider } from "./provider";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Demos de fvcoder - Fernando Ticona",
  description:
    "Demostraciones de proyectos personales y de código abierto realizados por Fernando Ticona, un desarrollador de software con experiencia en tecnologías web y móviles. Explora una variedad de proyectos que muestran habilidades en desarrollo frontend, backend, y full-stack, utilizando tecnologías como React, Next.js, Node.js, y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${poppins.variable} bg-background font-sans text-foreground antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
