import { useRef } from "react";

// Function to handle mouse movement
export const useMouseControl = (event) => {
  const modelRef = useRef();

  const x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize x to [-1, 1]
  const y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize y to [-1, 1]

  // Calculate rotation based on mouse position
  const rotationX = (-y * Math.PI) / 10; // Adjust sensitivity as needed
  const rotationY = (x * Math.PI) / 10; // Adjust sensitivity as needed

  if (modelRef.current) {
    modelRef.current.rotation.x = rotationX;
    modelRef.current.rotation.y = rotationY;
    // setMouseState({ rotationX, rotationY });
  }

  return modelRef;
};
