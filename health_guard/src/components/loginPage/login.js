import React, { useEffect, useRef, useState } from "react";
import Members from "../members/members";
import './mediaqueries.css'

const Log_in = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showHome, setShowHome] = useState(false);
  const [show, setShow] = useState(false);
  const[isLoggedIn, setIsLoggedIn] =useState(false);

  const localUsers = JSON.parse(localStorage.getItem("users")) || {};


  useEffect(() => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const localSignUp = Object.values(localUsers).find(user => user.email === email)
    const userLoggedin = Object.values(localUsers).find(user => user.password === password)
    if (localSignUp === 'email') {
      setShowHome(true);
    }
    if (userLoggedin === 'password') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const user = Object.values(localUsers).find(user => user.email === email);

    if (user && user.password === password) {
      sessionStorage.setItem("signUp", user.id );
      sessionStorage.setItem("isLoggedin", "true");
      window.location.href = "/members";
    } else {
      alert("Please use valid credentials!");
    }
  };

  const handleReset = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
      {showHome ? (
        <Members />
      ) : (
        <div className="container">
          <div className="signup-grid">
            <div className="signup-text">
              <h1>Login</h1>
            </div>
            <div className="signup-text1">
              Are you a new member?{" "}
              <a href="/signUp" className="alreadymember-login">
                Sign Up
              </a>
            </div>

            <div className="signup-form">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="email login-email" htmlFor="email">
                    Email
                  </label>
                  <input
                    required
                    ref={emailRef}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-describedby="helpId"
                  />
                </div>
                <div className="form-group">
                  <label className="password  login-password" htmlFor="password">
                    Password
                  </label>
                  <input
                    required
                    ref={passwordRef}
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    aria-describedby="helpId"
                  />
                </div>
                <div className="btn-group">
                  <button className="submit-signup" type="submit">
                    Submit
                  </button>
                  <button
                    className="reset-signup"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Log_in;
