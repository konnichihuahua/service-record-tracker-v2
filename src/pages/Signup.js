import React from "react";
import { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

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
        const userCollectionRef = collection(db, "users");
        const newUser = {
          id: Math.random(),
          email: user.email,
        };
        const addUserToDatabase = async () => {
          await addDoc(userCollectionRef, newUser);
        };
        // ...
        addUserToDatabase();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="signup-page">
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
    </div>
  );
}

export default Signup;
