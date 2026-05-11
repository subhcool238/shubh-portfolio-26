import { useEffect } from "react";
import "./MouseCursor.css"; // Import your CSS styles

const MouseCursor = ({ hover }) => {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    const cursorInner = document.querySelector(".cursor2");
    const links = document.querySelectorAll("a");

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      cursorInner.style.left = `${x}px`;
      cursorInner.style.top = `${y}px`;
    };

    const handleMouseDown = () => {
      cursor.classList.add("click");
      cursorInner.classList.add("cursorinnerhover");
    };

    const handleMouseUp = () => {
      cursor.classList.remove("click");
      cursorInner.classList.remove("cursorinnerhover");
    };

    const handleMouseOver = () => {
      cursor.classList.add("hover");
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("hover");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    links.forEach((item) => {
      item.addEventListener("mouseover", handleMouseOver);
      item.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      links.forEach((item) => {
        item.removeEventListener("mouseover", handleMouseOver);
        item.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className={`cursor hidden md:block ${hover ? "cursor3" : ""}`}></div>
      <div className="cursor2 hidden md:block"></div>
      {/* Your other components or content can go here */}
    </>
  );
};

export default MouseCursor;
