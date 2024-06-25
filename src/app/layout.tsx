
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { AppProvider } from '@/context/AlumniContext';

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
          <AppProvider>
            {children}
          </AppProvider>
        </div>
      </body>
    </html>

  );
}
