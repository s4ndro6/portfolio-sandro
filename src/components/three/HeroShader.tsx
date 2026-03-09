/* ============================================================
   AAZ Portfolio V4 — HeroShader
   React Three Fiber canvas: scanlines + mouse ripple shader
   ============================================================ */

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  vec2 toMouse = uv - uMouse;
  float dist = length(toMouse);
  float ripple = sin(dist * 18.0 - uTime * 5.0) * 0.012 / max(dist, 0.1);
  uv += normalize(toMouse) * ripple * 0.5;
  float scan = sin(uv.y * 600.0 + uTime * 1.5) * 0.018;
  float noise = rand(uv + uTime * 0.05) * 0.015;
  vec3 col = vec3(0.0, 0.025 + scan + noise, 0.008);
  float v = 1.0 - smoothstep(0.3, 0.9, length(vUv - 0.5) * 1.6);
  col *= v;
  float glow = exp(-length(vUv - vec2(0.5, 0.8)) * 8.0) * 0.04;
  col += vec3(0.0, glow, glow * 0.4);
  gl_FragColor = vec4(col, 1.0);
}
`

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0.5, 0.5))
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
  })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      )
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    uniformsRef.current.uTime.value = clock.getElapsedTime()
    uniformsRef.current.uMouse.value.lerp(mouseRef.current, 0.05)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
      />
    </mesh>
  )
}

export default function HeroShader() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ alpha: false, antialias: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  )
}
