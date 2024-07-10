import React, { useEffect, useState, useRef } from "react";
import './profile.css';

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

    const updatedEmail = emailRef.current.value;
    const updatedPhone = phoneRef.current.value;
    const updatedPassword = passwordRef.current.value;

    if (loggedInUser && localUsers[loggedInUser]) {
      localUsers[loggedInUser].email = updatedEmail;
      localUsers[loggedInUser].phone = updatedPhone;
      localUsers[loggedInUser].password = updatedPassword;

      localStorage.setItem("users", JSON.stringify(localUsers));

      window.location.href = '/success';
    } else {
      alert("User is not logged in");
    }
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
