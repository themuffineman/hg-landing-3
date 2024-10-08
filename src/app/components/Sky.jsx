"use client"
import { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// import skyScene from "../../../public/models/sky.glb";

export function Sky({ isRotating }) {
  const sky = useGLTF('/models/sky.glb');
  const skyRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Capture mouse movement and set normalized positions
  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1; // Horizontal position
    const y = -(event.clientY / window.innerHeight) * 2 + 1; // Vertical position
    setMousePos({ x, y });
  };

  useFrame((_, delta) => {
    if (skyRef.current) {
      // Smoothly interpolate to the target mouse position
      skyRef.current.rotation.x = THREE.MathUtils.lerp(
        skyRef.current.rotation.x,
        mousePos.y * 0.1,
        0.2 // Adjust this value for easing speed
      );
      skyRef.current.rotation.y = THREE.MathUtils.lerp(
        skyRef.current.rotation.y,
        mousePos.x * 0.1,
        0.2 // Adjust this value for easing speed
      );

      // Optional: Add rotation along the Y-axis if `isRotating` is true
      if (isRotating) {
        skyRef.current.rotation.y += 0.1 * delta;
      }
    }
  });

  // Attach the mousemove event listener
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // Listen for mouse move events on the canvas
    <mesh ref={skyRef} >
      <primitive object={sky.scene} />
    </mesh>
  );
}




