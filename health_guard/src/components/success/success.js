import React, { useState, useEffect } from 'react';
import './success.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck  } from '@fortawesome/free-solid-svg-icons';


const SuccessPage = () => {

    const[userName, setUserName]= useState("")

    useEffect(() => {
        const userName= localStorage.getItem('name')
        const localUsers = JSON.parse(localStorage.getItem("users")) || {};
        const loggedInUser = sessionStorage.getItem("signUp");
        if (loggedInUser && localUsers[loggedInUser]) {
          setUserName(localUsers[loggedInUser].name);
        }
      }, []);

  return (<>
    <div>
    <div className="success-container">
    <h2 className='name1'>Dear<br></br>
    <span className='user-name2'>{userName}</span></h2>
      <h2>Successfully Updated Details</h2>
      <p className='details-comment'>Your details have been successfully updated!</p>
      <FontAwesomeIcon icon={faCircleCheck} className='icon' />
    </div>
    </div>
    </>
  );
};

export default SuccessPage;