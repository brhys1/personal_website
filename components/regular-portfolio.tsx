"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  MapPin,
  Calendar,
  Sparkles,
  Database,
  Code,
  User,
  Heart,
  ChevronDown,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

// AnimatedScrambleText component
function AnimatedScrambleText({ messages, interval = 3000, scrambleSpeed = 15 }: { messages: string[]; interval?: number; scrambleSpeed?: number }) {
  const [displayed, setDisplayed] = useState(messages[0])
  const [targetIdx, setTargetIdx] = useState(0)
  const scrambleRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?";

  useEffect(() => {
    function scrambleTo(target: string) {
      let frame = 0;
      let current = displayed;
      if (scrambleRef.current) clearInterval(scrambleRef.current);
    
      const SCRAMBLE_LENGTH = 25;
      const paddedTarget = target.padEnd(SCRAMBLE_LENGTH, ' ');
    
      scrambleRef.current = setInterval(() => {
        let result = "";
        for (let i = 0; i < SCRAMBLE_LENGTH; i++) {
          if (frame < scrambleSpeed || current[i] !== paddedTarget[i]) {
            result += chars[Math.floor(Math.random() * chars.length)];
          } else {
            result += paddedTarget[i];
          }
        }
        setDisplayed(result);
        frame++;
        if (frame > scrambleSpeed) {
          setDisplayed(paddedTarget);
          if (scrambleRef.current) clearInterval(scrambleRef.current);
        }
      }, 20);
    }
    scrambleTo(messages[targetIdx]);
    return () => {
      if (scrambleRef.current) clearInterval(scrambleRef.current);
    };
    // eslint-disable-next-line
  }, [targetIdx]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTargetIdx((idx) => (idx + 1) % messages.length);
    }, interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [messages, interval]);

  return (
    <div className="mb-4 flex justify-center">
      <span className="text-2xl md:text-3xl font-heading bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg transition-all duration-500 min-h-[2.5rem]">
        {displayed}
      </span>
    </div>
  );
}

