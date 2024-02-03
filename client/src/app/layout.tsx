

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryLayout from "@/components/providers/QueryLayout";
import ChakraLayout from "@/components/providers/ChakraLayout";

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
      <body className={inter.className}
       style={{
        backgroundColor:"black",
        minWidth:410
        }}>
        <QueryLayout>
          <ChakraLayout> 
            {children}
          </ChakraLayout>
        </QueryLayout>
      </body>
    </html>
  );
}
