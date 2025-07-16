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
import { useState, useEffect } from "react"

export default function RegularPortfolio() {
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
      color: "from-cyan-500 to-blue-500",
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
      color: "from-purple-500 to-pink-500",
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
      github: "#",
      demo: "#",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "KTP Spotify Playlist Generator",
      description:
        "Designed backend APIs to serve music suggestions in real time, using Firebase, Spotify OAuth, and Elasticsearch.",
      technologies: ["Firebase", "Spotify OAuth", "Elasticsearch", "TF-IDF"],
      highlights: [
        "Built a custom TF-IDF-based classifier for party music that achieved 73% accuracy; integrated with personal user data.",
      ],
      github: "#",
      demo: "#",
      gradient: "from-indigo-600 to-purple-600",
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
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "ML Cuisine Classifier",
      description:
        "Developed and optimized an ML pipeline using scikit-learn, integrating TF-IDF, Random Forest, K-fold testing, and K-Nearest Neighbors (KNN) to bring classification accuracy to 83%.",
      technologies: ["scikit-learn", "TF-IDF", "Random Forest", "KNN"],
      highlights: [],
      github: "#",
      demo: "#",
      gradient: "from-cyan-600 to-blue-600",
    },
  ]

  return (
    <div className="min-h-screen bg-transparent font-body relative">
      {/* Floating Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Enhanced Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-sm"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse ${
                isLoaded ? "animate-bounce" : "opacity-0"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}

          {/* Gradient Orbs */}
          <div
            className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-2000 ${
              isLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl transition-all duration-2000 delay-500 ${
              isLoaded ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        </div>

        <div
          className={`text-center z-10 transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Profile Image with Enhanced Animation */}
          <div
            className={`mb-8 transition-all duration-1000 delay-300 ${
              isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Glowing Ring */}
              <div className="absolute inset-0 w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-spin-slow opacity-75 blur-sm"></div>
              <img
                src="/headshot_f24_cropped.jpg"
                alt="Rhys Burman Headshot"
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover mx-auto mb-6 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Name with Gradient Text */}
          <h1
            className={`text-5xl md:text-7xl font-heading bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-4 drop-shadow-2xl transition-all duration-1000 delay-500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Rhys Burman
          </h1>

          {/* Subtitle with Enhanced Styling */}
          <div
            className={`relative mb-8 transition-all duration-1000 delay-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-xl md:text-3xl text-white font-medium-body drop-shadow-lg">
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Data Science
              </span>
              <span className="text-white/90 mx-2">&</span>
              <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                Sustainability
              </span>
            </p>
            {/* Underline Animation */}
            <div className="mt-2 mx-auto w-32 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Contact Info with Better Contrast */}
          <div
            className={`flex flex-wrap justify-center items-center gap-4 text-white mb-8 transition-all duration-1000 delay-900 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-3 rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300 shadow-lg">
              <MapPin className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-body font-medium">Ann Arbor, MI</span>
            </div>
            <a
              href="https://mail.google.com/mail/?view=cm&to=brhys@umich.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-3 rounded-full border border-white/20 hover:bg-white/35 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Mail className="w-4 h-4 text-green-300" />
              <span className="text-sm font-body font-medium">brhys@umich.edu</span>
            </a>
          </div>

          {/* Enhanced Action Buttons */}
          <div
            className={`flex justify-center gap-6 mb-16 transition-all duration-1000 delay-1100 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <a href="https://github.com/brhys1" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/30 hover:scale-105 transition-all duration-300 font-medium-body shadow-xl px-8 py-3"
              >
                <Github className="w-5 h-5 mr-2" /> GitHub
              </Button>
            </a>
            <a href="https://linkedin.com/in/rhys-burman" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105 transition-all duration-300 font-medium-body shadow-xl px-8 py-3 border-0"
              >
                <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
              </Button>
            </a>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div
            className={`transition-all duration-1000 delay-1300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center">
              <p className="text-white/70 text-sm font-body mb-2">Scroll to explore</p>
              <div className="animate-bounce">
                <ChevronDown className="w-8 h-8 text-white/60 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Consistent Backdrop */}
      <div className="relative">
        {/* Consistent Backdrop */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

        {/* Content Container */}
        <div className="relative max-w-6xl mx-auto px-4">
          {/* About Me Section - Starts off screen */}
          <section className="py-20">
            <div className="grid md:grid-cols-3 gap-8">
              {/* About Me Content */}
              <div className="md:col-span-2">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl text-slate-800 font-heading">About Me</h2>
                    <div className="flex bg-slate-100 rounded-full p-1">
                      <Button
                        variant={aboutMode === "professional" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAboutMode("professional")}
                        className={`font-medium-body ${aboutMode === "professional" ? "bg-blue-600 text-white" : "text-slate-600"}`}
                      >
                        <User className="w-4 h-4 mr-1" />
                        Professional
                      </Button>
                      <Button
                        variant={aboutMode === "fun" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAboutMode("fun")}
                        className={`font-medium-body ${aboutMode === "fun" ? "bg-blue-600 text-white" : "text-slate-600"}`}
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
                        climbing, biking, and hiking are all places you will fine me when I'm not at my computer.
                      </p>
                      <p>
                        I'm also a huge Harry Potter fan and love to read and discuss the books. I kill it at Harry
                        Potter trivia. I also listen to a podcast about Harry Potter that releases every Sunday. Maybe
                        I'm too into it...
                      </p>
                      <p>
                        I really enjoy playing card games and board games. From playing hearts with my family to playing
                        poker with my friends, I'm always exctied for a game night. If you have any game
                        recommendations, I would love to learn.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="relative w-full h-80">
                <div className="absolute bottom-0 right-0 w-48 h-48 rounded-lg overflow-hidden shadow-lg z-0">
                  <img
                    src={aboutMode == "professional" ? "/rhys_kavya_dp.jpg" : "/skiing_pic.jpg"}
                    alt="Rhys and Kavya DP"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute top-0 left-0 w-48 h-48 rounded-lg overflow-hidden shadow-xl z-10">
                  <img
                    src={aboutMode == "professional" ? "/friends_pic.jpg" : "/climbing_pic.jpg"}
                    alt="MCC"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-20">
            <h2 className="text-3xl text-center text-slate-800 font-heading mb-12">Skills & Expertise</h2>
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
                          className="bg-blue-100/80 text-blue-800 hover:bg-blue-200/80 transition-colors duration-300 text-xs font-medium-body"
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
          <section className="py-20">
            <h2 className="text-3xl text-center text-slate-800 font-heading mb-12">Experience</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-400"></div>
              {experiences.map((exp, index) => (
                <div key={index} className="relative mb-8 ml-12">
                  <div className="absolute -left-8 top-4 w-4 h-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full border-2 border-white shadow"></div>
                  <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-heading text-slate-800">{exp.title}</h3>
                        <p className="text-base font-medium-body text-blue-600">{exp.company}</p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <div className="flex items-center gap-1 bg-blue-50/80 px-2 py-1 rounded-full mb-1">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span className="font-body">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-blue-50/80 px-2 py-1 rounded-full">
                          <MapPin className="w-3 h-3 text-blue-600" />
                          <span className="font-body">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 font-body">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="py-20">
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
                            className="text-xs border-blue-200 text-blue-700 font-body"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {project.highlights.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium-body text-slate-700 mb-2 text-sm">Key Highlights:</h4>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, hlIndex) => (
                            <li key={hlIndex} className="flex items-start gap-2 text-slate-600 text-xs">
                              <div
                                className={`w-1.5 h-1.5 bg-gradient-to-r ${project.gradient} rounded-full mt-1.5 flex-shrink-0`}
                              ></div>
                              <span className="font-body">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent font-medium-body"
                      >
                        <Github className="w-3 h-3 mr-1" /> Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent font-medium-body"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" /> Demo
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20">
            <div className="text-center">
              <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-lg p-8">
                <h2 className="text-3xl font-heading text-slate-800 mb-4">Let's Connect</h2>
                <p className="text-lg text-slate-700 mb-6 font-body">
                  Interested in collaborating on sustainability projects or discussing data science opportunities?
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium-body"
                  >
                    <Mail className="w-5 h-5 mr-2" /> Get In Touch
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-blue-200 text-slate-800 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent font-medium-body"
                  >
                    <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
