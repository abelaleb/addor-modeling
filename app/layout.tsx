// app/layout.tsx
import * as React from "react";
import type { Metadata } from "next";
import { Agdasima, Roboto } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider";
import { ReactQueryClientProvider } from "@/utils/providers/react-query-client-provider";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

const agdasima = Agdasima({
  subsets: ["latin"],
  variable: "--font-agdasima",
  weight: ["400", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Addor Models",
  description: "Premier modeling agency for talent discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${agdasima.variable} ${roboto.variable} font-sans`}>
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
          <Toaster/>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
