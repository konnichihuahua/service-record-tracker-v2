import React from "react";
import { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import logo from "../logo.png";
import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const auth = getAuth();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        console.log(user.uid);

        const newUser = {
          id: Math.random(),
          email: user.email,
        };
        const addUserToDatabase = async () => {
          await setDoc(doc(db, "users", user.uid), newUser);
        };
        // ...
        addUserToDatabase();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  return (
    <div className="signup-page">
      <div className="form-container">
        <form className="signup-form">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="welcome-heading">Sign up! </div>
          <label> Fill this out, then you're good to go.</label>
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
          <input type="submit" className="btn" onClick={submitHandler}></input>
        </form>
      </div>
    </div>
  );
}

export default Signup;
