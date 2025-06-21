"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, Scroll, useScroll, OrbitControls, Environment, Text, Plane, Html } from "@react-three/drei"
import { useRef, useState, useEffect, useMemo, memo } from "react"
import * as THREE from "three"
import { group } from "console"
import { useIsMobile } from "./hooks/use-mobile"

const BLOCK_COUNT = 40      // how many blocks to spawn
const SPACING      = 6      // distance (z) between blocks
const CORRIDOR_LEN = BLOCK_COUNT * SPACING   // used to map scroll → distance
const SCROLL_STEP = 0.1 // Amount to move forward/backward on button press
const MIN_OFFSET = 0
const MAX_OFFSET = 1
const cameraYRef = { current: 0 }

const TEXT_COLORS = {
  company: "#1e40af", // dark blue
  title: "#3b82f6",  // medium blue
  content: "#1f2937"  // dark gray
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
      const x = -800 + (i * 1600 / (mtns - 1))
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
    return Array.from({ length: 40 }, (_, i) => {
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
          {/* Add arrow above the first stone */}
          {i === 0 && (
            <group position={[stone.x, 0, stone.z]}>
              <mesh position={[0, 0, 1]} rotation={[-Math.PI / 2, 0, Math.PI]} scale={isMobile ? 0.7 : 1}>
                <shapeGeometry args={[new THREE.Shape()
                  .moveTo(-0.25, 0)      // Start at base left
                  .lineTo(0.25, 0)       // Base right
                  .lineTo(0.25, 0.5)     // Shaft right
                  .lineTo(0.5, 0.5)      // Arrow head base right
                  .lineTo(0, 1)          // Arrow head tip
                  .lineTo(-0.5, 0.5)     // Arrow head base left
                  .lineTo(-0.25, 0.5)    // Shaft left
                  .lineTo(-0.25, 0)      // Back to start
                ]} />
                <meshStandardMaterial color={TEXT_COLORS.company} />
              </mesh>
              <Text
                position={[0, 0, 0]}
                rotation={[-Math.PI / 2, 0, Math.PI]}
                fontSize={isMobile ? 0.15 : 0.2}
                color={TEXT_COLORS.content}
                anchorX="center"
                anchorY="middle"
                maxWidth={4}
              >
                Look Up and Explore
              </Text>
            </group>
          )}
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

function ExperienceDisplay({ position, rotation, title, company, impact, logoPlaceholder = true }: ExperienceDisplayProps) {
  const groupRef = useRef<THREE.Group>(null)
  const platformColor = "#60a5fa"
  
  useFrame((state) => {
    if (groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      groupRef.current.position.set(
        position[0],
        cameraYRef.current + floatY,
        position[2]
      )
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
        >
          {title}
        </Text>

        {/* Impact bullets */}
        {Array.isArray(impact) && impact.map((point, index) => (
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
            args={[Float32Array.from(Array(300).fill(0).map(() => (Math.random() - 0.5) * 4)), 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color={platformColor} transparent opacity={0.4} />
      </points>
    </group>
  )
}

function PersonalCard({ position, rotation }: { position: THREE.Vector3Tuple, rotation: THREE.Vector3Tuple }) {
  const groupRef = useRef<THREE.Group>(null)
  const primaryColor = "#2563eb"  // blue-600
  const bgColor = "#ffffff"
  
  useFrame((state) => {
    if (groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      groupRef.current.position.set(
        position[0],
        cameraYRef.current + floatY,
        position[2]
      )
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
          Leveraging ML and data science to drive
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
          environmental impact through innovative solutions
        </Text>

        <group position={[0, -1.2, 0]}>
          {[
            "Python • ML • AWS",
            "Sustainability • Analytics",
            "Full Stack • Data Engineering"
          ].map((text, idx) => (
            <Text
              key={idx}
              position={[0, -idx * 0.3, 0]}
              fontSize={0.15}
              color={TEXT_COLORS.content}
              anchorX="center"
              anchorY="middle"
              maxWidth={4}
            >
              {text}
            </Text>
          ))}
        </group>
      </group>
    </group>
  )
}

function InterestPedestal({ 
  position, 
  rotation, 
  icon, 
  label 
}: { 
  position: THREE.Vector3Tuple, 
  rotation: THREE.Vector3Tuple,
  icon: "soccer" | "book" | "map" | "cards",
  label: string
}) {
  const groupRef = useRef<THREE.Group>(null)
  const platformColor = "#60a5fa"
  const time = useRef(0)
  
  useFrame((state) => {
    time.current = state.clock.elapsedTime
    if (groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      groupRef.current.position.set(
        position[0],
        cameraYRef.current + floatY,
        position[2]
      )
    }
  })

  const renderIcon = () => {
    switch(icon) {
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
              <mesh key={i} position={[i * 0.1, i * 0.05, 0]} rotation={[0, Math.PI/2, i * 0.2]}>
                <boxGeometry args={[0.7, 1, 0.01]} />
                <meshStandardMaterial color="red" />
              </mesh>
            ))}
          </group>
        )
    }
  }

  return (
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
  )
}

function ExperienceSection() {
  return (
    <group position={[0, 0, 75]}>
      {/* Personal Description */}
      <PersonalCard
        position={[8, 0, -50]}
        rotation={[0, Math.PI/3 + Math.PI, 0]}
      />

      {/* Interest Pedestals */}
      <group position={[8, 0, -35]}>
        <InterestPedestal
          position={[-2, 0, 0]}
          rotation={[0, Math.PI/6 + Math.PI, 0]}
          icon="soccer"
          label="Soccer"
        />
        <InterestPedestal
          position={[-14, 0, 0]}
          rotation={[0, -Math.PI/6 + Math.PI, 0]}
          icon="book"
          label="Harry Potter"
        />
        <InterestPedestal
          position={[-14, 0, 6]}
          rotation={[0, -Math.PI/6 + Math.PI, 0]}
          icon="map"
          label="Geography"
        />
        <InterestPedestal
          position={[-2, 0, 6]}
          rotation={[0, Math.PI/6 + Math.PI, 0]}
          icon="cards"
          label="Card Games"
        />
      </group>

      {/* Clear Estimates */}
      <ExperienceDisplay
        position={[-8, 0, 0]}
        rotation={[0, -Math.PI/3 + Math.PI, 0]}
        company="Clear Estimates"
        title="Lead Data Scientist"
        impact={[
          "Built price scraper covering 350+ locations, 90% faster",
          "Analyzed 28M rows to improve accuracy by 21%",
          "Developed AI-powered contractor leads platform"
        ]}
      />

      {/* Delta Airlines */}
      <ExperienceDisplay
        position={[8, 0, 10]}
        rotation={[0, Math.PI/3 + Math.PI, 0]}
        company="Delta Airlines"
        title="Data Science Intern"
        impact={[
          "Flight predictor reduced decisions by 70%",
          "ML models achieved 96% specificity",
          "Cut wait times by 4min, $1M projected gain"
        ]}
      />

      {/* UMich Sustainability */}
      <ExperienceDisplay
        position={[-8, 0, 20]}
        rotation={[0, -Math.PI/3 + Math.PI, 0]}
        company="UMich Office of Sustainability"
        title="Data Science Consultant"
        impact={[
          "Created first automated emissions tracking",
          "Optimized data processing with pandas/polars",
          "Built automated sustainable labs workflows"
        ]}
      />

      {/* Integrate */}
      <ExperienceDisplay
        position={[8, 0, 30]}
        rotation={[0, Math.PI/3 + Math.PI, 0]}
        company="Integrate"
        title="ML Engineer"
        impact={[
          "Risk models with 87% accuracy for healthcare",
          "Built HIPAA-compliant AWS infrastructure",
          "Implemented secure patient data handling"
        ]}
      />
    </group>
  )
}

function IntroCard() {
  const isMobile = useIsMobile()
  const position: [number, number, number] = isMobile ? [0, 2, 10] : [0, 2, 7]  // Move further back on mobile
  const scale = isMobile ? 0.8 : 1  // Scale down on mobile

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
const NatureScene = memo(function NatureScene() {
  return (
    <>
      <IntroCard/>
      <ExperienceSection />
      <PathStones />
      <Forest/>
      <Mountains position={[0, 0, 400]} />
      <Mountains position={[0, 0, 600]} />
    </>
  )
})

function RideCameraRig({ children, manualOffset }: { children: React.ReactNode, manualOffset: number }) {
  const group = useRef<THREE.Group>(null!)
  const scroll = useScroll()
  const isMobile = useIsMobile()

  useFrame(() => {
    const offset = isMobile ? manualOffset : scroll?.offset ?? 0 
    const z = offset * CORRIDOR_LEN
    const y = -1.5 + offset * -3

    if (group.current) {
      group.current.position.z = z
      group.current.position.y = y
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

  // Handle continuous movement
  useEffect(() => {
    if (!isMobile) return

    const moveInterval = setInterval(() => {
      if (isMovingForward) {
        setManualOffset(prev => Math.min(MAX_OFFSET, prev + SCROLL_STEP * 0.016)) // 0.016 is roughly one frame at 60fps
      } else if (isMovingBackward) {
        setManualOffset(prev => Math.max(MIN_OFFSET, prev - SCROLL_STEP * 0.016))
      }
    }, 16) // Run at roughly 60fps

    return () => clearInterval(moveInterval)
  }, [isMobile, isMovingForward, isMovingBackward])

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      {/* Fixed overlay that won't move with scroll */}
      <div className="fixed top-8 left-8 bg-slate-900 p-4 rounded-lg border border-slate-700 text-white/90 shadow-xl z-50">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My World</h2>
        <ul className="text-sm space-y-1 list-disc list-inside opacity-90">
          {!isMobile ? (
           <>
            <li>Scroll to explore</li>
            <li>Drag to look around</li>
          </>
          ) : null}
        </ul>
      </div>

       {/* Mobile nav buttons OUTSIDE the Canvas */}
       {isMobile && (
        <>
          <div className="fixed bottom-8 left-6 z-50">
            <button
              className="px-6 py-3 bg-white/90 rounded-full shadow-lg text-blue-600 font-semibold hover:bg-white transition-colors"
              onPointerDown={() => setIsMovingBackward(true)}
              onPointerUp={() => setIsMovingBackward(false)}
              onPointerLeave={() => setIsMovingBackward(false)}
            >
              ← Back
            </button>
          </div>
          <div className="fixed bottom-8 right-6 z-50">
            <button
              className="px-6 py-3 bg-white/90 rounded-full shadow-lg text-blue-600 font-semibold hover:bg-white transition-colors"
              onPointerDown={() => setIsMovingForward(true)}
              onPointerUp={() => setIsMovingForward(false)}
              onPointerLeave={() => setIsMovingForward(false)}
            >
              Forward →
            </button>
          </div>
        </>
      )}

      <Canvas camera={{ position: [0, 1, 0], fov: 75 }}>
        <color attach="background" args={['#93c5fd']} />
        <fog attach="fog" args={['#bfdbfe', 120, 1000]} />
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
        />
        {!isMobile ? (
          <ScrollControls pages={4} damping={0.15}>
            <Scroll>
              <RideCameraRig manualOffset={manualOffset}>
                <NatureScene />
              </RideCameraRig>
            </Scroll>
          </ScrollControls>
        ) : (
          <RideCameraRig manualOffset={manualOffset}>
            <NatureScene />
          </RideCameraRig>
        )}
      </Canvas>
    </div>
  )
}
