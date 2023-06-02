import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddVehicle from "./pages/AddVehicle";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import About from "./pages/About";
import logo from "./logo.png";
import AddService from "./pages/AddService";
import Signup from "./pages/Signup";
function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="signup" element={<Signup />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/addvehicle" element={<AddVehicle />} />
        <Route path="/addservice" element={<AddService />} />
        <Route
          path="/login"
          element={isAuth ? <Home /> : <Login setIsAuth={setIsAuth} />}
        />
      </Routes>
      <nav className="nav-bar">
        <div className="left-menu">
          <Link to="">
            {" "}
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          {/* <Link to="/"> Home </Link>
          <Link to="/about"> About </Link> */}
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
    </Router>
  );
}

export default App;
