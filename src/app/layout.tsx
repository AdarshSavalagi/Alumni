import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/footer/Footer";
import Navbar from "@/Components/navbar/Navbar";
import {Toaster} from 'react-hot-toast';
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Alumni | Srinivas Institute of Technology",
  description: "This is a alumni portal for Srinivas Institute of Technology, valachil, Mangalore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <div className="h-screen overflow-y-auto scrollbar-thin" id="body">
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
