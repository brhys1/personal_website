"use client"

import type React from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, Scroll, useScroll, OrbitControls, Environment, Text, Plane } from "@react-three/drei"
import { useRef, useState, useEffect, useMemo, memo, Suspense } from "react"
import * as THREE from "three"
import { useIsMobile } from "../hooks/use-mobile"
import RegularPortfolio from "./regular-portfolio"

const BLOCK_COUNT = 40 // how many blocks to spawn
const SPACING = 6 // distance (z) between blocks
const CORRIDOR_LEN = BLOCK_COUNT * SPACING // used to map scroll → distance
const SCROLL_STEP = 0.1 // Amount to move forward/backward on button press
const MIN_OFFSET = 0
const MAX_OFFSET = 1
const cameraYRef = { current: 0 }

const TEXT_COLORS = {
  company: "#1e40af", // dark blue
  title: "#3b82f6", // medium blue
  content: "#1f2937", // dark gray
  heading: "#0f172a", // slate-900
} as const

/**
 * One long row of alternating blocks you'll fly THROUGH.
 * Blocks sit just off-centre so the camera path stays clear.
 */

// 3D Scene Components
function Mountains({ position }: { position: THREE.Vector3Tuple }) {
  // Memoize the mountain meshes to prevent regeneration on scroll
  const mountainMeshes = useMemo(() => {
    const z = (position[2] / 30) ** 2
    const mtns = Math.floor(-position[2] / 70 + 16)

    return Array.from({ length: mtns }, (_, i) => {
      const x = -800 + (i * 1600) / (mtns - 1)
      const coneHeight = z + Math.random() * 30
      const color = `hsl(${200 + Math.random() * 40}, 35%, ${50 + Math.random() * 20}%)`
      return { x, height: coneHeight, color }
    })
  }, [position[2]]) // Only recalculate if position[2] changes

  return (
    <group position={position}>
      {mountainMeshes.map((mtn, i) => (
        <mesh key={i} position={[mtn.x, 40, -20 - Math.random() * 30]}>
          <coneGeometry args={[mtn.height, mtn.height, 40]} />
          <meshLambertMaterial color={mtn.color} />
        </mesh>
      ))}
    </group>
  )
}

