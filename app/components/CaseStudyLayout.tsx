"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Section {
  id: string;
  navLabel: string;
  label: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: "getting-started",
    navLabel: "Getting Started",
    label: "Getting Started",
    title: "Overview",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          In this project, my group mate Ankit and I explored Rajiv Gandhi Zoological Park (RGZP) through a systems thinking framework, recognizing that a zoo is more than just the sum of its individual parts. Instead, it is an interconnected system where every element, from the diverse animal species to the dedicated staff, plays a vital role in maintaining a delicate balance.
        </p>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Rajiv Gandhi Zoological Park, commonly known as the Rajiv Gandhi Zoo, is a popular zoological park in Pune, Maharashtra, India. Established in 1999, the zoo is named after the former Prime Minister of India, Rajiv Gandhi, and spans approximately 130 acres.
        </p>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mt-16 mb-6">Aim</h3>
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          We aim to uncover the intricate relationships that govern a zoo's functionality, seeking sustainable solutions that benefit both the captive inhabitants and the broader ecosystem.
        </p>
      </div>
    ),
  },
  {
    id: "the-challenge",
    navLabel: "The Challenge",
    label: "The Challenge",
    title: "Problem Statement",
    content: (
      <div className="mt-8">
        <div className="p-6 bg-white/10 rounded-[5px] border-2 border-blue-600">
           <p className="text-lg tracking-wide font-normal text-white/90 leading-relaxed">
             People lack awareness regarding the purpose and significance of zoos.
           </p>
        </div>
      </div>
    ),
  },
  {
    id: "my-role",
    navLabel: "My Role",
    label: "My Role",
    title: "My Responsibilities",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Conducted research interviews, created visitor journey maps, designed user personas, developed flow diagrams, and performed mind mapping and ideation. Designed and laser-cut souvenirs (keychains and badges) using selected durable materials.
        </p>
      </div>
    ),
  },
  {
    id: "design-tool-kit",
    navLabel: "Design Tool Kit",
    label: "Design Tool Kit",
    title: "Tools Used",
    content: (
      <div className="flex flex-wrap gap-8 items-center mt-8">
        <div className="flex items-center gap-4">
           <img src="/zoo/Figma.png" alt="Figma" className="h-10 w-auto object-contain" />
           <span className="text-lg tracking-wide font-normal text-white/80">Figma</span>
        </div>
        <div className="flex items-center gap-4">
           <img src="/zoo/Miro.png" alt="Miro" className="h-10 w-auto object-contain" />
           <span className="text-lg tracking-wide font-normal text-white/80">Miro</span>
        </div>
        <div className="flex items-center gap-4">
           <img src="/zoo/Power Point.png" alt="PowerPoint" className="h-10 w-auto object-contain" />
           <span className="text-lg tracking-wide font-normal text-white/80">PowerPoint</span>
        </div>
      </div>
    ),
  },
  {
    id: "the-process",
    navLabel: "The Process",
    label: "The Process",
    title: "Double Diamond",
    content: (
      <div className="space-y-8">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          We used double diamond Process Model in this. This framework uses a divergent-to-convergent approach to explore problems deeply and deliver effective solutions, highlighting four key phases:
        </p>
        <ul className="list-none space-y-4 text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          <li><span className="font-bold text-white/90">Discover (Research):</span> Gathering insights through understanding zoos, mind mapping, and primary/secondary research.</li>
          <li><span className="font-bold text-white/90">Define (Synthesis):</span> Analyzing findings, empathy mapping, and identifying opportunities to frame a problem statement.</li>
          <li><span className="font-bold text-white/90">Develop (Ideation):</span> Generating, evaluating, and refining ideas for potential solutions.</li>
          <li><span className="font-bold text-white/90">Deliver (Implementation):</span> Validating feasibility, prototyping, and creating proof-of-concepts (POCs).</li>
        </ul>
        <div className="w-full mt-12">
          <img src="/zoo/Double Diamond jpg-01 1.png" alt="Double Diamond Diagram" className="w-full h-auto rounded-lg object-cover" />
        </div>
      </div>
    ),
  },
  {
    id: "discover",
    navLabel: "Discover (Research)",
    label: "Discover (Research)",
    title: "Mind Mapping",
    content: (
      <div className="space-y-20">
        <div>
           <div className="w-full mb-8">
              <img src="/zoo/Mind Map.png" alt="Mind Map" className="w-full h-auto rounded-lg object-cover" />
           </div>
        </div>
        <div>
           <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Research</h3>
           <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-12">
             We conducted multiple research visits to Rajiv Gandhi Zoological Park, where we interviewed the zoo directors and visitors. These interactions provided valuable insights into the zoo's operations and visitor experiences. We explored and answered key questions such as:
           </p>
           
           <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="w-full md:w-2/3">
               <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-white/90">What's a Zoo?</h4>
               <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-10">
                 A zoo is a facility which:<br/>
                 Houses animals<br/>
                 Cares for them<br/>
                 Displays them to public
               </p>

               <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-white/90">Why do zoos exist?</h4>
               <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-10">
                 Conservation<br/>
                 Education<br/>
                 Research<br/>
                 Rehabilitation
               </p>

               <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-white/90">How do zoos work?</h4>
               <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
                 Suitable habitats for animals<br/>
                 Breeding Programs<br/>
                 Tours & Workshops to Engage Visitors
               </p>
             </div>
             <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
               <img src="/zoo/TIgo 1.png" alt="RGZP Mascot - Tigo" className="w-full max-w-[250px] h-auto object-contain drop-shadow-2xl" />
             </div>
           </div>
        </div>
      </div>
    ),
  },
  {
    id: "define",
    navLabel: "Define (Synthesis)",
    label: "Define (Synthesis)",
    title: "Zoo Management",
    content: (
      <div className="space-y-20">
        <div className="w-full">
           <img src="/zoo/zoo management.svg" alt="Zoo Management Diagram" className="w-full h-auto rounded-lg object-cover" />
        </div>
        
        <div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Visitors Journey Map</h3>
          <div className="w-full">
             <img src="/zoo/Visitors journey Map.png" alt="Journey Map" className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">User Persona</h3>
          <div className="w-full">
             <img src="/zoo/Haresh Persona.png" alt="User Persona" className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Iceberg Model</h3>
          <div className="w-full">
             <img src="/zoo/Iceberb Model.png" alt="Iceberg Model" className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "develop",
    navLabel: "Develop (Ideation)",
    label: "Develop (Ideation)",
    title: "Ideation",
    content: (
      <div className="space-y-6">
        <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
          Signages can be digitized and information about the exhibited animal can be given to the visitors.<br/>
          Signages and Information Boards can have AR<br/>
          Dustbins can have an experience where if someone throws garbage, an animation will play on a screen near it.<br/>
          VR tech can be a part of events and workshops.<br/>
          Gift Shop - Souvenirs<br/>
          Detailed map with AR guides which visitors can scan to start their journey at the zoo<br/>
          AR experience at each exhibit<br/>
          AR Photo/Video Booths<br/>
          4D Movies about Animal Kingdom<br/>
          Interactive Games
        </p>
      </div>
    ),
  },
  {
    id: "deliver",
    navLabel: "Deliver (Implement)",
    label: "Deliver (Implement)",
    title: "Solutions",
    content: (
      <div className="space-y-20">
        <div>
          <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-6 text-white/90">Main Tasks for Developed Solutions:</h4>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed">
            Designed a system for monthly kids' drawing competitions.<br/>
            Designed and Prototyped the RGZP app.<br/>
            Integrated Tigo, an AR mascot, for interactive zoo navigation.<br/>
            Designed an AR-based quiz and photo game for kids.<br/>
            Developed an AR-enabled interactive map for zoo guidance.<br/>
            Proposed an AR photobooth for unique visitor photos.
          </p>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Drawing Competition</h3>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-8">
            The Zoo shall hold a monthly drawing competition where kids can send their drawings based on the animal of the month.
          </p>
          <div className="w-full">
            <img src="/zoo/Abhishek Baccha.png" alt="Drawing Competition" className="w-full h-auto rounded-lg object-cover" />
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Unique Themed QR Codes</h3>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-8">
            The new ticket design shall promote the following:<br/>
            Unique animal themed QR codes on tickets shall lead the users to App installation page.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full">
               <img src="/zoo/Ticket Design-01 1.png" alt="Ticket Design 1" className="w-full h-auto rounded-lg object-cover" />
            </div>
            <div className="w-full">
               <img src="/zoo/Ticket Design-02 1.png" alt="Ticket Design 2" className="w-full h-auto rounded-lg object-cover" />
            </div>
            <div className="w-full">
               <img src="/zoo/Unique Themed QR Code 1.png" alt="QR Code 1" className="w-full h-auto rounded-lg object-cover" />
            </div>
            <div className="w-full">
               <img src="/zoo/Unique Themed QR Code 2.png" alt="QR Code 2" className="w-full h-auto rounded-lg object-cover" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">RGZP App Prototype</h3>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-12">
            The RGZP app features:<br/>
            Installing the RGZP app will the users avail discounts at the souvenir shop.
          </p>
          
          <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-white/90">Zoo Adventure AR</h4>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-10">
            "Zoo Adventure AR" is an interactive game designed for children visiting the zoo. It combines AR technology and photography to engage and educate young visitors about the various animals in the zoo. The children will play quiz games and unlock AR animals to click photographs with. Sharing photos on social media will earn them unique stamps on their passports.
          </p>

          <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-white/90">Interactive Map</h4>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-10">
            Users can access the RGZP map to navigate around the zoo. The map also features AR mode in which the mascot 'TIGO' guides them around the zoo. TIGO knows his way around and also knows all the animals there. He will share interesting information about them along the way.
          </p>

          <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-white/90">RGZP Mascot - Tigo</h4>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
            Tigo is the new mascot of RGZP who will help the users navigate around the zoo using the AR maps while also keeping them engaged along the way.
          </p>

          <h4 className="text-xl md:text-2xl font-bold tracking-wide mb-4 text-white/90">RGZP Events Calendar</h4>
          <p className="text-lg tracking-wide font-normal text-white/80 leading-relaxed mb-6">
            The app will feature a section which will display all the events planned at the RGZP in the future.
          </p>
        </div>
      </div>
    ),
  },
];

