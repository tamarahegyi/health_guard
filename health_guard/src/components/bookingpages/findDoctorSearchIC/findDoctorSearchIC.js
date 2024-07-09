import React, { useState } from 'react';
import './findDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
]

const FindDoctorSearchIC = () => {
    const [searchDoctor, setSearchDoctor] = useState('');
    const [filteredSpecialities, setFilteredSpecialities] = useState(initSpeciality);
    const [doctorResultHidden, setDoctorResultHidden] = useState(false);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(false); // Hide options after selecting
        navigate(`/instant-consultation?speciality=${speciality}`);
    }

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchDoctor(value);
        setDoctorResultHidden(true);
        const filtered = initSpeciality.filter(speciality =>
            speciality.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSpecialities(filtered);
    }
    const logout=()=>{
        localStorage.removeItem("signUp")
        window.location.reload()
    }

    return (<>
        <div className='page'>
            <div className='finddoctor'>
                <center>
                    <h1 className='find-doctor'>Find a doctor and Consult instantly</h1>
                    <div><i style={{ color: 'rgba(7, 110, 116, 1)', fontSize: '20rem' }} className="fa fa-user-md"></i></div>
                    <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="doctor-search-box">
                            <input
                                type="text"
                                list="speciality"
                                className="search-doctor-input-box"
                                placeholder="Search doctors, clinics, hospitals, etc."
                                value={searchDoctor}
                                onChange={handleSearchChange}
                                onFocus={() => setDoctorResultHidden(true)}
                                onBlur={() => setDoctorResultHidden(true)}
                            />
                            <div className="findiconimg"></div>

                            <div className="search-doctor-input-results" style={{ display: doctorResultHidden ? 'block' : 'none' }}>
                                {filteredSpecialities.map(speciality => (
                                    <div className="search-doctor-result-item" key={speciality} onClick={() => handleDoctorSelect(speciality)}>
                                        <span><img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="" style={{ height: "10px", width: "10px" }} width="12" /></span>
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </center>
            </div>
        </div>
        </>
    )
}

export default FindDoctorSearchIC;