function Forest() {
  const grassRef = useRef<THREE.Group>(null)

  const trees = useMemo(() => {
    return Array.from({ length: 70 }, () => {
      const x = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 400 + 20)
      const z = (Math.random() - 0.5) * 400
      const scale = 3.2 + Math.random() * 1.6
      return { x, z, scale }
    })
  }, [])

  return (
    <group ref={grassRef}>
      {/* Ground plane */}
      <Plane args={[600, 600]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshLambertMaterial color="#4ade80" />
      </Plane>

      {/* Trees */}
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, -1.8, tree.z]} scale={tree.scale}>
          {/* Tree trunk */}
          <mesh>
            <cylinderGeometry args={[0.4, 0.6, 3]} />
            <meshLambertMaterial color="#854d0e" />
          </mesh>
          {/* Tree foliage - multiple layers */}
          {[...Array(3)].map((_, j) => (
            <mesh key={j} position={[0, 2 + j * 1.2, 0]}>
              <coneGeometry args={[2 - j * 0.4, 2, 8]} />
              <meshLambertMaterial color={`hsl(140, 60%, ${25 + j * 10}%)`} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

function PathStones() {
  const isMobile = useIsMobile()
  // Memoize the stone positions and rotations
  const stones = useMemo(() => {
    return Array.from({ length: 43 }, (_, i) => {
      const x = Math.sin(i * 0.3) * 2
      const rotation = Math.random() * Math.PI
      const scale = 0.8 + Math.random() * 0.4
      return { x, z: i * 4, rotation, scale }
    })
  }, []) // Empty dependency array since stones don't change

  return (
    <group>
      {stones.map((stone, i) => (
        <group key={i}>
          <mesh position={[stone.x, -1.5, stone.z]} rotation={[0, stone.rotation, 0]}>
            <cylinderGeometry args={[stone.scale, stone.scale, 0.2]} />
            <meshLambertMaterial color="#94a3b8" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

interface ExperienceDisplayProps {
  position: THREE.Vector3Tuple
  rotation: THREE.Vector3Tuple
  title: string
  company: string
  impact: string | string[]
  logoPlaceholder?: boolean
}

function ExperienceDisplay({
  position,
  rotation,
  title,
  company,
  impact,
  logoPlaceholder = true,
}: ExperienceDisplayProps) {
  const groupRef = useRef<THREE.Group>(null)
  const platformColor = "#60a5fa"

  useFrame((state) => {
    if (groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      groupRef.current.position.set(position[0], cameraYRef.current + floatY, position[2])
    }
  })

  return (
    <group rotation={rotation} ref={groupRef}>
      <group position={[0, 1.5, 0]}>
        {/* Logo placeholder */}
        {logoPlaceholder && (
          <mesh position={[0, 4.5, 0]}>
            <boxGeometry args={[4, 1, 0.2]} />
            <meshStandardMaterial color="#e5e7eb" />
          </mesh>
        )}

        <mesh position={[0, 0.4, -0.05]}>
          <planeGeometry args={[5.5, 10]} />
          <meshStandardMaterial color="white" transparent opacity={1} />
        </mesh>
        {/* Company Name */}
        <Text
          position={[0, 3, 0]}
          fontSize={0.4}
          color={TEXT_COLORS.company}
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          fontWeight={600}
        >
          {company}
        </Text>

        {/* Title */}
        <Text
          position={[0, 2, 0]}
          fontSize={0.25}
          color={TEXT_COLORS.title}
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          fontWeight={500}
        >
          {title}
        </Text>

        {/* Impact bullets */}
        {Array.isArray(impact) &&
          impact.map((point, index) => (
            <Text
              key={index}
              position={[-1.8, 1 - index * 0.4, 0]}
              fontSize={0.18}
              color={TEXT_COLORS.content}
              anchorX="left"
              anchorY="middle"
              maxWidth={3.4}
              lineHeight={1.2}
            >
              • {point}
            </Text>
          ))}
      </group>

      {/* Particle effect */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              Float32Array.from(
                Array(300)
                  .fill(0)
                  .map(() => (Math.random() - 0.5) * 4),
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color={platformColor} transparent opacity={0.4} />
      </points>
    </group>
  )
}

interface ProjectDisplayProps {
  position: THREE.Vector3Tuple
  rotation: THREE.Vector3Tuple
  title: string
  description: string
  technologies: string[]
  highlights: string[]
}

function ProjectDisplay({ position, rotation, title, description, technologies, highlights }: ProjectDisplayProps) {
  const groupRef = useRef<THREE.Group>(null)
  const platformColor = "#10b981" // emerald-500 for projects

  useFrame((state) => {
    if (groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      groupRef.current.position.set(position[0], cameraYRef.current + floatY, position[2])
    }
  })

  return (
    <group rotation={rotation} ref={groupRef}>
      <group position={[0, 1.5, 0]}>
        {/* Project icon/placeholder */}
        <mesh position={[0, 4.5, 0]}>
          <boxGeometry args={[4, 1, 0.2]} />
          <meshStandardMaterial color="#34d399" />
        </mesh>

        <mesh position={[0, 0.4, -0.05]}>
          <planeGeometry args={[5.5, 10]} />
          <meshStandardMaterial color="white" transparent opacity={1} />
        </mesh>

        {/* Project Title */}
        <Text
          position={[0, 3, 0]}
          fontSize={0.4}
          color="#059669" // emerald-700
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          fontWeight={600}
        >
          {title}
        </Text>

        {/* Description */}
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.2}
          color={TEXT_COLORS.title}
          anchorX="center"
          anchorY="middle"
          maxWidth={4.5}
          textAlign="center"
          fontWeight={500}
        >
          {description}
        </Text>

        {/* Technologies */}
        <Text
          position={[0, 1.6, 0]}
          fontSize={0.15}
          color="#6b7280" // gray-500
          anchorX="center"
          anchorY="middle"
          maxWidth={4.5}
          textAlign="center"
        >
          {technologies.join(" • ")}
        </Text>

        {/* Highlights */}
        {highlights.map((highlight, index) => (
          <Text
            key={index}
            position={[-1.8, 0.8 - index * 0.4, 0]}
            fontSize={0.18}
            color={TEXT_COLORS.content}
            anchorX="left"
            anchorY="middle"
            maxWidth={3.4}
            lineHeight={1.2}
          >
            • {highlight}
          </Text>
        ))}
      </group>

      {/* Particle effect with different color */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              Float32Array.from(
                Array(300)
                  .fill(0)
                  .map(() => (Math.random() - 0.5) * 4),
              ),
              3,
            ]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color={platformColor} transparent opacity={0.4} />
      </points>
    </group>
  )
}

function PersonalCard({ position, rotation }: { position: THREE.Vector3Tuple; rotation: THREE.Vector3Tuple }) {
  const groupRef = useRef<THREE.Group>(null)
  const primaryColor = "#2563eb" // blue-600
  const bgColor = "#ffffff"

  useFrame((state) => {
    if (groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.set(position[0], cameraYRef.current + floatY, position[2])
    }
  })

  return (
    <group rotation={rotation} ref={groupRef}>
      {/* Main panel */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[6, 4, 0.1]} />
        <meshStandardMaterial color={bgColor} />
      </mesh>

      {/* Accent border top */}
      <mesh position={[0, 3.4, 0.06]}>
        <boxGeometry args={[6, 0.2, 0.01]} />
        <meshStandardMaterial color={primaryColor} />
      </mesh>

      {/* Accent border bottom */}
      <mesh position={[0, -0.4, 0.06]}>
        <boxGeometry args={[6, 0.2, 0.01]} />
        <meshStandardMaterial color={primaryColor} />
      </mesh>

      {/* Content */}
      <group position={[0, 2, 0.06]}>
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.5}
          color={TEXT_COLORS.company}
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          fontWeight={600}
        >
          Rhys Burman
        </Text>

        <Text
          position={[0, 0.2, 0]}
          fontSize={0.25}
          color={TEXT_COLORS.title}
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          fontWeight={500}
        >
          Data Scientist & Sustainability
        </Text>

        <Text
          position={[0, -0.4, 0]}
          fontSize={0.18}
          color={TEXT_COLORS.content}
          anchorX="center"
          anchorY="middle"
          maxWidth={4.5}
          textAlign="center"
        >
          Python • SQL • C++ • R • Java • JavaScript
        </Text>
        <Text
          position={[0, -0.7, 0]}
          fontSize={0.18}
          color={TEXT_COLORS.content}
          anchorX="center"
          anchorY="middle"
          maxWidth={4.5}
          textAlign="center"
        >
          AWS • Docker • PostgreSQL • Pandas • React.js
        </Text>
            <Text
          position={[0, -1.0, 0]}
          fontSize={0.18}
              color={TEXT_COLORS.content}
              anchorX="center"
              anchorY="middle"
          maxWidth={4.5}
          textAlign="center"
            >
          PyTorch • Scikit-Learn • Flask • Firebase
            </Text>
      </group>
    </group>
  )
}

function InterestPedestal({
  position,
  rotation,
  icon,
  label,
}: {
  position: THREE.Vector3Tuple
  rotation: THREE.Vector3Tuple
  icon: "soccer" | "book" | "map" | "cards"
  label: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const platformColor = "#60a5fa"
  const time = useRef(0)

  useFrame((state) => {
    time.current = state.clock.elapsedTime
    if (groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      groupRef.current.position.set(position[0], cameraYRef.current + floatY, position[2])
    }
  })

  const renderIcon = () => {
    switch (icon) {
      case "soccer":
        return (
          <mesh position={[0, 2, 0]} rotation={[0, time.current * 0.5, 0]}>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial color="white" />
          </mesh>
        )
      case "book":
        return (
          <group position={[0, 2, 0]} rotation={[0.3, time.current * 0.2, 0]}>
            {/* Book cover */}
            <mesh>
              <boxGeometry args={[0.8, 1, 0.1]} />
              <meshStandardMaterial color="#1e40af" />
            </mesh>
            {/* Pages */}
            <mesh position={[0.4, 0, 0]}>
              <boxGeometry args={[0.05, 0.95, 0.08]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </group>
        )
      case "map":
        return (
          <group position={[0, 2, 0]} rotation={[0.5, time.current * 0.2, 0]}>
            {/* Map base */}
            <mesh>
              <planeGeometry args={[1.2, 0.8]} />
              <meshStandardMaterial color="#fef3c7" side={THREE.DoubleSide} />
            </mesh>
            {/* Map details */}
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[1, 0.6]} />
              <meshStandardMaterial color="#92400e" opacity={0.3} transparent side={THREE.DoubleSide} />
            </mesh>
          </group>
        )
      case "cards":
        return (
          <group position={[0, 2, 0]} rotation={[0.2, time.current * 0.3, 0]}>
            {/* Multiple cards fanned out */}
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[i * 0.1, i * 0.05, 0]} rotation={[0, Math.PI / 2, i * 0.2]}>
                <boxGeometry args={[0.7, 1, 0.01]} />
                <meshStandardMaterial color="red" />
              </mesh>
            ))}
          </group>
        )
    }
  }

  return (
    <>
      <Text
        position={[-8, 8, 0]}
        rotation={[0, Math.PI, 0]}
        fontSize={2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={20}
        fontWeight={700}
      >
        Interests
      </Text>
    <group rotation={rotation} ref={groupRef}>
      {/* Platform base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1.2, 0.2, 8]} />
        <meshStandardMaterial color={platformColor} />
      </mesh>

      {/* Light beam */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.1, 1, 2, 8, 1, true]} />
        <meshStandardMaterial color={platformColor} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating ring */}
      <mesh position={[0, 0.5, 0]} rotation={[0, time.current * 0.5 + (position[0] < -10 ? Math.PI : 0), 0]}>
        <torusGeometry args={[1.1, 0.05, 16, 32]} />
        <meshStandardMaterial color={platformColor} />
      </mesh>

      {/* Icon */}
      {renderIcon()}

      {/* Label */}
      <Text
        position={[0, 0.3, 1.3]}
        fontSize={0.2}
        color={TEXT_COLORS.content}
        fontWeight={700}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
    </>
  )
}

function ExperienceSection() {
  return (
    <group position={[0, 0, 75]}>
      {/* "Experiences" text on the ground */}
      <Text
        position={[0, 8, 0]}
        rotation={[0, Math.PI, 0]}
        fontSize={2}
        color={TEXT_COLORS.heading}
        anchorX="center"
        anchorY="middle"
        maxWidth={20} 
        fontWeight={700}
      >
        EXPERIENCES
      </Text>

      {/* Personal Description */}
      <PersonalCard position={[8, 0, -50]} rotation={[0, Math.PI / 3 + Math.PI, 0]} />

      {/* Interest Pedestals */}
      <group position={[8, 0, -35]}>
        <InterestPedestal position={[-2, 0, 0]} rotation={[0, Math.PI / 6 + Math.PI, 0]} icon="soccer" label="Soccer" />
        <InterestPedestal
          position={[-14, 0, 0]}
          rotation={[0, -Math.PI / 6 + Math.PI, 0]}
          icon="book"
          label="Harry Potter"
        />
        <InterestPedestal
          position={[-14, 0, 6]}
          rotation={[0, -Math.PI / 6 + Math.PI, 0]}
          icon="map"
          label="Geography"
        />
        <InterestPedestal
          position={[-2, 0, 6]}
          rotation={[0, Math.PI / 6 + Math.PI, 0]}
          icon="cards"
          label="Card Games"
        />
      </group>

      {/* Clear Estimates */}
      <ExperienceDisplay
        position={[-12, 0, 0]}
        rotation={[0, -Math.PI / 3 + Math.PI, 0]}
        company="Clear Estimates"
        title="Data Engineering Intern"
        impact={[
          "Built a distributed price scraping system using Python and Selenium, retrieving 6,000+ prices from 350+ supplier locations; improved data accuracy by 21% and error detection by 20%.",
          "Containerized and deployed the pipeline via AWS Batch and Docker, and created Pandas analysis scripts; reduced collection time by 97%, freeing 1000+ hours per year in manual collection and processing.",
          "Designed and engineered workflows to integrate RemodelingCosts.com, leveraging prebuilt templates from custom API and query classification to generate contractor leads; expected to 3x net company revenue in 4 years.",
          "Processed 28M+ rows of labor data using Pandas and PostgreSQL to identify and correct input inconsistencies, increased model accuracy by 19% and customer satisfaction by 62%.",
        ]}
      />

      {/* RemodelingCosts.com */}
      <ExperienceDisplay
        position={[12, 0, 0]}
        rotation={[0, Math.PI / 3 + Math.PI, 0]}
        company="RemodelingCosts.com"
        title="Data Science Intern"
        impact={[
          "Implemented GenAI to generate templates based on user queries, enabling AI-driven estimate generation; used Google analytics and model-query A/B testing to increase accuracy and generate 80% more leads across 5+ iterations.",
          "Collaborated with CEO to build platform to connect users with contractors; projected 3x in total company revenue.",
          "Designed and engineered AI generated templates, based on unsupervised grouping, Vertex AI vectorized database, and Gemini text processing; allowed for 50% increase in number of user on platform and 70% higher lead conversion rate.",
        ]}
      />

      {/* Delta Airlines */}
      <ExperienceDisplay
        position={[-12, 0, 15]}
        rotation={[0, -Math.PI / 3 + Math.PI, 0]}
        company="Delta Airlines"
        title="ML Software Intern"
        impact={[
          "Engineered and trained two ML models using PyTorch (Random Forest and Logistic Regressor) that estimate delays and connection success rates (R² = 0.99; specificity 96%), significantly reducing reliance on conservative scheduling buffers.",
          "Enabled an average 4-minute reduction in departure time at DTW, unlocking the potential to schedule additional flights, generating a projected $2M in annual profit through improved aircraft utilization and on-time departures.",
        ]}
      />

      {/* UMich Sustainability */}
      <ExperienceDisplay
        position={[12, 0, 15]}
        rotation={[0, Math.PI / 3 + Math.PI, 0]}
        company="University of Michigan - Office of Campus Sustainability"
        title="Data Scientist"
        impact={[
          "Designed and implemented Python Polars pipelines to classify millions of transactions by GHG emissions category with TF-IDF — automated and streamlined processes during the university’s first attempt at classifying Scope 3 emissions.",
          "Used Gen-AI to extract and breakdown emissions data, reducing manual labor by over 60%; developed repeatable Python scripts to make workflows scalable.",
        ]}
      />

      {/* Integrate Health */}
      <ExperienceDisplay
        position={[-12, 0, 30]}
        rotation={[0, -Math.PI / 3 + Math.PI, 0]}
        company="Integrate Health"
        title="Founding Data Engineer"
        impact={[
          "Provisioned HIPAA-compliant infrastructure using AWS Aurora PostgreSQL within a VPC; launched encrypted database to support sensitive EHR data for risk assessment modeling.",
          "Supported engineering of patient and population health data pipelines to feed risk models achieving 87% accuracy–outperforming common commercial models.",
          "Developed custom dashboards platform allowing for hospitals to visualize and analyze both individual and population-level health data; surfaced risk trends that informed equitable care recommendations.",
        ]}
      />
    </group>
  )
}

function ProjectsSection() {
  return (
    <group position={[0, 0, 150]}>
      {/* "Projects" text on the ground */}
      <Text
        position={[0, 8, 0]}
        rotation={[0, Math.PI, 0]}
        fontSize={2}
        color="#059669"
        anchorX="center"
        anchorY="middle"
        maxWidth={20}
        fontWeight={700}
      >
        PROJECTS
      </Text>
      {/* MCC Carpools Web App */}
      <ProjectDisplay
        position={[-12, 0, 0]}
        rotation={[0, -Math.PI / 3 + Math.PI, 0]}
        title="MCC Carpools Web App"
        description="Developed a scalable carpool web app using React.js, Flask, and PostgreSQL; increased group participation by 61%."
        technologies={["React.js", "Flask", "PostgreSQL", "Google Maps API"]}
        highlights={[
          "Implemented Google Maps API for geo-optimization and created REST APIs for CRUD operations and data matching.",
        ]}
      />
      {/* KTP Spotify Playlist Generator */}
      <ProjectDisplay
        position={[12, 0, 0]}
        rotation={[0, Math.PI / 3 + Math.PI, 0]}
        title="KTP Spotify Playlist Generator"
        description="Designed backend APIs to serve music suggestions in real time, using Firebase, Spotify OAuth, and Elasticsearch."
        technologies={["Firebase", "Spotify OAuth", "Elasticsearch", "TF-IDF"]}
        highlights={[
          "Built a custom TF-IDF-based classifier for party music that achieved 73% accuracy; integrated with personal user data.",
        ]}
      />
      {/* MapReduce Simulator & Search Engine */}
      <ProjectDisplay
        position={[-12, 0, 15]}
        rotation={[0, -Math.PI / 3 + Math.PI, 0]}
        title="MapReduce Simulator & Search Engine"
        description="Simulated distributed MapReduce system using TCP/UDP, fault tolerance, parallelization, and heartbeat tracking."
        technologies={["Python", "Flask", "TCP/UDP", "TF-IDF"]}
        highlights={[
          "Built an inverted index system with TF-IDF weighting and exposed a Flask API to serve ranked search results.",
        ]}
      />
      {/* ML Cuisine Classifier */}
      <ProjectDisplay
        position={[12, 0, 15]}
        rotation={[0, Math.PI / 3 + Math.PI, 0]}
        title="ML Cuisine Classifier"
        description="Developed and optimized an ML pipeline using scikit-learn, integrating TF-IDF, Random Forest, K-fold testing, and K-Nearest Neighbors (KNN) to bring classification accuracy to 83%."
        technologies={["scikit-learn", "TF-IDF", "Random Forest", "KNN"]}
        highlights={[]}
      />
    </group>
  )
}

function IntroCard() {
  const isMobile = useIsMobile()
  const position: [number, number, number] = isMobile ? [0, 2, 10] : [0, 2, 7] // Move further back on mobile
  const scale = isMobile ? 0.8 : 1 // Scale down on mobile

  return (
    <group position={position} rotation={[0, Math.PI, 0]} scale={scale}>
      {/* Background panel */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.8}
        color="#2563eb"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        fontWeight={600}
      >
        Rhys Burman
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.4}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        fontWeight={500}
      >
        Data Science & Sustainability
      </Text>

      {/* Description */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.25}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
        maxWidth={8}
        textAlign="center"
      >
        Welcome to my digital space where data science{"\n"}
        meets sustainability. I'm passionate about leveraging{"\n"}
        data-driven solutions to tackle environmental challenges.
      </Text>
    </group>
  )
}

// Memoize the entire NatureScene to prevent unnecessary re-renders
const NatureScene = memo(function NatureScene({ show3DOnly }: { show3DOnly: boolean }) {
  return (
    <>
      {/* <IntroCard /> */}
      {show3DOnly && <ExperienceSection />}
      {show3DOnly && <ProjectsSection />}
      <PathStones />
      <Forest />
      <Mountains position={[0, 0, 400]} />
      <Mountains position={[0, 0, 600]} />
    </>
  )
})

function RideCameraRig({
  children, 
  manualOffset,
  show3DOnly,
}: { children: React.ReactNode; manualOffset: number; show3DOnly: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const scroll = useScroll()
  const isMobile = useIsMobile()

  useFrame(() => {
    const offset = isMobile ? manualOffset : (scroll?.offset ?? 0)
    const z = show3DOnly ? offset * CORRIDOR_LEN : -30
    const y = show3DOnly ? -1.5 + offset * -3 : -10
    const x = show3DOnly ? 0 : 0

    if (group.current) {
      group.current.position.y = y
      group.current.position.z = z
    }
  })

  return (
    <group ref={group} rotation={[0, Math.PI, 0]}>
      {children}
    </group>
  )
}

export default function Portfolio() {
  const isMobile = useIsMobile()
  const [manualOffset, setManualOffset] = useState(0)
  const [isMovingForward, setIsMovingForward] = useState(false)
  const [isMovingBackward, setIsMovingBackward] = useState(false)
  const [show3DOnly, setShow3DOnly] = useState(false)

  // Handle continuous movement
  useEffect(() => {
    if (!isMobile) return

    const moveInterval = setInterval(() => {
      if (isMovingForward) {
        setManualOffset((prev) => Math.min(MAX_OFFSET, prev + SCROLL_STEP * 0.016))
      } else if (isMovingBackward) {
        setManualOffset((prev) => Math.max(MIN_OFFSET, prev - SCROLL_STEP * 0.016))
      }
    }, 16)

    return () => clearInterval(moveInterval)
  }, [isMobile, isMovingForward, isMovingBackward])

  return (
    <div
      className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600 select-none"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {/* View Toggle Button */}
      <button
        onClick={() => setShow3DOnly((prev) => !prev)}
        className="fixed top-8 right-8 bg-slate-900 px-6 py-3 rounded-lg border border-slate-700 text-white/90 shadow-xl z-50 hover:bg-slate-800 transition-colors"
      >
        {show3DOnly ? "Back to Basic View" : "Explore in 3D"}
      </button>

      {show3DOnly ? (
        <div
          className="fixed top-8 left-8 bg-slate-900 p-4 rounded-lg border border-slate-700 text-white/90 shadow-xl z-50 select-none"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            msUserSelect: "none",
          }}
        >
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            My World
          </h2>
          <ul className="text-sm space-y-1 list-disc list-inside opacity-90 select-none">
            {!isMobile ? (
              <>
                <li>Scroll to explore</li>
                <li>Drag to look around</li>
              </>
            ) : null}
          </ul>
        </div>
      ) : null}

      {/* Mobile nav buttons OUTSIDE the Canvas */}
      {isMobile && show3DOnly && (
        <>
          <div className="fixed bottom-8 left-6 z-50">
            <button
              className="p-4 bg-white/90 rounded-full shadow-lg text-blue-600 hover:bg-white transition-colors select-none"
              style={{
                WebkitTapHighlightColor: "transparent",
                touchAction: "none",
              }}
              onPointerDown={(e) => {
                e.preventDefault()
                setIsMovingBackward(true)
              }}
              onPointerUp={() => setIsMovingBackward(false)}
              onPointerLeave={() => setIsMovingBackward(false)}
              onContextMenu={(e) => e.preventDefault()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 15l-6 6-6-6" />
              </svg>
            </button>
          </div>
          <div className="fixed bottom-8 right-6 z-50">
            <button
              className="p-4 bg-white/90 rounded-full shadow-lg text-blue-600 hover:bg-white transition-colors select-none"
              style={{
                WebkitTapHighlightColor: "transparent",
                touchAction: "none",
              }}
              onPointerDown={(e) => {
                e.preventDefault()
                setIsMovingForward(true)
              }}
              onPointerUp={() => setIsMovingForward(false)}
              onPointerLeave={() => setIsMovingForward(false)}
              onContextMenu={(e) => e.preventDefault()}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 9l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </>
      )}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 1, 0], fov: 75 }}>
          <Suspense fallback={null}>
            <color attach="background" args={["#93c5fd"]} />
            <fog attach="fog" args={["#bfdbfe", 120, 1000]} />
            <ambientLight intensity={0.4} color="#e0f2fe" />
            <directionalLight position={[5, 8, -5]} intensity={1.2} color="#60a5fa" />
            <directionalLight position={[-4, 6, -5]} intensity={0.4} color="#93c5fd" />
            <Environment preset="dawn" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI}
              rotateSpeed={-0.3}
              enableDamping={true}
              target={[0, 1, -5]}
            />
            {!isMobile ? (
              <ScrollControls pages={4} damping={0.15}>
                <Scroll>
                  <RideCameraRig manualOffset={manualOffset} show3DOnly={show3DOnly}>
                    <NatureScene show3DOnly={show3DOnly} />
                  </RideCameraRig>
                </Scroll>
              </ScrollControls>
            ) : (
              <RideCameraRig manualOffset={manualOffset} show3DOnly={show3DOnly}>
                <NatureScene show3DOnly={show3DOnly} />
              </RideCameraRig>
            )}
          </Suspense>
        </Canvas>
      </div>

      {!show3DOnly && (
        <div className="relative z-10">
          <RegularPortfolio />
        </div>
      )}
    </div>
  )
}
