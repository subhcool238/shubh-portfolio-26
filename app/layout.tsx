import type { Metadata } from "next";
import MouseCursor from "./components/MouseCursor";
import "./globals.css";
import Navbar from "./components/Navbar";


import { ThemeProvider } from "./components/ThemeProvider";
import ClientOnly from "./components/ClientOnly";
import GlobalFooter from "./components/GlobalFooter";
import Preloader from "./components/Preloader";

export const metadata: Metadata = {
  title: "Shubhanshu | Portfolio",
  description: "Innovative XR and UI/UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          {children}
          <GlobalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
