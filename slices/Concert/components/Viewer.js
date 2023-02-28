
import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { Model } from './Model'
export default function Viewer({ locations, index }) {
  
  const ref = useRef()
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
      <Suspense fallback={null}>
        <Stage controls={ref} preset="rembrandt" intensity={1} environment="city">
          <mesh rotation={[.7, 0, 0]}><Model /></mesh>
        </Stage>
      </Suspense>
      {/* <OrbitControls ref={ref} autoRotate={false} /> */}
    </Canvas>
  )
}