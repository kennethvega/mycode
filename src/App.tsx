import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
