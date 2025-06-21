"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, Scroll, useScroll, OrbitControls, Environment, Html, Plane } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

const BLOCK_COUNT = 40
const SPACING = 6
const CORRIDOR_LEN = BLOCK_COUNT * SPACING

function FloatingCard({ position, rotation, children, scale = 1 }: { position: THREE.Vector3Tuple; rotation: THREE.Vector3Tuple; children: React.ReactNode; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={meshRef}>
        <planeGeometry args={[8, 6]} />
        <meshStandardMaterial transparent opacity={0.05} color="#1e40af" />
        <Html transform position={[0, 0, -5]} style={{ width: "600px", height: "300px", pointerEvents: "auto" }}>
          <div className="w-full h-full bg-white/95 backdrop-blur-sm border border-blue-200 rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Rhys Burman</h1>
            <h2 className="text-2xl text-blue-600 mb-6">Data Science & Sustainability</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              Welcome to my digital space where data science meets sustainability.
              I'm passionate about leveraging data-driven solutions to tackle environmental challenges and create a more sustainable future.
            </p>
          </div>
        </Html>
      </mesh>
    </group>
  )
}

function Mountains({ position }: { position: THREE.Vector3Tuple }) {
  const z = (Math.abs(position[2]) / 30) ** 2
  const mtns = Math.floor(Math.abs(position[2]) / 70 + 4)
  return (
    <group position={position}>
      {[...Array(mtns)].map((_, i) => (
        <mesh key={i} position={[-800 + (i * 1600 / (mtns - 1)), 40, -20 - Math.random() * 30]}>
          <coneGeometry args={[z + Math.random() * 30, z + Math.random() * 30, 40]} />
          <meshLambertMaterial color={`hsl(${200 + Math.random() * 40}, 35%, ${50 + Math.random() * 20}%)`} />
        </mesh>
      ))}
    </group>
  )
}

function GrassField() {
  const grassRef = useRef<THREE.Group>(null)
  return (
    <group ref={grassRef}>
      <Plane args={[600, 600]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshLambertMaterial color="#4ade80" />
      </Plane>
      {[...Array(200)].map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 200, -1.8, (Math.random() - 0.5) * 400]} rotation={[0, Math.random() * Math.PI, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.5 + Math.random() * 0.5]} />
          <meshLambertMaterial color={`hsl(120, 60%, ${30 + Math.random() * 20}%)`} />
        </mesh>
      ))}
    </group>
  )
}

function PathStones() {
  return (
    <group>
      {[...Array(40)].map((_, i) => (
        <mesh key={i} position={[Math.sin(i * 0.3) * 2, -1.5, -i * 4]} rotation={[0, Math.random() * Math.PI, 0]}>
          <cylinderGeometry args={[0.8 + Math.random() * 0.4, 0.8 + Math.random() * 0.4, 0.2]} />
          <meshLambertMaterial color="#94a3b8" />
        </mesh>
      ))}
    </group>
  )
}

function ExperienceCard({ position, rotation, title, company, impact, logoPlaceholder = true }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
    }
  })
  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial transparent opacity={0.05} color="#1e40af" />
        <Html transform position={[0, 0, 0]} style={{ width: "600px", height: "400px", pointerEvents: "auto" }}>
          <div className="w-full h-full bg-white/95 backdrop-blur-sm border border-blue-200 rounded-lg shadow-lg p-6">
            {logoPlaceholder && <div className="w-16 h-16 mb-4 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Logo</div>}
            <h3 className="text-xl font-bold text-blue-600 mb-1">{company}</h3>
            <h4 className="text-lg text-gray-600 mb-4">{title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{impact}</p>
          </div>
        </Html>
      </mesh>
    </group>
  )
}

function ExperienceSection() {
  return (
    <group position={[0, 0, -75]}>
      <ExperienceCard position={[-8, 0, 0]} rotation={[0, -Math.PI / 3, 0]} company="Clear Estimates" title="Lead Data Scientist" impact="Revolutionized construction cost estimation..." />
      <ExperienceCard position={[8, 0, -10]} rotation={[0, Math.PI / 3, 0]} company="Delta Airlines" title="Data Science Intern" impact="Transformed flight delay management..." />
      <ExperienceCard position={[-8, 0, -20]} rotation={[0, -Math.PI / 3, 0]} company="UMich Office of Sustainability" title="Data Science Consultant" impact="Pioneered the university's first..." />
      <ExperienceCard position={[8, 0, -30]} rotation={[0, Math.PI / 3, 0]} company="Integrate" title="ML Engineer" impact="Advanced healthcare equity..." />
    </group>
  )
}

function NatureScene() {
  return (
    <>
      <FloatingCard position={[0, 2, -5]} rotation={[0, 0, 0]} scale={1.2}><div /></FloatingCard>
      <ExperienceSection />
      <PathStones />
      <GrassField />
      <Mountains position={[0, 0, -400]} />
      <Mountains position={[0, 0, -600]} />
    </>
  )
}

function RideCameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!)
  const scroll = useScroll()
  useFrame(() => {
    const z = scroll.offset * CORRIDOR_LEN
    group.current.position.z = z
  })
  return <group ref={group}>{children}</group>
}

export default function ScrollThroughBlocks() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <div className="fixed top-8 left-8 bg-slate-900 p-4 rounded-lg border border-slate-700 text-white/90 shadow-xl z-50">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Mountain Path</h2>
        <ul className="text-sm space-y-1 list-disc list-inside opacity-90">
          <li>Scroll to explore</li>
          <li>Drag to look around</li>
        </ul>
      </div>
      <Canvas camera={{ position: [0, 4, 0], fov: 75 }}>
        <color attach="background" args={['#93c5fd']} />
        <fog attach="fog" args={['#bfdbfe', 120, 1000]} />
        <ambientLight intensity={0.4} color="#e0f2fe" />
        <directionalLight position={[5, 8, -5]} intensity={1.2} color="#60a5fa" />
        <directionalLight position={[-4, 6, -5]} intensity={0.4} color="#93c5fd" />
        <Environment preset="dawn" />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI} rotateSpeed={-0.3} />
        <ScrollControls pages={4} damping={0.15}>
          <Scroll>
            <RideCameraRig>
              <NatureScene />
            </RideCameraRig>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
