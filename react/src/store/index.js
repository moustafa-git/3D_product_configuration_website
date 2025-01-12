import { proxy } from "valtio";

const state = proxy({
  intro: true,
  custom: false,
  check: false,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});

export default state;
