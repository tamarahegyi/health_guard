import React, { useEffect, useRef, useState } from 'react';
import './appointmentFormIC.css';
import { v4 as uuidv4 } from 'uuid';

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [role, setRole] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const[showBookingDetails, setShowBookingDetails]= useState(false);
  

  const roleRef = useRef();
  const nameRef = useRef();
  const phoneNumberRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (time < "06:00" || time > "20:00") {
      alert("Please select a time between 06:00 and 20:00.");
      return;
    }

    const appointmentData = {
      name: nameRef.current.value,
      role: roleRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
      doctorName,
      doctorSpeciality,
  };

    const loggedInUser = sessionStorage.getItem("signUp");

    if (loggedInUser) {
      const newAppointment = {
        id: uuidv4(),
        ...appointmentData,
      };

      const localAppointments = JSON.parse(localStorage.getItem("appointments")) || {};
      if (!localAppointments[loggedInUser]) {
        localAppointments[loggedInUser] = [];
      }
      localAppointments[loggedInUser].push(newAppointment);

      localStorage.setItem("appointments", JSON.stringify(localAppointments));

      setAppointments(localAppointments[loggedInUser]);
      setBookingDetails(newAppointment);

      // Clear form
      setName('');
      setPhoneNumber('');
      setDate('');
      setTime('');
      setRole('');

      alert("Appointment booked successfully.");
    
    }
  };

  const handleAppointmentCancel = () => {
    const loggedInUser = sessionStorage.getItem("signUp");
    if (loggedInUser && bookingDetails) {
      let localAppointments = JSON.parse(localStorage.getItem("appointments")) || {};
      localAppointments[loggedInUser] = localAppointments[loggedInUser].filter(appointment => appointment.id !== bookingDetails.id);

      localStorage.setItem("appointments", JSON.stringify(localAppointments));
      setBookingDetails(null);
    }
  };

  return (<>
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label id="role1" htmlFor="role">Role:</label>
        <input
          ref={roleRef}
          className='booking-input2'
          list="data"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <datalist id="data">
          <option value="Doctor" />
          <option value="Patient" />
        </datalist>
      </div>
      <div className="form-group">
        <label id="name1" htmlFor="name">Name:</label>
        <input
          ref={nameRef}
          className='booking-input2'
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label id="number1" htmlFor="phoneNumber">Phone Number:</label>
        <input
          ref={phoneNumberRef}
          className='booking-input2'
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label id="date1" htmlFor="date">Date of the appointment:</label>
        <input
          ref={dateRef}
          className='booking-input2'
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label id="time1"htmlFor="time">Book time Slot:</label>
        <h5>Kindly note we are open from 6am until 8pm.</h5>
        <input
          ref={timeRef}
          className='booking-input2'
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          min="06:00"
          max="20:00"
          required
        />
      </div>
      <button className="submit" type="submit">Book Now</button>
    </form>

    {bookingDetails && (
        <div className="popup-booking-review">
          <div className="popup-content-booking-review">
            <h2 className='booking-details'>Booking Details</h2>
            <p className='booking-role'><strong>Doctor:</strong> <span className="userrole">{doctorName}</span></p>
            <p className='booking-role'><strong>Speciality:</strong> <span className="userrole">{doctorSpeciality}</span></p>
            <p className='booking-name'><strong>Name:</strong> <span className="username">{bookingDetails.name}</span></p>
            <p className='booking-role'><strong>Role:</strong> <span className="userrole">{bookingDetails.role}</span></p>
            <p className='booking-number'><strong>Phone Number:</strong> <span className="usernumber">{bookingDetails.phoneNumber}</span></p>
            <p className='booking-date'><strong>Date:</strong> <span className="userdate">{bookingDetails.date}</span></p>
            <p className='booking-time'><strong>Time:</strong> <span className="userrole">{bookingDetails.time}</span></p>
            <a href="./FindDoctorSearchIC"className='appointments1'>Back to appointments page</a>
            <button className="Cancel-button2"onClick={handleAppointmentCancel}>Cancel Appointment</button>
          </div>
        </div>
      )}

    </>
  );
};

export default AppointmentFormIC;

