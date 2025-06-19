"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Html, Environment, PerspectiveCamera, useScroll, ScrollControls } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, TrendingUp } from "lucide-react"

// 3D Scene Components
function FloatingCard({ position, rotation, children, scale = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[4, 3]} />
      <meshStandardMaterial transparent opacity={0.1} color="#1e40af" />
      <Html
        transform
        occlude
        position={[0, 0, 0.01]}
        style={{
          width: "400px",
          height: "300px",
          pointerEvents: "auto",
        }}
      >
        <div className="w-full h-full bg-slate-900/90 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 text-white">
          {children}
        </div>
      </Html>
    </mesh>
  )
}

function DataVisualization({ position }) {
  const groupRef = useRef()
  const state = useFrame() // Declare the state variable

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Animated data bars */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 0.785) * 2,
            Math.sin(state.clock?.elapsedTime * 2 + i) * 0.5,
            Math.sin(i * 0.785) * 2,
          ]}
        >
          <boxGeometry args={[0.2, Math.abs(Math.sin(Date.now() * 0.001 + i)) * 2 + 0.5, 0.2]} />
          <meshStandardMaterial color={`hsl(${200 + i * 20}, 70%, 50%)`} />
        </mesh>
      ))}

      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function ParticleField({ count = 100 }) {
  const points = useRef()
  const particlesPosition = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 50
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 50
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={0.6} />
    </points>
  )
}

