import React, { useRef, useState, useEffect } from "react";
import Members from '../members/members';
import './signUp.css';

const Sign_Up = () => {
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showHome, setShowHome] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const userLoggedin = sessionStorage.getItem('isLoggedin');
  const localSignUp = sessionStorage.getItem("signUp");
  const localUsers = JSON.parse(localStorage.getItem("users")) || {};

  useEffect(() => {
    if (isLoggedIn) {
      setShowHome(true);
    }
    if (localUsers[emailRef.current?.value]) {
      setShow(true);
    }
  }, [localSignUp, localUsers]);

  const handleClick = () => {
    if (validateInputs()) {
      const name = nameRef.current.value;
      const phone = phoneRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const newUser = { name, phone, email, password };
      localUsers[email] = newUser;
      localStorage.setItem("users", JSON.stringify(localUsers));
      sessionStorage.setItem('isLoggedin', 'true')
      alert("Account created successfully!");
      window.location.href = "/members";
    }
  };

  const handleLogin = () => {
    if (validateInputs()) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const user = localUsers[email];

      if (user && user.password === password && isLoggedIn) {
        sessionStorage.setItem("signUp", email);
        window.location.href = "/members";
      } else {
        alert("It seems like you are not a member yet? Please sign up");
      }
    }
  };

  const validateInputs = () => {
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=(?:.*[A-Za-z]){2})(?=(?:.*\d){2}).{5,}$/;

    if (!name) {
      alert("Name is required");
      return false;
    }

    if (!phone.match(phonePattern)) {
      alert("Please enter a valid phone number in the format 123-456-7890");
      return false;
    }

    if (!email.match(emailPattern)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (!password.match(passwordPattern)) {
      alert("Password must be at least 5 characters long and contain at least 2 letters and 2 numbers");
      return false;
    }

    return true;
  };

  return (
    <div>
      {showHome ? (
        <Members />
      ) : show ? (
        <div>
          <div className="container">
            <div className="signup-grid">
              <div className="signup-text">
                <h1>Sign Up</h1>
              </div>
              <div className="signup-text1">
                Already a member? <a href="/login"> Login</a>
              </div>

              <div className="signup-form">
                <form>
                  <div className="form-group">
                    <label className="fullname1" htmlFor="name">
                      Name
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      id="name"
                      required
                      className="form-control"
                      placeholder="Enter your name"
                      aria-describedby="helpId"
                    />
                  </div>
                  <div className="form-group">
                    <label className="phone-number1" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      ref={phoneRef}
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      title="Enter 10 numbers between 0-9. 123-456-7890"
                      id="phone"
                      required
                      className="form-control"
                      placeholder="Enter your phone number"
                      aria-describedby="helpId"
                    />
                  </div>
                  <div className="form-group">
                    <label className="email-address1" htmlFor="email">
                      Email
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="form-control"
                      placeholder="Enter your email"
                      aria-describedby="helpId"
                    />
                  </div>
                  <div className="form-group">
                    <label className="password1" htmlFor="password">
                      Password
                    </label>
                    <input
                      ref={passwordRef}
                      type="password"
                      name="password"
                      id="password"
                      required
                      className="form-control"
                      placeholder="Enter your password"
                      aria-describedby="helpId"
                      minLength="5"
                    />
                  </div>
                  <div className="btn-group">
                    <button className="submit-signup" type="button" onClick={handleClick}>
                      Submit
                    </button>
                    <button className="reset-signup" type="reset">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="container">
            <div className="signup-grid">
              <div className="signup-text">
                <h1>Sign Up</h1>
              </div>
              <div className="signup-text1">
                Already a member? <a href="/Login" className="alreadymember-login"> Login</a>
              </div>

              <div className="signup-form">
                <form>
                  <div className="form-group">
                    <label className="fullname" htmlFor="name">
                      Name
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      id="name"
                      required
                      className="form-control"
                      placeholder="Enter your name"
                      aria-describedby="helpId"
                    />
                  </div>
                  <div className="form-group">
                    <label className="phone-number" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      ref={phoneRef}
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      title="Enter 10 numbers between 0-9. 123-456-7890"
                      id="phone"
                      required
                      className="form-control"
                      placeholder="Enter your phone number"
                      aria-describedby="helpId"
                    />
                  </div>
                  <div className="form-group">
                    <label className="email-address" htmlFor="email">
                      Email
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="form-control"
                      placeholder="Enter your email"
                      aria-describedby="helpId"
                    />
                  </div>
                  <div className="form-group">
                    <label className="password1" htmlFor="password">
                      Password
                    </label>
                    <input
                      ref={passwordRef}
                      type="password"
                      name="password"
                      id="password"
                      required
                      className="form-control"
                      placeholder="Enter your password"
                      aria-describedby="helpId"
                      minLength="5"
                    />
                  </div>
                  <div className="btn-group">
                    <button className="submit-signup" type="button" onClick={handleClick}>
                      Submit
                    </button>
                    <button className="reset-signup" type="reset">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sign_Up;
