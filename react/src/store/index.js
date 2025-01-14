import { proxy } from "valtio";

const state = proxy({
  intro: true,
  custom: false,
  check: false,
  manage: false,
  canv: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
  modelUrl: null,
  modelType: "shirt",
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
  shirt: true,
  shoes: false,
});

export default state;
