import HoverEffectWrapper from "../../general components/HoverEffectWrapper/HoverEffectWrapper";

const styleObj = {
  firstImg: {
    transform: "translate(-50%,0%)",
  },
};

const WorkSection = ({ turnHoverOff, turnHoverOn }) => {
  const { firstImg } = styleObj;

  const imgArr = [
    {
      link: "https://res.cloudinary.com/dym0xfe7y/image/upload/v1726318779/Boxing_Training_in_VR.png",
    },
    {
      link: "https://res.cloudinary.com/dym0xfe7y/image/upload/v1726318779/RGZP__Motion_Graphics.png",
    },
    {
      link: "https://res.cloudinary.com/dym0xfe7y/image/upload/v1726318779/Ethnographic_Research__Carpenter.png",
    },
    {
      link: "https://res.cloudinary.com/dym0xfe7y/image/upload/v1726318779/Shubhi__An_AI_Robot.png",
    },
  ];

  return (
    <div id="work" className="w-full py-20 flex flex-col">
      <div className="lg:w-4/5	flex flex-col items-center">
        <div className="flex flex-col w-full justify-start">
          <p className="font-casanova text-5xl ">Work</p>
          <p className="ml-10 text-xl font-thin">Selected Projects 👨‍💻</p>
        </div>
        <div className="flex flex-col mt-20 gap-5 lg:gap-1">
          {/* <div className="flex translate-x-[-20vw]"> */}
          <HoverEffectWrapper
            turnHoverOff={turnHoverOff}
            turnHoverOn={turnHoverOn}
            redirectLink={
              "https://www.behance.net/gallery/208548179/EliteBox-A-Boxing-Training-in-VR"
            }
            childClassName={"flex"}
            className="flex lg:translate-x-[-10vw]"
          >
            <div
              // style={{
              //   transform: "translateZ(42px)",
              // }}
              className="z-10 translate-z-[70px] translate-x-[90px] flex flex-col justify-end bottom-0 lg:text-3xl font-semibold pr-5"
            >
              <p className="bg">
                Boxing
                <br></br>
                Training
                <br></br>
                in VR
              </p>
              <div className="w-44 h-0.5 bg-white	my-2"></div>
              <div className="flex items-center">
                <p className="text-sm font-thin tracking-wider	">VR Project </p>
                <span className="ml-2 text-lg iconify mdi--arrow-right"></span>
              </div>
            </div>
            <div>
              <img
                src={
                  "https://res.cloudinary.com/dym0xfe7y/image/upload/v1731840439/boxing.jpg"
                }
              />
            </div>
          </HoverEffectWrapper>
          {/* </div> */}
          <HoverEffectWrapper
            redirectLink={
              "https://www.behance.net/gallery/212394001/Generative-AI-Creative-Coding"
            }
            childClassName={"flex"}
            className="flex lg:translate-x-[20vw]"
            turnHoverOff={turnHoverOff}
            turnHoverOn={turnHoverOn}
          >
            <div
              // style={{
              //   transform: "translateZ(42px)",
              // }}
              className="z-10 translate-z-[70px] translate-x-[90px] flex flex-col justify-end bottom-0 lg:text-3xl font-semibold pr-5"
            >
              <p className="bg">
                Gen-AI &<br></br>
                Creative <br></br>
                Coding
              </p>
              <div className="w-44	h-0.5 bg-white	my-2"></div>
              <div className="flex items-center">
                <p className="text-sm font-thin tracking-wider	">
                  Generative AI{" "}
                </p>
                <span className="ml-2 text-lg iconify mdi--arrow-right"></span>
              </div>
            </div>
            <div>
              <img
                src={
                  "https://res.cloudinary.com/dym0xfe7y/image/upload/v1732281516/Gen_AI_and_Creative_Coding.jpg"
                }
              />
            </div>
          </HoverEffectWrapper>
          <HoverEffectWrapper
            redirectLink={
              "https://www.behance.net/gallery/208545219/Rajiv-Gandhi-Zoological-Park-Systems-Thinking"
            }
            childClassName={"flex"}
            className="flex lg:translate-x-[-13vw]"
            turnHoverOff={turnHoverOff}
            turnHoverOn={turnHoverOn}
          >
            <div
              // style={{
              //   transform: "translateZ(42px)",
              // }}
              className="z-10 translate-x-[80px] flex flex-col justify-end bottom-0 lg:text-3xl font-semibold pr-5"
            >
              <p className="bg">
                RGZP:
                <br></br>
                Systems
                <br></br>
                Thinking
              </p>
              <div className="w-44	h-0.5 bg-white	my-2"></div>
              <div className="flex items-center">
                <p className="text-sm font-thin tracking-wider	">Case Study </p>
                <span className="ml-2 text-lg iconify mdi--arrow-right"></span>
              </div>
            </div>
            <div>
              <img
                src={
                  "https://res.cloudinary.com/dym0xfe7y/image/upload/v1731840441/zoo.jpg"
                }
              />
            </div>
          </HoverEffectWrapper>
          <HoverEffectWrapper
            redirectLink={
              "https://www.behance.net/gallery/208542459/Carpenters-Modern-Carpentry-Tools"
            }
            childClassName={"flex"}
            className="flex lg:translate-x-[15vw]"
            turnHoverOff={turnHoverOff}
            turnHoverOn={turnHoverOn}
          >
            <div
              // style={{
              //   transform: "translateZ(42px)",
              // }}
              className="z-10 translate-z-[70px] translate-x-[70px] flex flex-col justify-end bottom-0 lg:text-3xl font-semibold pr-5"
            >
              <p className="bg">
                Ethnographic
                <br></br>
                Research:
                <br></br>
                Carpenter:
              </p>
              <div className="w-44	h-0.5 bg-white	my-2"></div>
              <div className="flex items-center">
                <p className="text-sm font-thin tracking-wider	">Case Study </p>
                <span className="ml-2 text-lg iconify mdi--arrow-right"></span>
              </div>
            </div>
            <div>
              <img
                src={
                  "https://res.cloudinary.com/dym0xfe7y/image/upload/v1731840440/carpentar.jpg"
                }
              />
            </div>
          </HoverEffectWrapper>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
