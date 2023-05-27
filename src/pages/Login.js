import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import logo from "../logo.svg";
import { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        // Signed in
        // eslint-disable-next-line
        const user = userCredential.user;
        localStorage.setItem("isAuth", true);
        setIsAuth(true);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  return (
    <div className="loginPage">
      <div className="form-container">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="welcome-text">
          <div className="welcome-heading">Welcome back! </div>
          <p className="welcome-subheading"> We're excited to see you again.</p>
        </div>
        <form className="signup-form">
          <label> Sign up!</label>
          <label> Email: </label>
          <input
            type="email"
            ref={emailInputRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label> Password: </label>
          <input
            ref={passwordInputRef}
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input type="submit" onClick={submitHandler}></input>
        </form>
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
