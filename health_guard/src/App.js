import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from './components/navBar/navBar.js';
import LandingPage from './components/landingPage/landingPage.js';
import SignUp from './components/signUpPage/signUp.js';
import Login from './components/loginPage/login.js';
import Members from './components/members/members.js';
import AppointmentFormIC from './components/bookingpages/appointmentFormIC/appointmentFormIC.js';
import DoctorCardIC from './components/bookingpages/DoctorCardIC/doctorCardIC.js';
import FindDoctorSearchIC from './components/bookingpages/findDoctorSearchIC/findDoctorSearchIC.js';
import InstantConsultation from './components/bookingpages/instantConsultation/instantConstultation.js';
import Profile from './components/profile/profile.js';
import Success from './components/success/success.js'
import Notifications from './components/notifications/notifications.js';
import Reports from './components/reports/reports.js';
import Reviews from './components/reviews/reviews.js';




function App() {
  return (<>
        <BrowserRouter>
          <FontAwesomeIcon/>
          <NavBar/>
          <Notifications>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/members" element={<Members/>}/>
            <Route path="/appointmentFormIC" element={<AppointmentFormIC/>}/>
            <Route path="/doctorCardIC" element={<DoctorCardIC/>}/>
            <Route path="/findDoctorSearchIC" element={<FindDoctorSearchIC/>}/>
            <Route path="/instantConsultation" element={<InstantConsultation/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/reports" element={<Reports/>}/>
            <Route path='/reviews' element={<Reviews/>}/>
          </Routes>
          </Notifications>
        </BrowserRouter>
        </>
  )
}

export default App;
