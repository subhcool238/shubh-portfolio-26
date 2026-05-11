import React, { useEffect, useRef, useState } from "react";
import { useScramble } from "use-scramble";

const TextScramble = ({ texts }) => {
  const textIndex = useRef(0);

  const skills = [
    "XR Experience",
    "User Experience",
    "User Interface",
    "Graphics",
    "Edit Videos",
  ];

  function getRandomNumber() {
    if (textIndex.current + 1 < skills.length) {
      textIndex.current++;
    } else {
      textIndex.current = 0;
    }
    return textIndex.current;
  }

  const generateWords = () => {
    return skills[getRandomNumber()];
  };

  const [scrambleText, setScrambleText] = useState("XR Experience");

  // hook returns a ref
  const { ref } = useScramble({
    text: scrambleText,
    speed: 0.3,
  });

  useEffect(() => {
    const intervalRf = setInterval(() => {
      setScrambleText(generateWords());
    }, 1500);

    return () => clearInterval(intervalRf);
  }, []);

  return <span ref={ref} />;
};

export default TextScramble;
