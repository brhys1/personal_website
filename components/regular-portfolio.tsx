"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "lucide-react"
import { useState } from "react"

export default function ImprovedPortfolio() {
  const [aboutMode, setAboutMode] = useState<"professional" | "fun">("professional")

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
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Headshot */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <Card className="bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-2xl relative overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Text Content - Left Side */}
                <div className="md:col-span-2">
                  <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">Rhys Burman</h1>
                  <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
                    Data Scientist & Sustainability
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-slate-700 mb-6">
                    <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Ann Arbor, MI</span>
                    </div>
                    <a
                      href="https://mail.google.com/mail/?view=cm&to=brhys@umich.edu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-full hover:bg-white transition-colors"
                    >
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">brhys@umich.edu</span>
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://github.com/brhys1" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
                      >
                        <Github className="w-4 h-4 mr-2" /> GitHub
                      </Button>
                    </a>
                    <a href="https://linkedin.com/in/rhys-burman" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
                      >
                        <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Headshot Placeholder - Right Side */}
                <div className="flex justify-center">
                  <img
                    src="/headshot_f24_cropped.jpg"
                    alt="Rhys Burman Headshot"
                    className="w-64 h-64 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Me Section with Toggle */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-6">
            {/* About Me Content */}
            <div className="md:col-span-2">
              <Card className="bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-2xl relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl text-slate-800">About Me</CardTitle>
                    <div className="flex bg-white/70 rounded-full p-1">
                      <Button
                        variant={aboutMode === "professional" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAboutMode("professional")}
                        className={aboutMode === "professional" ? "bg-blue-600 text-white" : "text-slate-600"}
                      >
                        <User className="w-4 h-4 mr-1" />
                        Professional
                      </Button>
                      <Button
                        variant={aboutMode === "fun" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setAboutMode("fun")}
                        className={aboutMode === "fun" ? "bg-blue-600 text-white" : "text-slate-600"}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        Fun
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {aboutMode === "professional" ? (
                    <div className="text-slate-700 leading-relaxed">
                      <p className="mb-4">
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
                    <div className="text-slate-700 leading-relaxed">
                      <p className="mb-2">
                        I love nature and being outside and enjoying new places, especially the mountains. 
                        Skiing, rock climbing, biking, and hiking are all places you will fine me when I'm not at my computer. 
                      </p>
                      <p className="mb-2">
                        I'm also a huge Harry Potter fan and love to read and discuss the books. I kill it at Harry Potter trivia.
                        I also listen to a podcast about Harry Potter that releases every Sunday. Maybe I'm too into it...
                      </p>
                      <p className="mb-4">
                        I really enjoy playing card games and board games. From playing hearts with my family to playing poker with my friends, 
                        I'm always exctied for a game night. If you have any game recommendations, I would love to learn. 
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Image Gallery Overlapping Stack */}
            <div className="relative w-80 h-80 md:w-100 md:h-100">
              {/* Back Photo - Climbing in bottom-right */}
              <div className="absolute bottom-0 right-0 w-48 h-48 md:w-50 md:h-50 rounded-lg overflow-hidden shadow-lg z-0">
                <img
                  src= {aboutMode=="professional" ? "/rhys_kavya_dp.jpg" : "/skiing_pic.jpg"}
                  alt="Rhys and Kavya DP"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Front Photo - Friends in top-left */}
              <div className="absolute top-0 left-0 w-48 h-48 md:w-50 md:h-50 rounded-lg overflow-hidden shadow-xl z-10">
                <img
                  src= {aboutMode=="professional" ? "/friends_pic.jpg" : "/climbing_pic.jpg"}
                  alt="MCC"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <Card className="bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-center text-slate-800">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skillGroup, index) => {
                  const IconComponent = skillGroup.icon
                  return (
                    <Card
                      key={index}
                      className="group hover:shadow-xl transition-all duration-300 bg-white border-0 relative overflow-hidden hover:-translate-y-1"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${skillGroup.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>
                      <CardHeader className="relative pb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${skillGroup.color} text-white`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <CardTitle className="text-lg text-slate-800">{skillGroup.category}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="relative pt-0">
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="secondary"
                              className="bg-blue-100/80 text-blue-800 hover:bg-blue-200/80 transition-colors duration-300 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Experience Content */}
            <div className="md:col-span-3">
              <Card className="bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-3xl text-center text-slate-800">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-400"></div>
                    {experiences.map((exp, index) => (
                      <div key={index} className="relative mb-8 ml-12">
                        <div className="absolute -left-8 top-4 w-4 h-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full border-2 border-white shadow"></div>
                        <Card className="group hover:shadow-lg transition-all duration-300 bg-white border-0 relative overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-lg font-semibold text-slate-800">{exp.title}</h3>
                                <p className="text-base font-medium text-blue-600">{exp.company}</p>
                              </div>
                              <div className="text-right text-xs text-slate-500">
                                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full mb-1">
                                  <Calendar className="w-3 h-3 text-blue-600" />
                                  {exp.period}
                                </div>
                                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                                  <MapPin className="w-3 h-3 text-blue-600" />
                                  {exp.location}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-slate-700">{exp.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <Card className="bg-gradient-to-br from-white to-emerald-50/50 border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-center text-slate-800">Featured Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className={`group hover:shadow-xl transition-all duration-300 bg-white border-0 relative overflow-hidden hover:-translate-y-1`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}></div>
                    <CardHeader className="relative pb-3">
                      <CardTitle className="text-lg text-slate-800">{project.title}</CardTitle>
                      <CardDescription className="text-sm text-slate-600">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative pt-0">
                      <div className="mb-3">
                        <h4 className="font-medium text-slate-700 mb-2 text-sm">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs border-blue-200 text-blue-700">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {project.highlights.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-slate-700 mb-2 text-sm">Key Highlights:</h4>
                          <ul className="space-y-1">
                            {project.highlights.map((highlight, hlIndex) => (
                              <li key={hlIndex} className="flex items-start gap-2 text-slate-600 text-xs">
                                <div
                                  className={`w-1.5 h-1.5 bg-gradient-to-r ${project.gradient} rounded-full mt-1.5 flex-shrink-0`}
                                ></div>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                          <Github className="w-3 h-3 mr-1" /> Code
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5"></div>
            <CardHeader className="relative pb-4">
              <CardTitle className="text-3xl font-bold text-slate-800">Let's Connect</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-lg text-slate-700 mb-6">
                Interested in collaborating on sustainability projects or discussing data science opportunities?
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" /> Get In Touch
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-200 text-slate-800 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
                >
                  <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
