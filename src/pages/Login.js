import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import logo from "../logo.png";
import { useState, useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

function Login({ setIsAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("isAuth", true);

        setIsAuth(true);
        const usersCollectionRef = collection(db, "users");

        const getUsers = async () => {
          const data = await getDocs(usersCollectionRef);
          const allUsers = data.docs.map((doc) => doc.id);

          if (allUsers.includes(result.user.uid)) {
          } else {
            const newUser = {
              id: Math.random(),
              email: result.user.email,
            };
            const addUserToDatabase = async () => {
              await setDoc(doc(db, "users", result.user.uid), newUser);
            };
            // ...
            addUserToDatabase();
          }
        };
        getUsers();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.

        alert(errorCode, errorMessage);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        setIsAuth(true);
        // Signed in
        // eslint-disable-next-line
        const user = userCredential.user;
        localStorage.setItem("isAuth", true);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="login-page">
      <div className="form-container">
        <form className="signup-form">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="welcome-text">
            <div className="welcome-heading">Welcome back! </div>
            <p className="welcome-subheading">
              {" "}
              We're excited to see you again. New here?{" "}
              <a href="/signup">Click here to sign up! </a>
            </p>
          </div>
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
          <input type="submit" onClick={submitHandler} className="btn"></input>
        </form>
        or
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b onClick={signInWithGoogle}>Continue with google</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
