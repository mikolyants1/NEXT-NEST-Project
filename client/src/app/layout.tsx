import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryLayout from "@/components/model/providers/QueryLayout";
import ChakraLayout from "@/components/model/providers/ChakraLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
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
         backgroundColor:"rgb(230,230,230)"
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
