import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-providers"
import "./globals.css";
/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
*/
export const metadata: Metadata = {
  title: "Library Management System",
  description: "Manage library resources efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
      className={` antialiased`}
      /*
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        */
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
