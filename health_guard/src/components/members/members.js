import React from 'react';
import { useEffect,useState } from 'react';
import './members.css';

const Members = () => {

    const [userName, setUserName] = useState("");
    const [isOpen, setIsOpen]= useState(false);
  
    useEffect(() => {
      const userName= localStorage.getItem('name')
      const localUsers = JSON.parse(localStorage.getItem("users")) || {};
      const loggedInUser = sessionStorage.getItem("signUp");
      if (loggedInUser && localUsers[loggedInUser]) {
        setUserName(localUsers[loggedInUser].name);
      }
    }, []);
  
    /*const logout = () => {
      sessionStorage.removeItem("signUp");
      window.location.reload();
    };

    const deleteAccount = () => {
        const loggedInUser = localStorage.getItem("signUp");
        if (loggedInUser) {
          const localUsers = JSON.parse(localStorage.getItem("users")) || {};
          delete localUsers[loggedInUser]; 
          sessionStorage.removeItem("signUp");
          // Delete the current user's data
          localStorage.setItem("users", JSON.stringify(localUsers)); // Update localStorage
        }
        window.location.reload(); // Reload the page
      };*/

  return (
    <div id="home">
    <section class="hero-section">
<div>
  <div className='main-mission'>
  <div data-aos="fade-down" class="flex-hero">
  <h2 className="welcome">Welcome to HealthGuard <br></br><span className='name'>{userName}</span></h2>
      <h1>
        Your Health<br></br>
        <span>
          Our Mission
        </span>
      </h1>
      <h4>
        “Primum non nocere” <br></br>“First do no harm”</h4>
    </div>
  </div>
  <div className='btn-group'>
    <a href="/profile" ><button className ="profile-btn" type="button"> Your Profile</button></a>
    <a href="/doctorReview"><button className ="reviewform-btn" type="button"> Doctor Reviews</button></a>
 </div>
</div>
</section>
</div>
  )
}

export default Members;