function Scene() {
  const scroll = useScroll()
  const cameraRef = useRef()

  useFrame(() => {
    if (cameraRef.current && scroll) {
      const offset = scroll.offset
      // Move camera deeper into the scene as user scrolls
      cameraRef.current.position.z = 10 - offset * 30
      cameraRef.current.position.y = offset * 5
    }
  })

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
        "Leading research initiatives in predictive modeling and statistical analysis for healthcare outcomes.",
      technologies: ["Python", "TensorFlow", "Apache Spark", "PostgreSQL"],
    },
    {
      title: "Data Science Consultant",
      company: "Michigan Analytics Consortium",
      period: "2021 - 2022",
      description: "Provided data science consulting services to Fortune 500 companies.",
      technologies: ["R", "Shiny", "AWS", "Docker"],
    },
    {
      title: "Research Assistant",
      company: "U-M School of Information",
      period: "2020 - 2021",
      description: "Conducted research on natural language processing and sentiment analysis.",
      technologies: ["Python", "NLTK", "PyTorch", "Jupyter"],
    },
    {
      title: "Data Analyst Intern",
      company: "Ford Motor Company",
      period: "2019 - 2020",
      description: "Analyzed vehicle performance data and customer feedback.",
      technologies: ["Tableau", "SQL Server", "Excel", "Power BI"],
    },
  ]

  const projects = [
    {
      title: "Healthcare Outcome Predictor",
      description: "Developed a machine learning model to predict patient readmission rates with 94% accuracy.",
      technologies: ["Python", "Scikit-learn", "Flask", "React"],
      impact: "Reduced readmission rates by 15%",
    },
    {
      title: "Climate Data Visualization Platform",
      description: "Created an interactive dashboard analyzing 50 years of climate data across Michigan.",
      technologies: ["D3.js", "Python", "FastAPI", "PostgreSQL"],
      impact: "Used by 500+ researchers",
    },
    {
      title: "Social Media Sentiment Analyzer",
      description: "Built a real-time sentiment analysis system processing 100K+ tweets daily.",
      technologies: ["Python", "BERT", "Apache Kafka", "MongoDB"],
      impact: "98.5% accuracy rate",
    },
    {
      title: "Supply Chain Optimization Model",
      description: "Developed optimization algorithms for supply chain management.",
      technologies: ["R", "Linear Programming", "Shiny", "MySQL"],
      impact: "$2M annual savings",
    },
  ]

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={75} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
      <Environment preset="night" />

      {/* Particle field background */}
      <ParticleField count={200} />

      {/* Hero Section - Front layer */}
      <group position={[0, 0, 0]}>
        <Text
          position={[0, 3, 0]}
          fontSize={2}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          Alex Chen
        </Text>

        <Text
          position={[0, 1.5, 0]}
          fontSize={0.8}
          color="#93c5fd"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.ttf"
        >
          Data Scientist & Researcher
        </Text>

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color="#1e40af" emissive="#3b82f6" emissiveIntensity={0.2} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* About Section - Second layer */}
      <FloatingCard position={[-6, 2, -8]} rotation={[0, 0.3, 0]}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-blue-400">About Me</h3>
          <p className="text-sm text-gray-300">
            I'm a data scientist with a passion for uncovering patterns in complex datasets and building predictive
            models that drive meaningful impact.
          </p>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 text-xs">
              PhD Candidate
            </Badge>
            <Badge variant="secondary" className="bg-blue-900/50 text-blue-200 text-xs">
              Published Researcher
            </Badge>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard position={[6, 1, -8]} rotation={[0, -0.3, 0]}>
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-blue-400">Technical Skills</h3>
          {skills.slice(0, 4).map((skill, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">{skill.name}</span>
                <span className="text-blue-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </FloatingCard>

      {/* Data Visualization - Center piece */}
      <DataVisualization position={[0, 0, -12]} />

      {/* Experience Section - Third layer */}
      {experiences.map((exp, index) => (
        <FloatingCard
          key={index}
          position={[index % 2 === 0 ? -7 : 7, 3 - index * 1.5, -16 - index * 2]}
          rotation={[0, index % 2 === 0 ? 0.2 : -0.2, 0]}
          scale={0.8}
        >
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-blue-400">{exp.title}</h4>
            <p className="text-xs text-gray-300">{exp.company}</p>
            <p className="text-xs text-blue-300">{exp.period}</p>
            <p className="text-xs text-gray-400">{exp.description}</p>
            <div className="flex flex-wrap gap-1">
              {exp.technologies.slice(0, 3).map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary" className="bg-blue-900/30 text-blue-200 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </FloatingCard>
      ))}

      {/* Projects Section - Fourth layer */}
      {projects.map((project, index) => (
        <FloatingCard
          key={index}
          position={[Math.cos(index * 1.57) * 8, Math.sin(index * 1.57) * 3, -25 - index * 3]}
          rotation={[0, index * 0.5, 0]}
          scale={0.9}
        >
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-blue-400">{project.title}</h4>
            <p className="text-xs text-gray-300">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary" className="bg-blue-900/30 text-blue-200 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs">{project.impact}</span>
            </div>
          </div>
        </FloatingCard>
      ))}

      {/* Contact Section - Final layer */}
      <FloatingCard position={[0, 0, -40]} rotation={[0, 0, 0]} scale={1.2}>
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-blue-400">Let's Connect</h3>
          <p className="text-sm text-gray-300">
            I'm always interested in discussing new opportunities and research collaborations.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-xs"
            >
              <Github className="w-3 h-3 mr-1" />
              GitHub
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-xs"
            >
              <Linkedin className="w-3 h-3 mr-1" />
              LinkedIn
            </Button>
          </div>
        </div>
      </FloatingCard>

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
    </>
  )
}

export default function Portfolio3D() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="w-full h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-blue-400 text-xl">Loading 3D Portfolio...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative">
      {/* Instructions overlay */}
      <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 text-white max-w-sm">
        <h3 className="text-sm font-bold text-blue-400 mb-2">Navigation</h3>
        <ul className="text-xs space-y-1 text-gray-300">
          <li>• Scroll to dive deeper into the portfolio</li>
          <li>• Drag to rotate and explore</li>
          <li>• Click on cards to interact</li>
        </ul>
      </div>

      {/* 3D Canvas */}
      <Canvas>
        <ScrollControls pages={6} damping={0.1}>
          <Scene />
        </ScrollControls>
      </Canvas>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-blue-400 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
