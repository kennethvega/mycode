import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Header/Navbar";
import "./styles/Global.scss";
import "./styles/Utility.scss";
import styles from "./App.module.scss";
import SignUp from "./pages/Signup";

function App() {
  // theme light/dark toggle

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
