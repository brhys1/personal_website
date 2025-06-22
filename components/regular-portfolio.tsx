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
  TrendingUp,
  Database,
  Code,
} from "lucide-react"

export default function RegularPortfolio() {
  const skills = [
    {
      category: "Programming",
      items: ["Python", "R", "SQL", "JavaScript", "TypeScript"],
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Data Science",
      items: ["Machine Learning", "Deep Learning", "Statistical Analysis", "Data Visualization"],
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-500",
    },
    {
      category: "Tools & Frameworks",
      items: ["TensorFlow", "PyTorch", "Pandas", "Scikit-learn", "React", "Next.js"],
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
    },
    {
      category: "Cloud & Databases",
      items: ["AWS", "Google Cloud", "PostgreSQL", "MongoDB", "Docker"],
      icon: Database,
      color: "from-cyan-500 to-blue-500",
    },
    {
      category: "Sustainability",
      items: ["Carbon Accounting", "LCA", "ESG Reporting", "Climate Data Analysis"],
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
    },
  ]

  const experiences = [
    {
      title: "Senior Data Scientist",
      company: "University of Michigan",
      location: "Ann Arbor, MI",
      period: "2022 - Present",
      description:
        "Leading sustainability data initiatives and developing machine learning models for climate research.",
      achievements: [
        "Developed predictive models for carbon emission forecasting",
        "Built automated data pipelines processing 10TB+ of climate data",
        "Published 5 peer-reviewed papers on sustainability analytics",
      ],
    },
    {
      title: "Data Scientist",
      company: "Environmental Analytics Corp",
      location: "Detroit, MI",
      period: "2020 - 2022",
      description: "Specialized in environmental data analysis and sustainability reporting for Fortune 500 companies.",
      achievements: [
        "Created ML models reducing energy consumption by 15%",
        "Designed interactive dashboards for ESG reporting",
        "Led cross-functional team of 8 data professionals",
      ],
    },
    {
      title: "Research Analyst",
      company: "Climate Solutions Institute",
      location: "Chicago, IL",
      period: "2018 - 2020",
      description: "Conducted research on climate change impacts using statistical modeling and data visualization.",
      achievements: [
        "Analyzed climate datasets spanning 50+ years",
        "Developed visualization tools for policy makers",
        "Contributed to IPCC climate assessment reports",
      ],
    },
    {
      title: "Junior Data Analyst",
      company: "GreenTech Startup",
      location: "Ann Arbor, MI",
      period: "2017 - 2018",
      description: "Entry-level position focusing on renewable energy data analysis and market research.",
      achievements: [
        "Built automated reporting systems",
        "Performed market analysis for solar energy adoption",
        "Created data collection protocols",
      ],
    },
  ]

  const projects = [
    {
      title: "Sustainability Dashboard",
      description:
        "Real-time carbon footprint tracking platform for enterprises with predictive analytics and automated reporting.",
      technologies: ["React", "Python", "FastAPI", "PostgreSQL", "AWS"],
      highlights: ["Processes 1M+ data points daily", "Reduces reporting time by 80%", "Used by 50+ organizations"],
      github: "#",
      demo: "#",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "ML Price Predictor",
      description: "Machine learning model for construction cost estimation using historical data and market trends.",
      technologies: ["Python", "TensorFlow", "Pandas", "Docker", "GCP"],
      highlights: [
        "95% accuracy in cost predictions",
        "Saves $2M+ in project planning",
        "Deployed across 20+ construction sites",
      ],
      github: "#",
      demo: "#",
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      title: "Climate Data Pipeline",
      description: "Automated ETL pipeline for processing and analyzing global climate datasets from multiple sources.",
      technologies: ["Python", "Apache Airflow", "MongoDB", "Kubernetes"],
      highlights: ["Processes 100GB+ data daily", "99.9% uptime reliability", "Supports 15+ research projects"],
      github: "#",
      demo: "#",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "3D Portfolio Website",
      description: "Interactive 3D portfolio experience built with React Three Fiber showcasing projects and skills.",
      technologies: ["React", "Three.js", "Next.js", "TypeScript", "Tailwind"],
      highlights: ["Immersive 3D navigation", "Mobile-responsive design", "Particle system animations"],
      github: "#",
      demo: "#",
      gradient: "from-cyan-600 to-blue-600",
    },
  ]

  return (
    <div className="min-h-screen bg-transparent">
      {/* Remove floating background elements entirely */}
      
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 from-blue-100/40 to-cyan-100/40"></div>
        <div className="max-w-6xl mx-auto relative">
          <Card className="text-center mb-16 bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-2xl relative overflow-hidden">
            <CardHeader className="relative">
              <CardTitle className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
                Rhys Burman
              </CardTitle>
              <CardDescription className="text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold mb-6">
                Data Scientist & Sustainability Expert
              </CardDescription>
              <div className="flex items-center justify-center gap-6 text-slate-600 mb-6">
                <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                  <MapPin className="w-5 h-5 text-blue-600" /> <span>Ann Arbor, MI</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full">
                  <Mail className="w-5 h-5 text-blue-600" /> <span>brhys@umich.edu</span>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  <Github className="w-5 h-5 mr-2" /> GitHub
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                </Button>
              </div>
            </CardHeader>
          </Card>

          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-2xl relative overflow-hidden">
            <CardHeader className="relative">
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-slate-700 leading-relaxed relative">
              <p className="mb-4">
                I'm a passionate data scientist specializing in sustainability and environmental analytics at the
                University of Michigan. With over 6 years of experience, I combine advanced machine learning techniques
                with domain expertise in climate science to drive meaningful environmental impact.
              </p>
              <p className="mb-4">
                My work focuses on developing predictive models for carbon emissions, building automated data pipelines
                for climate research, and creating interactive visualizations that help organizations make data-driven
                sustainability decisions.
              </p>
              <p>
                When I'm not analyzing data, you can find me hiking Michigan's trails, contributing to open-source
                climate projects, or experimenting with new visualization techniques to make complex environmental data
                more accessible.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-16">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-16">
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skillGroup, index) => {
                const IconComponent = skillGroup.icon
                return (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-500 bg-white border-0 relative overflow-hidden hover:-translate-y-2"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${skillGroup.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>
                    <CardHeader className="relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${skillGroup.color} text-white`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-xl text-slate-800">{skillGroup.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-blue-100/80 text-blue-800 hover:bg-blue-200/80 transition-colors duration-300"
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
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-16">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-16">
              Experience
            </h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
              {experiences.map((exp, index) => (
                <div key={index} className="relative mb-12 ml-16">
                  <div className="absolute -left-12 top-6 w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
                  <Card className="group hover:shadow-2xl transition-all duration-500 bg-white border-0 relative overflow-hidden hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/20 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-500"></div>
                    <CardHeader className="relative">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <CardTitle className="text-xl text-slate-800">{exp.title}</CardTitle>
                          <CardDescription className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {exp.company}
                          </CardDescription>
                        </div>
                        <div className="text-right text-sm text-slate-500">
                          <div className="flex items-center gap-1 bg-white/50 px-2 py-1 rounded-full">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1 mt-1 bg-white/50 px-2 py-1 rounded-full">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <p className="text-slate-700 mb-4">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start gap-2 text-slate-600">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto relative">
          <div className="bg-gradient-to-br from-white to-emerald-50/50 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-16">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-16">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-2xl transition-all duration-500 bg-white border-0 relative overflow-hidden hover:-translate-y-2`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
                  ></div>
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.gradient}`}></div>
                  <CardHeader className="relative">
                    <CardTitle className={`text-xl group-hover:bg-gradient-to-r ${project.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-700 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent border-current hover:bg-white transition-colors duration-300`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-700 mb-2">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {project.highlights.map((highlight, hlIndex) => (
                          <li key={hlIndex} className="flex items-start gap-2 text-slate-600 text-sm">
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${project.gradient} rounded-full mt-2 flex-shrink-0`}
                            ></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent border-current hover:bg-white transition-all duration-300`}
                      >
                        <Github className="w-4 h-4 mr-2" /> Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent border-current hover:bg-white transition-all duration-300`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" /> Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4">
        <div className="absolute inset-0 from-emerald-100/40 to-teal-100/40"></div>
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 from-blue-600/5 to-indigo-600/5"></div>
            <CardHeader className="relative">
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                Let's Connect
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-xl text-slate-700 mb-8">
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
                  className="border-blue-200 text-slate-800 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
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