export default function CaseStudyLayout() {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", 
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-transparent overflow-clip relative selection:bg-white/30 font-sans">
      {/* Background Glowing Blobs matching Figma, keeping theme consistent with your layout */}
      <div className="fixed w-[809px] h-[809px] left-[-20vw] top-[-10vh] origin-top-left -rotate-[17deg] opacity-50 bg-gradient-to-b from-blue-600 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] right-[-10vw] top-[30vh] origin-top-left -rotate-45 opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed w-[984px] h-[984px] left-[10vw] bottom-[-20vh] origin-top-left rotate-[60deg] opacity-30 bg-gradient-to-b from-blue-600/0 to-rose-600 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 text-lg font-medium tracking-wide text-white/90 hover:text-white transition-colors">
            Home
          </Link>
          <div className="flex gap-8">
            <span className="text-lg tracking-wide font-normal text-white/70 cursor-pointer hover:text-white transition-colors">Work</span>
            <span className="text-lg tracking-wide font-normal text-white/70 cursor-pointer hover:text-white transition-colors">About</span>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="max-w-[1200px] mx-auto px-6 pt-40 pb-40 flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* Left Sidebar (ScrollSpy) - NOW FULLY STICKY */}
        {/* Adding self-start fixes flexbox stretching issue which prevents sticky from working */}
        <div className="w-full lg:w-[250px] flex-shrink-0 sticky top-40 self-start">
          <nav className="flex flex-col gap-4">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => scrollToSection(e, section.id)}
                  className="group flex items-center gap-4 py-2"
                >
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <div 
                      className={`
                        w-3 h-3 outline outline-2 outline-offset-[-1px] outline-white transition-all duration-300
                        ${isActive ? "bg-white" : "bg-transparent opacity-40 group-hover:opacity-100"}
                      `}
                    />
                  </div>
                  <span 
                    className={`
                      text-base tracking-wide transition-all duration-300
                      ${isActive ? "font-bold text-white opacity-100" : "font-medium text-white/60 group-hover:text-white/90"}
                    `}
                  >
                    {section.navLabel}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right Content - SCROLLABLE MAIN BODY */}
        <div className="w-full lg:w-[706px] max-w-full">
          {/* Header Section */}
          <div className="mb-24">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">
              Rajiv Gandhi Zoological Park - Systems Thinking
            </h1>
            <p className="text-xl font-normal text-white/70 leading-relaxed tracking-wide mb-12">
              A system design case study to spread awareness regarding the purpose and significance of zoos.
            </p>
            <div className="w-full">
              <img src="/zoo/Zoo UI Mockup top hero image.png" alt="RGZP System App Mockup" className="w-full h-auto rounded-lg object-cover" />
            </div>
          </div>

          {/* Sections Content */}
          <div className="flex flex-col gap-24">
            {sections.map((section) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32"
              >
                <div className="mb-8">
                  <h2 className="text-sm tracking-widest uppercase text-white/50 font-semibold mb-2">
                    {section.label}
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                    {section.title}
                  </h3>
                </div>
                {section.content}
              </section>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
