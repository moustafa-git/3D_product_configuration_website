import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { CustomButton } from "../components";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Manage = () => {
  const snap = useSnapshot(state);
  const fileInputRef = useRef(null);

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      state.modelUrl = url; // Store the model URL in Valtio state
      state.shoes = true;
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current.click(); // Programmatically open file picker
  };

  const handleModelTypeChange = (type) => {
    state.modelType = type;
  };

  // Component to render the uploaded 3D model
  const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    return (
      <primitive
        object={scene}
        scale={[5, 5, 5]} // Adjust the scale to make it larger
        position={[0, -1, 0]} // Adjust the position to center it
      />
    );
  };

  return (
    <AnimatePresence>
      {snap.manage && (
        <motion.section
          className="absolute inset-0 flex flex-row bg-white text-gray-800 overflow-hidden"
          {...slideAnimation}
        >
          {/* Go Back Button */}
          <motion.div
            className="absolute top-5 right-5 z-10"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => {
                state.intro = true;
                state.custom = false;
                state.canv = true;
                state.manage = false;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm bg-gray-700 text-white rounded-md"
            />
          </motion.div>

          {/* Upload Section */}
          <motion.div
            className="flex flex-col items-center justify-center text-center space-y-6 p-6 max-w-md w-1/3 bg-gray-100 rounded-md shadow-md border border-gray-200"
            {...fadeAnimation}
          >
            <h1 className="text-2xl font-semibold text-gray-800">
              3D Model Viewer
            </h1>
            <p className="text-sm text-gray-600">
              Upload and customize your 3D model.
            </p>
            <div className="flex space-x-4">
              {" "}
              <button
                onClick={() => handleModelTypeChange("shirt")}
                className={`px-6 py-3 text-sm font-semibold rounded-md ${
                  snap.modelType === "shirt"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {" "}
                Shirt{" "}
              </button>{" "}
              <button
                onClick={() => handleModelTypeChange("shoes")}
                className={`px-6 py-3 text-sm font-semibold rounded-md ${
                  snap.modelType === "shoes"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {" "}
                Shoes
              </button>{" "}
            </div>
            <button
              onClick={handleClickUpload}
              className="px-6 py-3 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700"
            >
              Upload 3D Model
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".gltf,.glb,.obj"
              onChange={handleUpload}
              className="hidden"
            />
          </motion.div>

          {/* Canvas to display the uploaded 3D model */}
          {snap.modelUrl && (
            <motion.div className="flex-1" {...fadeAnimation}>
              <Canvas className="w-full h-screen">
                <ambientLight intensity={0.5} />
                <OrbitControls />
                <Model url={snap.modelUrl} />
              </Canvas>
            </motion.div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Manage;
