import { Routes, Route } from "react-router-dom";
import BlackboxAI from "./Componts/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlackboxAI />} />
    </Routes>
  );
}

export default App;
