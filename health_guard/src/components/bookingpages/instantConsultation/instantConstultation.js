import React, { useEffect, useState } from 'react';
import './instantConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from '../findDoctorSearchIC/findDoctorSearchIC.js';
import DoctorCardIC from '../DoctorCardIC/doctorCardIC.js';

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    
    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            if (searchParams.get('speciality')) {
                // window.reload()
                const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());

                setFilteredDoctors(filtered);
                
                setIsSearched(true);
                window.reload()
            } else {
                setFilteredDoctors([]);
                setIsSearched(false);
            }
            setDoctors(data);
        })
        .catch(err => console.log(err));
    }
    
    const handleSearch = (searchText) => {

        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
            } else {
                
            const filtered = doctors.filter(
                (doctor) =>
                // 
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
                
            );
                
            setFilteredDoctors(filtered);
            setIsSearched(true);
            window.location.reload()
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        getDoctorsDetails();
        // const authtoken = sessionStorage.getItem("signUp");
        // if (!authtoken) {
        //     navigate("/login");
        // 
    }, [searchParams])

    return (<>
        <center>
            <div  className="searchpage-container">
            <FindDoctorSearchIC onSearch={handleSearch} />
            <div className="search-results-container">
            {isSearched ? (
                <center>
                    <h2 className="available">{filteredDoctors.length} doctors are available {searchParams.get('location')}</h2>
                    <h3 className="doctors">Book appointments with minimum wait-time & verified doctor details</h3>
                    {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => <DoctorCardIC className="doctorcard" {...doctor} key={doctor.name} />)
                    ) : (
                    <p className='no-doctors-found'>No doctors found</p>
                    )}
                </center>
                ) : (
                ''
                )}
            </div>
        </div>
        </center>
        </>
    )
}

export default InstantConsultation