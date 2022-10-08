import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Header/Navbar";
import "./styles/Global.scss";
import "./styles/Utility.scss";
import styles from "./App.module.scss";

function App() {
  // theme light/dark toggle

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
