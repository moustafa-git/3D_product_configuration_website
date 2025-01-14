import Canvas from "./canvas";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import Manage from "./pages/Manage";
import Checkout from "./pages/Checkout";

import { useSnapshot } from "valtio";
import state from "./store";

function App() {
  const snap = useSnapshot(state);
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Checkout />
      <Manage />
      {snap.canv && <Canvas />}
      {snap.custom && <Customizer />}
    </main>
  );
}

export default App;
