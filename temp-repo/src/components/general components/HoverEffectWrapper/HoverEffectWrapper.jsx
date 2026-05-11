import React, { useRef, useEffect } from "react";
// import "./HoverEffectWrapper.css"; // Make sure to create this CSS file

const cardStyles = {
  perspective: "100px",
  height: "inherit",
  width: "inherit",
  borderRadius: "10px",
  position: "relative",
  transitionDuration: "300ms",
  transitionProperty: "transform, box-shadow",
  transitionTimingFunction: "ease-out",
  transform: "rotate3d(0)",
  "&hover": {
    transitionDuration: "150ms",
    boxShadow: "0 5px 20px 5px #00000044",
  },
};

const cardGlow = {
  position: "absolute",
  width: "100%",
  height: "100%",
  left: "0",
  top: "0",
  // backgroundImage: "radial-gradient(circle at 50% -20%, #ffffff22, #0000000f)",
};

const HoverEffectWrapper = ({
  children,
  className,
  childClassName,
  redirectLink,
  turnHoverOff,
  turnHoverOn,
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  let bounds;

  const rotateToMouse = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;

    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };

    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    cardRef.current.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 4}deg
      )
    `;

    // glowRef.current.style.backgroundImage = `
    //   radial-gradient(
    //     circle at
    //     ${center.x * 2 + bounds.width / 2}px
    //     ${center.y * 2 + bounds.height / 2}px,
    //     #ffffff55,
    //     #0000000f
    //   )
    // `;
  };

  const redirect = () => {
    if (redirectLink) {
      window.open(redirectLink, "_blank");
    }
  };

  useEffect(() => {
    const cardElement = cardRef.current;

    const handleMouseEnter = () => {
      bounds = cardElement.getBoundingClientRect();
      document.addEventListener("mousemove", rotateToMouse);
    };

    const handleMouseLeave = () => {
      document.removeEventListener("mousemove", rotateToMouse);
      cardElement.style.transform = "";
      glowRef.current.style.backgroundImage = "";
    };

    cardElement.addEventListener("mouseenter", handleMouseEnter);
    cardElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cardElement.removeEventListener("mouseenter", handleMouseEnter);
      cardElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      onMouseOver={turnHoverOn}
      onMouseOut={turnHoverOff}
      className={className}
      style={{
        perspective: "700px",
      }}
    >
      <div
        onClick={redirect}
        className={childClassName}
        style={cardStyles}
        ref={cardRef}
      >
        {children}
        <div style={cardGlow} className="glow" ref={glowRef} />
      </div>
    </div>
  );
};

export default HoverEffectWrapper;
