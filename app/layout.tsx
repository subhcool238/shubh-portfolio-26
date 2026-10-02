import type { Metadata } from "next";
import MouseCursor from "./components/MouseCursor";
import "./globals.css";
import Navbar from "./components/Navbar";


import { ThemeProvider } from "./components/ThemeProvider";
import ClientOnly from "./components/ClientOnly";
import GlobalFooter from "./components/GlobalFooter";
import Preloader from "./components/Preloader";
import PersistentAgent from "./components/PersistentAgent";
import NavigationProgress from "./components/NavigationProgress";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  title: "Shubhanshu Sahu — AI Product Designer · Spatial Experience Designer",
  description: "AI Product Designer and Spatial Experience Designer. I design AI products, spatial experiences and design systems.",
  icons: {
    icon: "/Logo/White Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hasSeenPreloader')) {
                document.documentElement.classList.add('skip-preloader');
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-on-background transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationProgress />
          <SmoothScroll />
          <Preloader />
          <MouseCursor />
          <Navbar />
          <PersistentAgent />
          {/* Footer reveal: the footer is pinned to the bottom of the screen and the page content,
              painted above it, scrolls away to uncover it. Reversed column keeps the footer first in
              the DOM (so the content paints over it) but last on the page. */}
          <div className="flex flex-col-reverse">
            <GlobalFooter />
            <div className="relative w-full min-w-0 bg-background">
              {children}
              <div id="footer-reveal-sentinel" aria-hidden className="h-px -mt-px" />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
