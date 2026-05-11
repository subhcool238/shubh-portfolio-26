"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function GlobalFooter() {
  const pathname = usePathname();
  
  // Do not show footer on the playground page
  if (pathname === "/playground") {
    return null;
  }

  return <Footer />;
}