export default function RegularPortfolio({ setShow3DOnly }: { setShow3DOnly?: (v: boolean) => void }) {
  const [aboutMode, setAboutMode] = useState<"professional" | "fun">("professional")
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const skills = [
    {
      category: "Languages",
      items: ["Python", "SQL", "C++", "R", "Java", "JavaScript"],
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Technologies",
      items: ["Tableau", "AWS", "Git/Github", "Docker", "PostgreSQL", "Firebase", "Jupyter Notebook", "Google Cloud"],
      icon: Database,
      color: "from-cyan-500 to-green-500",
    },
    {
      category: "Frameworks",
      items: [
        "Pandas",
        "NumPy",
        "PyTorch",
        "PySpark",
        "Selenium",
        "Scikit-Learn",
        "Flask",
        "React.js",
        "Matplotlib",
        "Plotly",
      ],
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
    },
  ]

  const experiences = [
    {
      title: "Data Engineering Intern",
      company: "Clear Estimates",
      location: "Ann Arbor, MI",
      period: "May 2024 – May 2025",
      description: "Built distributed price scraping and data engineering systems for construction cost estimation.",
      icon: "/CE_logo.png",
    },
    {
      title: "Data Science Intern",
      company: "RemodelingCosts.com",
      location: "Ann Arbor, MI",
      period: "June 2025 – Present",
      description:
        "Implemented GenAI and query classification for AI-driven estimate generation and lead optimization.",
      icon: "/Remodeling_Costs_Logo.png",
    },
    {
      title: "ML Software Intern",
      company: "Delta Airlines",
      location: "Detroit, MI",
      period: "Feb 2025 – April 2025",
      description: "Engineered and trained ML models for flight delay and connection success prediction.",
      icon: "/delta_logo.png",
    },
    {
      title: "Data Scientist",
      company: "University of Michigan - Office of Campus Sustainability",
      location: "Ann Arbor, MI",
      period: "June 2025 – Present",
      description: "Automated GHG emissions classification and data extraction for sustainability reporting.",
      icon: "/ocs_logo.png",
    },
    {
      title: "Founding Data Engineer",
      company: "Integrate Health",
      location: "Ann Arbor, MI",
      period: "October 2024 – Present",
      description: "Provisioned HIPAA-compliant infrastructure and engineered risk modeling pipelines for healthcare.",
      icon: "/Integrate_logo.png",
    },
  ]

  const projects = [
    {
      title: "MCC Carpools Web App",
      description:
        "Developed a scalable carpool web app using React.js, Flask, and PostgreSQL; increased group participation by 61%.",
      technologies: ["React.js", "Flask", "PostgreSQL", "Google Maps API"],
      highlights: [
        "Implemented Google Maps API for geo-optimization and created REST APIs for CRUD operations and data matching.",
      ],
      github: "https://github.com/brhys1/mcc-carpools",
      demo: "https://carpools.michiganclimbingclub.com/",
      gradient: "from-blue-600 to-green-600",
    },
    {
      title: "KTP Spotify Playlist Generator",
      description:
        "Designed backend APIs to serve music suggestions in real time, using Firebase, Spotify OAuth, and Elasticsearch.",
      technologies: ["Firebase", "Spotify OAuth", "Elasticsearch", "TF-IDF"],
      highlights: [
        "Built a custom TF-IDF-based classifier for party music that achieved 73% accuracy; integrated with personal user data.",
      ],
      github: "https://github.com/brhys1/spotify_project",
      demo: "#",
      gradient: "from-blue-600 to-green-600",
    },
    {
      title: "MapReduce Simulator & Search Engine",
      description:
        "Simulated distributed MapReduce system using TCP/UDP, fault tolerance, parallelization, and heartbeat tracking.",
      technologies: ["Python", "Flask", "TCP/UDP", "TF-IDF"],
      highlights: [
        "Built an inverted index system with TF-IDF weighting and exposed a Flask API to serve ranked search results.",
      ],
      github: "#",
      demo: "#",
      gradient: "from-blue-600 to-green-600",
    },
    {
      title: "ML Cuisine Classifier",
      description:
        "Cleaned and preprocessed data, feature engineered, and optimized an ML pipeline; classification accuracy 83%.",
      technologies: ["scikit-learn", "TF-IDF", "Random Forest", "KNN"],
      highlights: [],
      github: "https://github.com/nkavya00/recipes-and-cuisines-analysis",
      demo: "https://nkavya00.github.io/recipes-and-cuisines-analysis/",
      gradient: "from-blue-600 to-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-transparent font-body relative">
      {/* Floating Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden py-8">
        {/* Enhanced Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <div
            className={`absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-2000 ${
            isLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl transition-all duration-2000 delay-500 ${
            isLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
          />
        </div>

        <div
          className={`text-center z-10 transition-all duration-1000 max-w-4xl mx-auto ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Profile Image with Enhanced Animation */}
          <div
            className={`mb-6 md:mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Glowing Ring */}
              <div className="absolute inset-0 w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 mx-auto rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-spin-slow opacity-75 blur-sm"></div>
              <img
                src="/headshot_f24_cropped.jpg"
                alt="Rhys Burman Headshot"
                className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-2xl object-cover mx-auto mb-4 md:mb-6 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Name with Gradient Text */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-3 md:mb-4 drop-shadow-2xl transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Rhys Burman
          </h1>

          {/* Subtitle with Enhanced Styling */}
          <div
            className={`relative mb-6 md:mb-8 transition-all duration-1000 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium-body drop-shadow-lg">
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Data Science
              </span>
              <span className="text-white/90 mx-2">&</span>
              <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                Sustainability
              </span>
            </p>
            {/* Underline Animation */}
            <div className="mt-2 mx-auto w-24 sm:w-28 md:w-32 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Contact Info with Better Contrast */}
          <div
            className={`flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-white mb-6 md:mb-8 transition-all duration-1000 delay-900 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center gap-1 sm:gap-2 bg-white/25 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300 shadow-lg">
              <MapPin className="w-4 h-4 text-blue-300" />
              <span className="text-xs sm:text-sm font-body font-medium">Ann Arbor, MI</span>
            </div>
            <a
              href="https://mail.google.com/mail/?view=cm&to=brhys@umich.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 bg-white/25 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-white/20 hover:bg-white/35 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Mail className="w-4 h-4 text-green-300" />
              <span className="text-xs sm:text-sm font-body font-medium">brhys@umich.edu</span>
            </a>
          </div>

          {/* Enhanced Action Buttons */}
          <div
            className={`flex justify-center gap-4 sm:gap-6 mb-12 md:mb-16 transition-all duration-1000 delay-1100 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <a href="https://github.com/brhys1" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/30 hover:scale-105 transition-all duration-300 font-medium-body shadow-xl px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
              >
                <Github className="w-5 h-5 mr-2" /> GitHub
              </Button>
            </a>
            <a href="https://linkedin.com/in/rhys-burman" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 font-medium-body shadow-xl px-6 sm:px-8 py-2 sm:py-3 border-0 text-sm sm:text-base"
              >
                <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
              </Button>
            </a>
          </div>

          {/* Animated Scramble Text above the button */}
          {setShow3DOnly && (
            <div className="mb-4 md:mb-6">
              <AnimatedScrambleText messages={["Want to see something cool?", "Want check out something awesome?", "Want to explore my world?", "Mind if I show you something cool?", "This took me too much time, check it out!"]} />
            </div>
          )}
          {setShow3DOnly && (
            <div className="flex justify-center mb-8 md:mb-12">
              <Button
                onClick={() => setShow3DOnly(true)}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-green-700 transition-colors text-xl sm:text-2xl md:text-3xl font-medium"
              >
                Explore in 3D
              </Button>
            </div>
          )}

          {/* Enhanced Scroll Indicator */}
          <div
            className={`transition-all duration-1000 delay-1300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="animate-bounce mt-2 md:mt-4">
                <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/60 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Consistent Backdrop */}
      <div className="relative">
        {/* Consistent Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/80 via-green-200/80 to-blue-100/80 backdrop-blur-md"></div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4">
          {/* About Me Section - Starts off screen */}
          <section className="py-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* About Me Content */}
              <div className="md:col-span-1">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl text-slate-800 font-heading">About Me</h2>
                    <div className="flex bg-slate-100 rounded-full p-1">
                      <Button
                        variant={aboutMode === "professional" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAboutMode("professional")}
                        className={`font-medium-body ${aboutMode === "professional" ? "bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full" : "text-slate-600"}`}
                      >
                        <User className="w-4 h-4 mr-1" />
                        Professional
                      </Button>
                      <Button
                        variant={aboutMode === "fun" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAboutMode("fun")}
                        className={`font-medium-body ${aboutMode === "fun" ? "bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full" : "text-slate-600"}`}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        Fun
                      </Button>
                    </div>
                  </div>

                  {aboutMode === "professional" ? (
                    <div className="text-slate-700 leading-relaxed font-body space-y-4">
                      <p>
                        I'm a passionate data scientist specializing in sustainability at the University of Michigan.
                        Planning on graduating in May 2027 with an MS in Data Science, I want to combine data and
                        machine learning with expertise in climate science to drive meaningful environmental impact and
                        help companies reduce their carbon footprint.
                      </p>
                      <p>
                        My experience spans data engineering, machine learning, and sustainability analytics across
                        various industries including construction, healthcare, and aviation. I'm particularly interested
                        in leveraging AI and data science to solve complex environmental challenges.
                      </p>
                    </div>
                  ) : (
                    <div className="text-slate-700 leading-relaxed font-body space-y-4">
                      <p>
                        I love nature and being outside and enjoying new places, especially the mountains. Skiing, rock
                        climbing, biking, and hiking are where you'll find me when I'm not at my computer.
                      </p>
                      <p>
                        I'm also a huge Harry Potter fan and love to read and discuss the books. I kill it at Harry
                        Potter trivia. I also listen to a podcast about Harry Potter that releases every Sunday. Maybe
                        I'm too into it...
                      </p>
                      <p>
                        I really enjoy playing card games and board games. From playing hearts with my family to
                        poker with my friends, I'm always excited for a game night. I love learning new ones too!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Gallery */}
              {aboutMode == "professional" ? (
                <div className="relative w-full h-64 sm:h-80 md:h-96 md:col-span-1">
                  <div className="absolute top-0 right-0 w-32 h-24 sm:w-48 sm:h-36 md:w-60 md:h-48 rounded-lg overflow-hidden shadow-xl z-0">
                    <img
                      src="/bean_pic.jpg"
                      alt="Bean"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 sm:w-72 sm:h-48 md:w-96 md:h-60 rounded-lg overflow-hidden shadow-xl z-10">
                    <img
                      src="/atlas_board_pic.jpg"
                      alt="Atlas Board"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-0 left-0 w-32 h-24 sm:w-48 sm:h-36 md:w-60 md:h-48 rounded-lg overflow-hidden shadow-lg z-0">
                    <img
                      src="/smiling_bid_night.jpg"
                      alt="Bid Night"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-64 sm:h-80 md:h-96 md:col-span-1">
                  <div className="absolute top-0 left-0 w-32 h-24 sm:w-48 sm:h-36 md:w-60 md:h-48 rounded-lg overflow-hidden shadow-xl z-0">
                    <img
                      src="/friends_pic.jpg"
                      alt="Friends"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-0 left-1/3 -translate-x-1/3 w-32 h-24 sm:w-48 sm:h-36 md:w-60 md:h-48 rounded-lg overflow-hidden shadow-lg z-0">
                    <img
                      src="/climbing_pic.jpg"
                      alt="Climbing"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute top-0 left-2/3 -translate-x-2/3 w-32 h-24 sm:w-48 sm:h-36 md:w-60 md:h-48 rounded-lg overflow-hidden shadow-xl z-10">
                    <img
                      src="/skiing_pic.jpg"
                      alt="Skiing"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-32 h-24 sm:w-48 sm:h-36 md:w-60 md:h-48 rounded-lg overflow-hidden shadow-xl z-10">
                    <img
                      src="/rhys_kavya_dp.jpg"
                      alt="Rhys and Kavya DP"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-10">
            <h2 className="text-3xl text-center text-slate-800 font-heading mb-12">Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => {
                const IconComponent = skillGroup.icon
                return (
                  <div
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${skillGroup.color} text-white`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg text-slate-800 font-heading">{skillGroup.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 hover:from-blue-200 hover:to-green-200 transition-colors duration-300 text-sm font-medium-body"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Experience Section */}
          <section className="py-10">
            <h2 className="text-3xl text-center text-slate-800 font-heading mb-12">Experience</h2>
            <div className="relative px-4 sm:px-0">
              {/* Timeline line - hidden on mobile, shown on larger screens */}
              <div className="hidden md:block absolute top-4 left-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-green-400"></div>
              {experiences.map((exp, index) => (
                <div key={index} className="relative mb-8 md:ml-28">
                  {/* Logo - smaller on mobile, positioned differently */}
                  <div className="md:absolute md:-left-28 md:top-4 mb-4 md:mb-0 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-white border-2 border-blue-300 shadow overflow-hidden mx-auto md:mx-0">
                    {exp.icon ? (
                      <a href={exp.icon} target="_blank" rel="noopener noreferrer">
                        <img src={exp.icon} alt={exp.company + ' logo'} className="w-10 h-10 md:w-20 md:h-20 object-contain" />
                      </a>
                    ) : (
                      <img src={exp.icon} alt={exp.company + ' logo'} className="w-10 h-10 md:w-20 md:h-20 object-contain" />
                    )}
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg p-4 md:p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div className="mb-2 md:mb-0">
                        <h3 className="text-base md:text-lg font-heading text-slate-800">{exp.title}</h3>
                        <p className="text-sm md:text-base font-medium-body bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{exp.company}</p>
                      </div>
                      <div className="text-left md:text-right text-xs text-slate-500">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-green-50 px-2 py-1 rounded-full mb-1 hover:bg-gradient-to-r hover:from-blue-200 hover:to-green-200 hover:scale-105 transition-all duration-200 cursor-pointer">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span className="font-body">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-green-50 px-2 py-1 rounded-full hover:bg-gradient-to-r hover:from-blue-200 hover:to-green-200 hover:scale-105 transition-all duration-200 cursor-pointer">
                          <MapPin className="w-3 h-3 text-green-600" />
                          <span className="font-body">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-slate-700 font-body">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="py-10">
            <h2 className="text-3xl text-center text-slate-800 font-heading mb-12">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:-translate-y-1"
                >
                  <div className={`h-1 bg-gradient-to-r ${project.gradient}`}></div>
                  <div className="p-6">
                    <h3 className="text-lg text-slate-800 font-heading mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-600 font-body mb-4">{project.description}</p>

                    <div className="mb-3">
                      <h4 className="font-medium-body text-slate-700 mb-2 text-sm">Technologies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs border-blue-200 text-blue-700 font-body hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {/* GitHub Button */}
                      {project.github && project.github !== "#" ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-blue-200 text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 bg-transparent font-medium-body"
                          >
                            <Github className="w-3 h-3 mr-1" /> Code
                          </Button>
                        </a>
                      ) : (
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            className="peer text-xs border-blue-200 text-blue-700 bg-transparent font-medium-body cursor-not-allowed"
                            tabIndex={-1}
                          >
                            <Github className="w-3 h-3 mr-1" /> Code
                          </Button>
                          <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-20 opacity-0 peer-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-slate-800 text-white text-xs rounded px-3 py-1 shadow-lg whitespace-nowrap">
                            Contact me for code
                          </div>
                        </div>
                      )}
                      {/* Demo Button */}
                      {project.demo && project.demo !== "#" ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-green-200 text-green-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 bg-transparent font-medium-body"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" /> Demo
                          </Button>
                        </a>
                      ) : (
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            className="peer text-xs border-green-200 text-green-700 bg-transparent font-medium-body cursor-not-allowed"
                            tabIndex={-1}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" /> Demo
                          </Button>
                          <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-20 opacity-0 peer-hover:opacity-100 pointer-events-none transition-opacity duration-200 bg-slate-800 text-white text-xs rounded px-3 py-1 shadow-lg whitespace-nowrap">
                            Contact me for demo
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-10">
            <div className="text-center">
              <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg p-8">
                <h2 className="text-3xl font-heading text-slate-800 mb-4">Let's Connect</h2>
                <p className="text-lg text-slate-700 mb-6 font-body">
                  Interested in collaborating on sustainability projects or discussing data science opportunities?
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://mail.google.com/mail/?view=cm&to=brhys@umich.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium-body px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
                  >
                    <Mail className="w-5 h-5 mr-2" /> Get In Touch
                  </Button>
                  </a>
                  <a href="https://linkedin.com/in/rhys-burman" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 font-medium-body shadow-xl px-4 py-2 sm:px-8 sm:py-3 border-0 text-sm sm:text-base"
                    >
                      <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
