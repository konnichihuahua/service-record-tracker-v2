import React from "react";
import { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="signupPage">
      <form className="signup-form">
        <label>
          {" "}
          Email:
          <input
            type="email"
            ref={emailInputRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label>
          {" "}
          Password:
          <input
            ref={passwordInputRef}
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <input type="submit" onClick={submitHandler}></input>
      </form>
    </div>
  );
}

export default Signup;
