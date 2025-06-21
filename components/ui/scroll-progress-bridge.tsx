// ScrollProgressBridge.tsx
import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

export function ScrollProgressBridge({ setProgress }: { setProgress: (v: number) => void }) {
  const scroll = useScroll()

  useFrame(() => {
    setProgress(scroll.offset)
  })

  return null
}
