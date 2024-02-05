import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from '@/context';
import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-[#f2f2f2]'>
        <AppWrapper>
          <Header />
          <HeaderMobile />
          {children}
        </AppWrapper>
      </body>

    </html>
  );
}
