import React, { useEffect, useState } from "react";
import './navBar.css';
import './mediaqueries.css';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedin = sessionStorage.getItem('isLoggedin');
    if (userLoggedin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.setItem('isLoggedin', 'false');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      alert("Seems like you are already logged in");
      window.location.href = "/members";
    } else {
      window.location.href = "/login";
    }
  };

  const handleSigninClick = () => {
    if(isLoggedIn === 'true'){
      window.location.href = "/members";
    } else {
      window.location.href = "/signUp";
    }
  };

  const handleAppointmentsClick = () => {
    if (isLoggedIn) {
      window.location.href = "/findDoctorSearchIC";
    } else {
      alert("Please sign up or log in before you book an appointment");
      window.location.href = "/login";
    }
  };

  const handleReviewClick = () => {
    if (isLoggedIn) {
      window.location.href = "/ReviewForm";
    } else {
      alert("Please sign up or log in before you leave a review");
      window.location.href = "/login";
    }
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      window.location.href = "/members";
    } else {
      window.location.href = "/";
    }
  };

  const toggleMenu = () => {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  };

  return (
    <>
      <nav id="desktop-nav">
        <div className="logo">HealthGuard <i className="fa fa-tint" aria-hidden="true"></i></div>
        <div className="">
          <ul className="nav-links">
            <li><a onClick={handleHomeClick}>Home</a></li>
            <li><a onClick={handleAppointmentsClick}>Appointments</a></li>
            <li><a onClick={handleReviewClick}>Reviews</a></li>
            {isLoggedIn ? (
              <a><button className="logout"onClick={handleLogout}>Logout</button></a>
            ) : (
              <>
                <a><button onClick={handleLoginClick} className="login" type="button">Log in</button></a>
                <a onClick={handleSigninClick}><button className="signup" type="button">Sign up</button></a>
              </>
            )}
          </ul>
        </div>
      </nav>

      <nav id="hamburger-nav">
        <div className="logo">HealthGuard</div>
        <div className="hamburger-menu">
          <div className="hamburger-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="menu-links">
            <ul className="hamburger-links">
              <li><a href="/" onClick={toggleMenu}>Home</a></li>
              <li><a onClick={handleAppointmentsClick}>Appointments</a></li>
              <li><a onClick={handleReviewClick}>Reviews</a></li>
              {isLoggedIn ? (
                <a><button className="logout" onClick={handleLogout}>Logout</button></a>
              ) : (
                <>
                  <a><button onClick={handleLoginClick} className="login" type="button">Log in</button></a>
                  <a onClick={handleSigninClick}><button className="signup" type="button">Sign up</button></a>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

