import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import CameraShoes from "./CameraShoes";

import { useSnapshot } from "valtio";
import state from "../store";
import Shoes from "./Shoes";

import { Suspense } from "react";
import { ContactShadows, OrbitControls } from "@react-three/drei";

const CanvasModel = () => {
  const snap = useSnapshot(state);
  console.log(snap.modelType);
  return (
    <Canvas
      key={snap.modelType} // Dynamically set key based on modelType
      shadows
      camera={{
        position: [0, 0, 0],
        fov: snap.modelType === "shoes" ? 50 : 25,
      }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      {snap.modelType === "shirt" ? (
        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      ) : (
        <>
          <CameraShoes>
            <Center>
              <Shoes />
            </Center>
          </CameraShoes>
          <OrbitControls />
        </>
      )}
    </Canvas>
  );
};

export default CanvasModel;
