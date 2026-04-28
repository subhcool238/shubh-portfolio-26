import type { Metadata } from "next";
import MouseCursor from "./components/MouseCursor";
import "./globals.css";
import Navbar from "./components/Navbar";

import SynChat from "./components/SynChat";

import { ThemeProvider } from "./components/ThemeProvider";

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
          <MouseCursor />
          <Navbar />
          {children}
          <SynChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
