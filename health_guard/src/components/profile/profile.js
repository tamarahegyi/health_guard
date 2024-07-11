import React, { useEffect, useState, useRef } from "react";
import './profile.css';
import './mediaqueries.css';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const loggedInUser = sessionStorage.getItem("signUp");
  const localUsers = JSON.parse(localStorage.getItem("users")) || {};

  useEffect(() => {
    if (loggedInUser && localUsers[loggedInUser]) {
      setUserEmail(localUsers[loggedInUser].email || '');
      setUserPhone(localUsers[loggedInUser].phone || '');
      setUserPassword(localUsers[loggedInUser].password || '');
    }
  }, [loggedInUser, localUsers]);

  const handleChange = (e) => {
    e.preventDefault();
    const email = sessionStorage.getItem('email');
    const updatedEmail = emailRef.current.value;
    const updatedPhone = phoneRef.current.value;
    const updatedPassword = passwordRef.current.value;
    

    if (localUsers && localUsers[loggedInUser] && validateInputs()) {
      localUsers[loggedInUser].email = updatedEmail;
      localUsers[loggedInUser].phone = updatedPhone;
      localUsers[loggedInUser].password = updatedPassword;
      localUsers[loggedInUser].signUp = updatedEmail;

      localStorage.setItem("users", JSON.stringify(localUsers));


      window.location.href = '/success';
    } else {
      alert("User is not logged in");
    }
  };

  const validateInputs = () => {
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=(?:.*[A-Za-z]){2})(?=(?:.*\d){2}).{5,}$/;

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
    <div className="profile-container">
      <div className="details-change-main">
        <h3 className="main">Update your details</h3>
      </div>
      <div className="details-change-form">
        <div className="change-form">
          <form className="form" onSubmit={handleChange}>
            <label className="email-label">Email</label>
            <input
              className="email-change-input"
              placeholder={userEmail}
              type="email"
              ref={emailRef}
              
            />
            <label className="phone-label">Phone</label>
            <input
              className="phone-change-input"
              placeholder={userPhone}
              type="tel"
              ref={phoneRef}
              
            />
            <label className="password-label">Password</label>
            <input
              className="password-change-input"
              placeholder="*****"
              type="password"
              ref={passwordRef}
            />
            <div className="details-btn">
              <button className="details-change-btn login" type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
