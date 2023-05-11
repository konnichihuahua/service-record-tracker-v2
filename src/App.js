import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddVehicle from "./pages/AddVehicle";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import About from "./pages/About";
import logo from "./logo.svg";
import AddService from "./pages/AddService";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <Router>
      <nav className="nav-bar">
        <div className="left-menu">
          <Link to="">
            {" "}
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          {isAuth && <Link to="/addvehicle"> Add Vehicle </Link>}
          {isAuth && <Link to="/addservice"> Add Service </Link>}
        </div>
        <div className="right-menu">
          {!isAuth ? (
            <Link to="/login">
              {" "}
              <button className="btn">Login</button>{" "}
            </Link>
          ) : (
            <button className="btn" onClick={signUserOut}>
              Log out
            </button>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/addvehicle" element={<AddVehicle />} />
        <Route path="/addservice" element={<AddService />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
