import { Metadata } from "next";
import PlaygroundClient from "./PlaygroundClient";

export const metadata: Metadata = {
  title: "Playground | Shubhanshu Portfolio",
  description: "A spatial exploration of prototypes, live sites, VR/AR, and AI tools.",
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
