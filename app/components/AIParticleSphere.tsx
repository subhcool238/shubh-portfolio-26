"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDistortion;
  
  varying vec2 vUv;
  varying vec3 vPos;
  varying float vNoise;
  
  // Classic 3D Perlin Noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float cnoise(vec3 P){
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
  }

  void main() {
    vUv = uv;
    vPos = position;
    
    // Smooth, slow sweeping noise
    float noise = cnoise(position * 2.0 + uTime * uSpeed);
    vNoise = noise;
    
    // PERFECT CIRCLE.
    vec3 newPos = position;
    
    vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
    
    // Points are completely uniform in size to match the fine mesh of the reference
    gl_PointSize = 1.5 * (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vPos;
  varying float vNoise;
  uniform vec3 uColor1; // Base faint indigo
  uniform vec3 uColor2; // Soft Cyan
  uniform vec3 uColor3; // Soft Purple
  
  void main() {
    // Soft circular dots
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    if(ll > 0.5) discard;
    float alpha = smoothstep(0.5, 0.2, ll); // Very soft edges
    
    float wave = smoothstep(-0.2, 0.6, vNoise);
    
    // Base color is the dim indigo
    vec3 col = uColor1;
    
    // Neon mix
    float colorMix = smoothstep(-1.0, 1.0, vPos.x + vPos.y);
    vec3 neonColor = mix(uColor2, uColor3, colorMix);
    
    // Apply neon ribbon
    col = mix(col, neonColor, wave);
    
    // Rim lighting: The reference has a bright rim on the right/bottom
    float rim = smoothstep(0.5, 1.0, length(vPos.xy));
    col = mix(col, neonColor, rim * 0.7);
    
    // Visibility: Dots never disappear completely, they are just very faint in the "void"
    float visibility = 0.2 + (wave * 0.8) + (rim * 0.4);
    
    gl_FragColor = vec4(col, alpha * min(visibility, 1.0));
  }
`;

function ParticleSphere({ isActive, mousePos }: { isActive: boolean, mousePos: React.MutableRefObject<{x: number, y: number}> }) {
  const meshRef = useRef<THREE.Points>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpeed: { value: 0.15 },
    uDistortion: { value: 0.0 }, // Not used
    uColor1: { value: new THREE.Color("#1a1a3a") }, // Very faint indigo for the core
    uColor2: { value: new THREE.Color("#4fc3f7") }, // Softer cyan
    uColor3: { value: new THREE.Color("#8a2be2") }  // Richer, softer purple
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // When clicked, wave speed increases
    const targetSpeed = isActive ? 1.0 : 0.15;
    
    uniforms.uSpeed.value += (targetSpeed - uniforms.uSpeed.value) * 0.05;
    uniforms.uTime.value = state.clock.elapsedTime;
    
    // Spin gently and track mouse
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x += (mousePos.current.y * 0.3 - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (mousePos.current.x * 0.3 - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <points ref={meshRef}>
      {/* 100x100 creates the exact sweeping parallel lat/long lines from the reference video */}
      <sphereGeometry args={[1, 100, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </points>
  );
}

export default function AIParticleSphere({ isActive = false }: { isActive?: boolean }) {
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
      <ParticleSphere isActive={isActive} mousePos={mousePos} />
    </Canvas>
  );
}
