import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import About from "./components/About";
import Polymath from "./components/Polymath";
import Agent from "./components/Agent";

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
    <main className="w-full overflow-hidden relative bg-stone-950 text-white px-5 min-h-screen">
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
        <Hero />
        
        <div id="work">
          <ProjectGrid />
        </div>
        
        <About />
        <Polymath />
        
        {/* Persistent Live Voice Agent */}
        <Agent />

        {/* Footer */}
        <footer className="py-24 border-t border-white/5 mt-12 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">Let's build a better system.</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20">
            <a href="mailto:hello@shubh.design" className="text-3xl md:text-5xl font-light text-gray-100 hover:text-white transition-colors duration-300 tracking-wide">
              hello@shubh.design
            </a>
            <div className="flex items-center gap-8 text-lg text-gray-400 font-medium">
              <a href="#" className="hover:text-white transition-colors duration-300">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Resume</a>
            </div>
          </div>

          <p className="text-gray-500 text-sm tracking-wide">
            © 2026 Shubhanshu Sahu. Based in NCR, India. Built with Next.js & AI.
          </p>
        </footer>
      </div>
    </main>
  );
}