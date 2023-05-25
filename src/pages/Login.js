import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import logo from "../logo.svg";
function Login({ setIsAuth }) {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
    console.log(auth);
  };
  return (
    <div className="loginPage">
      <div className="form-container">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="welcome-text">
          <div className="welcome-heading">Welcome back! </div>
          <p className="welcome-subheading"> We're excited to see you again.</p>
        </div>
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b onClick={signInWithGoogle}>Sign in with google</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
