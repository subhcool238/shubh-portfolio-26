import type { Metadata } from "next";
import MouseCursor from "./components/MouseCursor";
import "./globals.css";
import Navbar from "./components/Navbar";


import { ThemeProvider } from "./components/ThemeProvider";
import ClientOnly from "./components/ClientOnly";
import GlobalFooter from "./components/GlobalFooter";
import Preloader from "./components/Preloader";
import PersistentAgent from "./components/PersistentAgent";

export const metadata: Metadata = {
  title: "Shubhanshu | Portfolio",
  description: "Innovative XR and UI/UX Designer",
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
          <Preloader />
          <MouseCursor />
          <Navbar />
          <PersistentAgent />
          {children}
          <GlobalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
