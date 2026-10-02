import ScrollToTopButton from "@/app/components/ScrollToTopButton";
import ZoomableImages from "@/app/components/ZoomableImages";

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ZoomableImages>{children}</ZoomableImages>
      <ScrollToTopButton />
    </>
  )
}
