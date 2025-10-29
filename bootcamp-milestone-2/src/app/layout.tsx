import type { Metadata } from "next"; // Object to set metadata
import { Inter } from "next/font/google"; // You can change the font to anything you want.
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Nithyasri's Personal Website",
  description: "A personal website for Nithyasri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
		// returns boilerplate
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}