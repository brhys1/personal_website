"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Mail, Linkedin, MapPin, Calendar } from "lucide-react"

export default function RegularPortfolio() {
  const skills = [
    { category: "Programming", items: ["Python", "R", "SQL", "JavaScript", "TypeScript"] },
    { category: "Data Science", items: ["Machine Learning", "Deep Learning", "Statistical Analysis", "Data Visualization"] },
    { category: "Tools & Frameworks", items: ["TensorFlow", "PyTorch", "Pandas", "Scikit-learn", "React", "Next.js"] },
    { category: "Cloud & Databases", items: ["AWS", "Google Cloud", "PostgreSQL", "MongoDB", "Docker"] },
    { category: "Sustainability", items: ["Carbon Accounting", "LCA", "ESG Reporting", "Climate Data Analysis"] },
  ]

  const experiences = [
    { title: "Senior Data Scientist", company: "University of Michigan", location: "Ann Arbor, MI", period: "2022 - Present", description: "Leading sustainability data initiatives and developing machine learning models for climate research.", achievements: ["Developed predictive models for carbon emission forecasting", "Built automated data pipelines processing 10TB+ of climate data", "Published 5 peer-reviewed papers on sustainability analytics"] },
    { title: "Data Scientist", company: "Environmental Analytics Corp", location: "Detroit, MI", period: "2020 - 2022", description: "Specialized in environmental data analysis and sustainability reporting for Fortune 500 companies.", achievements: ["Created ML models reducing energy consumption by 15%", "Designed interactive dashboards for ESG reporting", "Led cross-functional team of 8 data professionals"] },
    { title: "Research Analyst", company: "Climate Solutions Institute", location: "Chicago, IL", period: "2018 - 2020", description: "Conducted research on climate change impacts using statistical modeling and data visualization.", achievements: ["Analyzed climate datasets spanning 50+ years", "Developed visualization tools for policy makers", "Contributed to IPCC climate assessment reports"] },
    { title: "Junior Data Analyst", company: "GreenTech Startup", location: "Ann Arbor, MI", period: "2017 - 2018", description: "Entry-level position focusing on renewable energy data analysis and market research.", achievements: ["Built automated reporting systems", "Performed market analysis for solar energy adoption", "Created data collection protocols"] },
  ]

  const projects = [
    { title: "Sustainability Dashboard", description: "Real-time carbon footprint tracking platform for enterprises with predictive analytics and automated reporting.", technologies: ["React", "Python", "FastAPI", "PostgreSQL", "AWS"], highlights: ["Processes 1M+ data points daily", "Reduces reporting time by 80%", "Used by 50+ organizations"], github: "#", demo: "#" },
    { title: "ML Price Predictor", description: "Machine learning model for construction cost estimation using historical data and market trends.", technologies: ["Python", "TensorFlow", "Pandas", "Docker", "GCP"], highlights: ["95% accuracy in cost predictions", "Saves $2M+ in project planning", "Deployed across 20+ construction sites"], github: "#", demo: "#" },
    { title: "Climate Data Pipeline", description: "Automated ETL pipeline for processing and analyzing global climate datasets from multiple sources.", technologies: ["Python", "Apache Airflow", "MongoDB", "Kubernetes"], highlights: ["Processes 100GB+ data daily", "99.9% uptime reliability", "Supports 15+ research projects"], github: "#", demo: "#" },
    { title: "3D Portfolio Website", description: "Interactive 3D portfolio experience built with React Three Fiber showcasing projects and skills.", technologies: ["React", "Three.js", "Next.js", "TypeScript", "Tailwind"], highlights: ["Immersive 3D navigation", "Mobile-responsive design", "Particle system animations"], github: "#", demo: "#" },
  ]

  return (
    <div className="min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="text-center mb-16 bg-white/90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-5xl md:text-7xl font-bold text-slate-800 mb-6">Rhys Burman</CardTitle>
              <CardDescription className="text-2xl md:text-3xl text-blue-600 mb-6">Data Scientist & Sustainability Expert</CardDescription>
              <div className="flex items-center justify-center gap-6 text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> <span>Ann Arbor, MI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" /> <span>rhys@example.com</span>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="lg"><Github className="w-5 h-5 mr-2" /> GitHub</Button>
                <Button variant="outline" size="lg"><Linkedin className="w-5 h-5 mr-2" /> LinkedIn</Button>
              </div>
            </CardHeader>
          </Card>

          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md">
            <CardHeader><CardTitle className="text-3xl text-center">About Me</CardTitle></CardHeader>
            <CardContent className="text-lg text-slate-700 leading-relaxed">
              <p className="mb-4">I'm a passionate data scientist specializing in sustainability and environmental analytics at the University of Michigan. With over 6 years of experience, I combine advanced machine learning techniques with domain expertise in climate science to drive meaningful environmental impact.</p>
              <p className="mb-4">My work focuses on developing predictive models for carbon emissions, building automated data pipelines for climate research, and creating interactive visualizations that help organizations make data-driven sustainability decisions.</p>
              <p>When I'm not analyzing data, you can find me hiking Michigan's trails, contributing to open-source climate projects, or experimenting with new visualization techniques to make complex environmental data more accessible.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-md">
                <CardHeader><CardTitle className="text-xl text-blue-600">{skillGroup.category}</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-800">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Experience</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 ml-16">
                <div className="absolute -left-10 top-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-md">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <CardTitle className="text-xl text-slate-800">{exp.title}</CardTitle>
                        <CardDescription className="text-lg font-semibold text-blue-600">{exp.company}</CardDescription>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{exp.period}</div>
                        <div className="flex items-center gap-1 mt-1"><MapPin className="w-4 h-4" />{exp.location}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 mb-4">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2 text-slate-600">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
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
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">{project.title}</CardTitle>
                  <CardDescription className="text-slate-600">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-700 mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-blue-200 text-blue-700">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-700 mb-2">Key Highlights:</h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, hlIndex) => (
                        <li key={hlIndex} className="flex items-start gap-2 text-slate-600 text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm"><Github className="w-4 h-4 mr-2" /> Code</Button>
                    <Button variant="outline" size="sm"><ExternalLink className="w-4 h-4 mr-2" /> Demo</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">Let's Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-slate-700 mb-8">Interested in collaborating on sustainability projects or discussing data science opportunities?</p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white"><Mail className="w-5 h-5 mr-2" /> Get In Touch</Button>
                <Button variant="outline" size="lg" className="border-slate-400 text-slate-800 hover:bg-slate-100"><Linkedin className="w-5 h-5 mr-2" /> LinkedIn</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
