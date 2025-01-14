import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download, logoShirt, stylishShirt } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";

import { SketchPicker } from "react-color";

import { HexColorPicker } from "react-colorful";

const customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");

  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // Add the custom tab for shirt or shoes selection
  const handleSelectCustomization = (selection) => {
    // Set the selected customization type (shirt or shoes)
    state.modelType = selection;
    setActiveEditorTab(""); // Reset any active editor tab when switching the type
  };

  //show tab content depending on the active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      // case "aipicker":
      //   return (
      //     <AIPicker
      //       prompt={prompt}
      //       setPrompt={setPrompt}
      //       generatingImg={generatingImg}
      //       handleSubmit={handleSubmit}
      //     />
      //   );
      default:
        return null;
    }
  };

  // const handleSubmit = async (type) => {
  //   if (!prompt) return alert("Please enter a prompt");

  //   try {
  //     //call our backend to generae an ai image
  //     setGeneratingImg(true);

  //     const response = await fetch("http://localhost:8080/api/v1/dalle", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         prompt,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log(data);

  //     handleDecals(type, `data:image/png;base64,${data.photo}`);
  //   } catch (error) {
  //     alert(error);
  //   } finally {
  //     setGeneratingImg(false);
  //     setActiveEditorTab("");
  //   }
  // };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      case "saveShirt":
        downloadCanvasToImage();
        setActiveFilterTab((prevState) => ({ ...prevState, saveShirt: false }));
        return;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    //after setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {/* Tab selection for shirt or shoes */}
      <motion.div
        key="custom"
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
        {...slideAnimation("left")}
      >
        <div className="flex space-x-10 bg-white px-4 py-2 rounded-xl shadow-lg">
          <button
            className={`${
              snap.modelType === "shirt"
                ? "font-bold text-black"
                : "text-gray-500"
            } hover:text-black`}
            onClick={() => handleSelectCustomization("shirt")}
          >
            Shirt
          </button>
          {/* Shoes Tab (only appears if shoes model exists) */}
          {snap.shoes && (
            <button
              className={`${
                snap.modelType === "shoes"
                  ? "font-bold text-black"
                  : "text-gray-500"
              } hover:text-black`}
              onClick={() => handleSelectCustomization("shoes")}
            >
              Shoes
            </button>
          )}
        </div>
      </motion.div>
      {snap.custom && snap.modelType === "shirt" && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => {
                state.intro = true;
                state.custom = false;
                state.canv = true;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="absolute z-20 bottom-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Proceed to Checkout"
              handleClick={() => {
                state.custom = false;
                state.check = true;
                state.canv = false;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}

      {snap.custom && snap.modelType === "shoes" && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="absolute left-full ml-3">
                <div style={{ display: snap.current ? "block" : "none" }}>
                  <HexColorPicker
                    className="picker"
                    color={snap.items[snap.current]}
                    onChange={(color) => (state.items[snap.current] = color)}
                  />
                  <h1>{snap.current}</h1>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => {
                state.intro = true;
                state.custom = false;
                state.canv = true;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="absolute z-20 bottom-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Proceed to Checkout"
              handleClick={() => {
                state.custom = false;
                state.check = true;
                state.canv = false;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default customizer;
