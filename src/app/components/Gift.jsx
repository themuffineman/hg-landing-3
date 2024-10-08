"use client"
import { a } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import giftScene from "../../../public/models/giftbox.glb";

export function Gift() {
  const giftRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  const { nodes, materials } = useGLTF('/models/giftbox.glb');

  useFrame((_, delta) => {
    const dampingFactor = 0.1;
    const originalRotationX = 0;
    const originalRotationY = giftRef.current?.rotation?.y || 0;

    if (giftRef.current) {
      giftRef.current.rotation.y += 0.5 * delta;
      if (hovered) {
        const targetX = mousePos.y * 0.4;
        const targetY = giftRef.current.rotation.y + mousePos.x * 0.4;

        giftRef.current.rotation.x +=
          (targetX - giftRef.current.rotation.x) * dampingFactor;
        giftRef.current.rotation.y +=
          (targetY - giftRef.current.rotation.y) * dampingFactor;
      } else {
        giftRef.current.rotation.x +=
          (originalRotationX - giftRef.current.rotation.x) * dampingFactor;
        giftRef.current.rotation.y +=
          (originalRotationY - giftRef.current.rotation.y) * dampingFactor;
      }
    }
  });

  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(9, 2, 3); // Set camera to an isometric angle
    camera.lookAt(0, 0, 0); // Make sure the camera focuses on the center of the model
  }, [camera]); // This will update the camera position once on mount


  return (
    <>
      {/* Add basic lighting */}
      <ambientLight intensity={3.5} />
      <directionalLight position={[10, 10, 10]} />

      <a.group
        ref={giftRef}
        onPointerMove={handleMouseMove}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        position={[0, 0, 0]} // Center the model
        scale={[4, 4, 4]}
      >
        <a.group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Mat1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Mat2}
          />
        </a.group>
      </a.group>
    </>
  );
}
