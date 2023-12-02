import "./App.css";
import AppHeader from "./Components/AppHeader/AppHeader";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Maps from "./Components/Maps/Maps";
import Transform from "./Components/Transform/Transform";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/btvt" element={<Transform />} />
        <Route path="/maps" element={<Maps />} />
      </Routes>
    </div>
  );
}

export default App;
