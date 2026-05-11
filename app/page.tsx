import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import About from "./components/About";

const styles = {
  gradientCircleOne: {
    background: "linear-gradient(90deg, rgba(24,103,237,1) 0%, rgba(210,29,83,0.967) 100%)",
    transform: "translate(-30%,-30%) rotate(45deg)",
  },
  gradientCircleTwo: {
    right: "0px",
    top: "100vh",
    background: "linear-gradient(90deg, rgba(24,103,237,1) 0%, rgba(210,29,83,0.967) 100%)",
    transform: "translate(30%,-80%) rotate(45deg)",
  },
  gradientCircleThree: {
    left: "0px",
    bottom: "20vh",
    background: "linear-gradient(90deg, rgba(24,103,237,1) 0%, rgba(210,29,83,0.967) 100%)",
    transform: "translate(-56%,0%) rotate(45deg)",
  },
};

export default function Home() {
  return (
    <main className="w-full overflow-hidden relative text-stone-950 dark:text-white px-6 min-h-screen transition-colors duration-300">
      {/* Background Glowing Blobs */}
      <div className="fixed w-[400px] h-[400px] left-[-10vw] top-[-5vh] origin-top-left -rotate-[17deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[120px] pointer-events-none -z-0"></div>
      <div className="fixed w-[740px] h-[740px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-20 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-0"></div>

      <div className="max-w-300 mx-auto z-10 relative">
        <div className="relative">
          <Hero />
        </div>
        
        <div id="work">
          <ProjectGrid />
        </div>
        
        <About />
      </div>
    </main>
  );
}