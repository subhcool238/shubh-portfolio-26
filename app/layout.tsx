import type { Metadata } from "next";
import MouseCursor from "./components/MouseCursor";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-stone-950 text-white selection:bg-blue-500 selection:text-white">
        <MouseCursor />
        {children}
      </body>
    </html>
  );
}
