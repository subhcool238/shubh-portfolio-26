import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import About from "./components/About";
import Footer from "./components/Footer";

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
      {/* Background Gradients */}
      <div
        style={styles.gradientCircleOne}
        className="w-120 h-120 rounded-full blur-3xl opacity-30 absolute z-0"
      ></div>
      <div
        style={styles.gradientCircleTwo}
        className="w-200 h-200 rounded-full blur-3xl opacity-20 absolute z-0"
      ></div>
      <div
        style={styles.gradientCircleThree}
        className="w-200 h-200 rounded-full blur-3xl opacity-20 absolute z-0"
      ></div>

      <div className="max-w-300 mx-auto z-10 relative">
        <div className="relative">
          <Hero />
        </div>
        
        <div id="work">
          <ProjectGrid />
        </div>
        
        <About />
      </div>
      <Footer />
    </main>
  );
}