import { useState } from "react";

const NavBar = ({ turnHoverOff, turnHoverOn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="z-50 hidden lg:flex absolute w-full flex justify-center">
        <div className=" max-w-[1200px] py-5 w-full bg-transparent flex items-center justify-between text-white">
          <div href="#">
            <img src="https://res.cloudinary.com/dym0xfe7y/image/upload/v1731840439/logo.svg" />
          </div>
          <div className="flex gap-14 text-lg font-thin content-center">
            <a onMouseOver={turnHoverOn} onMouseOut={turnHoverOff} href="#">
              <p className="tracking-wide hover-scale button">Home</p>
            </a>
            <a onMouseOver={turnHoverOn} onMouseOut={turnHoverOff} href="#work">
              <p className="tracking-wide hover-scale">Work</p>
            </a>
            <a
              onMouseOver={turnHoverOn}
              onMouseOut={turnHoverOff}
              href="#contact"
            >
              <p className="tracking-wide hover-scale">Contact</p>
            </a>
            <a onMouseOver={turnHoverOn} onMouseOut={turnHoverOff} href="#">
              <p className="tracking-wide hover-scale">About</p>
            </a>
          </div>
          <div className="">
            <a
              onMouseOver={turnHoverOn}
              onMouseOut={turnHoverOff}
              target="_blank"
              href="https://drive.google.com/file/d/1NdIMK8VD6KzoIW0vC2Y6RaHDHAxDAc9A/view?usp=sharing"
            >
              <p className="underline underline-offset-4 tracking-wide hover-scale">
                Resume
              </p>
            </a>
          </div>
        </div>
      </div>
      <nav
        className={`pr-10 absolute w-full z-50 flex lg:hidden justify-between ${
          isMenuOpen ? "bg-indigo-950" : "transparent"
        } items-center p-4 text-white`}
      >
        <a href="#" className="text-2xl font-bold">
          <img src="https://res.cloudinary.com/dym0xfe7y/image/upload/v1731840439/logo.svg"></img>
        </a>
        <span
          className="text-2xl cursor-pointer lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </span>
        <ul
          className={`lg:flex gap-6 ${
            isMenuOpen
              ? "flex fixed bottom-0 right-0 w-full h-screen flex-col absolute top-16 right-4 bg-indigo-950	 p-4 rounded-md"
              : "hidden"
          } lg:flex-row text-center`}
        >
          <li>
            <a
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              href="#"
              className="hover:text-yellow-500 text-2xl"
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              href="#"
              className="hover:text-yellow-500 text-2xl"
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              href="#work"
              className="hover:text-yellow-500 text-2xl"
            >
              Work
            </a>
          </li>
          <li>
            <a
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              href="#contact"
              className="hover:text-yellow-500 text-2xl"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
