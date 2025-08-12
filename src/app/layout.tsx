import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import ElasticCursor from "@/components/ui/ElasticCursor";
import Particles from "@/components/Particles";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/footer/footer";
import Script from "next/script";
import Preloader from "@/components/preloader";
import EasterEggs from "@/components/easter-eggs";
import { config } from "@/data/config";
import SocketContextProvider from "@/contexts/socketio";
import RemoteCursors from "@/components/realtime/remote-cursors";

export const metadata: Metadata = {
  title: config.title,
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  openGraph: {
    title: config.title,
    description: config.description.short,
    url: config.site,
    images: [
      {
        url: config.ogImg,
        width: 800,
        height: 600,
        alt: "Portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.title,
    description: config.description.short,
    images: [config.ogImg],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[archivoBlack.className].join(" ")}>
      <head>
        {/* Umami Analytics (if still needed) */}
        <Script
          defer
          src={process.env.UMAMI_DOMAIN}
          data-website-id={process.env.UMAMI_SITE_ID}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-06PTRVNTFS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-06PTRVNTFS');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={100}
          />
          <Preloader>
            <SocketContextProvider>
              <RemoteCursors />
              <TooltipProvider>
                <Header />
                {children}
                <Footer />
              </TooltipProvider>
            </SocketContextProvider>
            <Toaster />
            <EasterEggs />
            <ElasticCursor />
          </Preloader>
        </ThemeProvider>
      </body>
    </html>
  );
}
