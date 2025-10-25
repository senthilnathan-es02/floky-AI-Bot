import { Routes, Route } from "react-router-dom";
import FlokyAI from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FlokyAI />} />
    </Routes>
  );
}

export default App;
