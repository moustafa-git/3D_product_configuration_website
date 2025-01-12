import Canvas from "./canvas";
import Home from "./pages/Home";
import Customizer from "./pages/Customizer";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Checkout />
      <Canvas />
      <Customizer />
    </main>
  );
}

export default App;
