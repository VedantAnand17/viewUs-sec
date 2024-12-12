import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "View Us",
  description: "Collect and manage testimonials",
  openGraph: {
    title: "View Us",
    description: "Collect and manage testimonials",
    images: ["/assets/images/logo1.png"],
    url: "https://www.viewus.in/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased absolute top-0 z-0 h-screen`}
      >
        <SessionProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
