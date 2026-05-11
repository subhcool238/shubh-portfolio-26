import { useState } from "react";
import MouseCursor from "./components/general components/MouseCursor/MouseCursor";
import HomePage from "./pages/Home";
import { useEffect } from "react";

function App() {
  const [hover, setHover] = useState(false);
  const turnHoverOn = () => setHover(true);
  const turnHoverOff = () => setHover(false);

  return (
    <>
      <MouseCursor hover={hover} />
      <HomePage turnHoverOn={turnHoverOn} turnHoverOff={turnHoverOff} />
    </>
  );
}

export default App;
