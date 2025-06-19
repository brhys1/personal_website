"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Brain, Github, Linkedin, Mail, MapPin, TrendingUp, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  const skills = [
    { name: "Python", level: 95 },
    { name: "R", level: 90 },
    { name: "SQL", level: 88 },
    { name: "Machine Learning", level: 92 },
    { name: "Deep Learning", level: 85 },
    { name: "Data Visualization", level: 90 },
  ]

  const experiences = [
    {
      title: "Senior Data Scientist",
      company: "University of Michigan - Research Lab",
      period: "2022 - Present",
      description:
        "Leading research initiatives in predictive modeling and statistical analysis for healthcare outcomes. Developed machine learning pipelines processing 10M+ patient records.",
      technologies: ["Python", "TensorFlow", "Apache Spark", "PostgreSQL"],
    },
    {
      title: "Data Science Consultant",
      company: "Michigan Analytics Consortium",
      period: "2021 - 2022",
      description:
        "Provided data science consulting services to Fortune 500 companies. Implemented recommendation systems and customer segmentation models.",
      technologies: ["R", "Shiny", "AWS", "Docker"],
    },
    {
      title: "Research Assistant",
      company: "U-M School of Information",
      period: "2020 - 2021",
      description:
        "Conducted research on natural language processing and sentiment analysis. Published 3 peer-reviewed papers in top-tier conferences.",
      technologies: ["Python", "NLTK", "PyTorch", "Jupyter"],
    },
    {
      title: "Data Analyst Intern",
      company: "Ford Motor Company",
      period: "2019 - 2020",
      description:
        "Analyzed vehicle performance data and customer feedback. Built dashboards for executive reporting and identified key performance indicators.",
      technologies: ["Tableau", "SQL Server", "Excel", "Power BI"],
    },
  ]

  const projects = [
    {
      title: "Healthcare Outcome Predictor",
      description:
        "Developed a machine learning model to predict patient readmission rates with 94% accuracy. Deployed as a web application for hospital administrators.",
      technologies: ["Python", "Scikit-learn", "Flask", "React"],
      impact: "Reduced readmission rates by 15%",
      github: "#",
      demo: "#",
    },
    {
      title: "Climate Data Visualization Platform",
      description:
        "Created an interactive dashboard analyzing 50 years of climate data across Michigan. Features real-time updates and predictive modeling.",
      technologies: ["D3.js", "Python", "FastAPI", "PostgreSQL"],
      impact: "Used by 500+ researchers",
      github: "#",
      demo: "#",
    },
    {
      title: "Social Media Sentiment Analyzer",
      description:
        "Built a real-time sentiment analysis system processing 100K+ tweets daily. Implemented custom NLP models for domain-specific analysis.",
      technologies: ["Python", "BERT", "Apache Kafka", "MongoDB"],
      impact: "98.5% accuracy rate",
      github: "#",
      demo: "#",
    },
    {
      title: "Supply Chain Optimization Model",
      description:
        "Developed optimization algorithms for supply chain management, reducing costs by 20% while improving delivery times.",
      technologies: ["R", "Linear Programming", "Shiny", "MySQL"],
      impact: "$2M annual savings",
      github: "#",
      demo: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Mountain Silhouettes */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          <path
            d="M0,600 L200,400 L400,500 L600,300 L800,450 L1000,250 L1200,400 L1200,800 L0,800 Z"
            fill="currentColor"
          />
          <path
            d="M0,700 L150,550 L350,600 L550,450 L750,550 L950,400 L1200,500 L1200,800 L0,800 Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-sm z-50 border-b border-blue-800/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-xl">DataPortfolio</span>
            </div>
            <div className="hidden md:flex gap-6">
              <Link href="#about" className="hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link href="#experience" className="hover:text-blue-400 transition-colors">
                Experience
              </Link>
              <Link href="#projects" className="hover:text-blue-400 transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                <Brain className="w-16 h-16 text-blue-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Alex Chen
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-2">Data Scientist & Researcher</p>
            <div className="flex items-center justify-center gap-2 text-blue-300">
              <MapPin className="w-4 h-4" />
              <span>University of Michigan, Ann Arbor</span>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Passionate about transforming complex data into actionable insights. Specializing in machine learning,
            statistical modeling, and data visualization to solve real-world problems in healthcare, climate science,
            and beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              <Github className="w-4 h-4 mr-2" />
              View GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm a data scientist with a passion for uncovering patterns in complex datasets and building predictive
                models that drive meaningful impact. Currently pursuing my PhD at the University of Michigan, I focus on
                applying machine learning techniques to healthcare and environmental challenges.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                My journey in data science began with a fascination for statistics and programming. Over the years, I've
                developed expertise in various domains, from natural language processing to computer vision, always with
                an eye toward practical applications that benefit society.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
                  PhD Candidate
                </Badge>
                <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
                  Published Researcher
                </Badge>
                <Badge variant="secondary" className="bg-blue-900/50 text-blue-200">
                  ML Engineer
                </Badge>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">Technical Skills</h3>
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-blue-400">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-slate-800/30 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">Work Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-blue-400">{exp.title}</CardTitle>
                      <CardDescription className="text-lg text-gray-300">{exp.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-blue-400 text-blue-400 w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-blue-900/30 text-blue-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-blue-800/30 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-blue-400 mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-gray-300">{project.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-blue-900/30 text-blue-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-slate-800/30 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-400">Let's Connect</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, research collaborations, or just chatting about the
            latest developments in data science.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-5 h-5 mr-2" />
              alex.chen@umich.edu
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-blue-800/30">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 Alex Chen. Built with passion for data and design.</p>
        </div>
      </footer>
    </div>
  )
}
