import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "@/store/provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ToastListener from "@/components/common/toast/toastListener";
import { SITE_INFORMATION } from "@/config/seo";

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
  title: SITE_INFORMATION.appName,
  description: SITE_INFORMATION.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <div >
            <Header />
            <div className="min-h-[90dvh]"> {children}</div>
            <Footer />
          </div>

          <ToastListener />
        </ReduxProvider>
      </body>
    </html>
  );
}
