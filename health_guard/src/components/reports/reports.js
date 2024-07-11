import React, { useEffect, useState } from 'react';
import './reports.css';
import Pdf from './medical.png';

const ReportLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const localUsers = JSON.parse(localStorage.getItem('users')) || {};

  useEffect(() => {
    const localAppointments = JSON.parse(localStorage.getItem('appointments')) || {};
    const loggedInUser = sessionStorage.getItem('signUp');

    if (loggedInUser && localUsers[loggedInUser]) {
      setIsLoggedIn(true);
      setUserInfo({
        doctorName: localAppointments[loggedInUser]?.doctorName,
        doctorSpeciality: localUsers[loggedInUser]?.doctorSpeciality
      });
      setAppointments(localAppointments[loggedInUser] || []);
    }
  }, []);

  return (
    <>
      <div>
        {children}
        <div className='reports-head'>
          <p className='report-tag'>Reports</p>
        </div>
        <div className="report-table">
          <section className='report-section'>
            <table className='booking-table'>
              <thead className='table-head'>
                <tr>
                  <th>Doctor Name</th>
                  <th>Doctor Speciality</th>
                  <th>View Report</th>
                  <th>Download Report</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <tr key={index}>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.doctorSpeciality}</td>
                      <td>
                        <a href={Pdf} target="_blank" rel="noopener noreferrer">
                          <button className='view-report'>View Report</button>
                        </a>
                      </td>
                      <td>
                        <a href={Pdf} download target="_blank" rel="noopener noreferrer">
                          <button className='download-report'>Download Report</button>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td className='noreports'>You have no recent reports</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
};

export default ReportLayout;
