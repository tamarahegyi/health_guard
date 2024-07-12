import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import './review.css';
import { v4 as uuidv4 } from 'uuid';
import './mediaqueries.css'

const doctorsData = [
  { name: "Dr. Jiao Yang", ratings: "⭐⭐⭐⭐⭐", experience: 9, speciality: "Dentist" },
  { name: "Dr. Denis Raj", ratings: "⭐⭐⭐⭐", experience: 24, speciality: "Dentist" },
  { name: "Dr. Lyn Christie", ratings: "⭐⭐⭐", experience: 11, speciality: "Dentist" },
  { name: "Dr. Jessica White", ratings: "⭐⭐⭐⭐", experience: 18, speciality: "Dentist" },
  { name: "Dr. Patrick Wong", ratings: "⭐⭐⭐⭐⭐", experience: 11, speciality: "Bone" },
  { name: "Dr. Elizabeth Clark", ratings: "⭐⭐⭐⭐", experience: 11, speciality: "Gynecologist/Obstetrician" },
  { name: "Dr. Eugene J. Turner", ratings: "⭐⭐⭐⭐", experience: 40, speciality: "Gynecologist/Obstetrician" },
  { name: "Dr. Alan Dalkin", ratings: "⭐⭐⭐⭐", experience: 33, speciality: "Gynecologist/Obstetrician" },
  { name: "Dr. Richard Pearson", ratings: "⭐⭐⭐", experience: 40, speciality: "General Physician" },
  { name: "Dr. Mark D. Okusa", ratings: "⭐⭐⭐", experience: 3, speciality: "General Physician" },
  { name: "Dr. Sarah Johnson", ratings: "⭐⭐⭐⭐⭐", experience: 9, speciality: "Dentist" },
  { name: "Dr. David Anderson", ratings: "⭐⭐⭐⭐", experience: 24, speciality: "Dentist" },
  { name: "Dr. Kevin Miller", ratings: "⭐⭐⭐⭐⭐", experience: 11, speciality: "Dentist" },
  { name: "Dr. Stephny Grosh", ratings: "⭐⭐⭐⭐", experience: 18, speciality: "Dentist" },
  { name: "Dr. Robert Johnson", ratings: "⭐⭐⭐⭐", experience: 11, speciality: "Bone" },
  { name: "Dr. Emily Clark", ratings: "⭐⭐⭐⭐⭐", experience: 11, speciality: "Gynecologist/Obstetrician" },
  { name: "Dr. Samantha Turner", ratings: "⭐⭐⭐⭐", experience: 40, speciality: "Gynecologist/Obstetrician" },
  { name: "Dr. Rachel Parker", ratings: "⭐⭐⭐", experience: 33, speciality: "Gynecologist/Obstetrician" },
  { name: "Dr. Michael Smith", ratings: "⭐⭐⭐⭐⭐", experience: 40, speciality: "General Physician" },
  { name: "Dr. Laura Taylor", ratings: "⭐⭐⭐", experience: 3, speciality: "General Physician" }
];

const specialities = [
  'Dentist', 'Gynecologist/Obstetrician', 'General Physician', 'Bone'
];

const ReviewForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const nameRef = useRef();
  const reviewRef = useRef();

  const handleReviewSubmit = () => {
    const name = nameRef.current.value.trim();
    const reviewText = reviewRef.current.value.trim();

    if (!name || !reviewText) {
      alert("Please fill in both name and review.");
      return;
    }

    const reviewData = {
      name,
      review: reviewText,
      stars: rating,
    };

    const loggedInUser = sessionStorage.getItem("signUp");
    if (loggedInUser) {
      const newReview = {
        id: uuidv4(),
        ...reviewData,
      };

      const localReview = JSON.parse(localStorage.getItem("reviews")) || {};
      if (!localReview[loggedInUser]) {
        localReview[loggedInUser] = {};
      }
      localReview[loggedInUser][selectedDoctor.name] = newReview;

      localStorage.setItem("reviews", JSON.stringify(localReview));

      setSubmittedReviews(localReview[loggedInUser]);
    }

    setSelectedDoctor(null);
    setReview('');
    setRating(0); // Close popup after submission
  };

  const handleReviewDelete = (doctorName) => {
    const loggedInUser = sessionStorage.getItem("signUp");
    if (loggedInUser) {
      const localReview = JSON.parse(localStorage.getItem("reviews")) || {};
      if (localReview[loggedInUser]) {
        delete localReview[loggedInUser][doctorName];

        localStorage.setItem("reviews", JSON.stringify(localReview));

        setSubmittedReviews(localReview[loggedInUser]);
      }
    }
  };

  const filteredDoctors = doctorsData.filter(doctor =>
    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <input 
          className="doctor-search"
          list="specialities"
          placeholder="Search by speciality"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <datalist id="specialities">
          {specialities.map((speciality, index) => (
            <option key={index} value={speciality} />
          ))}
        </datalist>
      </div>

      <section className="review-table">
        <table>
          <thead>
            <tr className="table-header">
              <th>Doctor's Name</th>
              <th>Doctor's Speciality</th>
              <th>Doctor's Rating</th>
              <th>Provide Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor, index) => (
              <tr key={index}>
                <td className="table-data">{doctor.name}</td>
                <td className="table-data">{doctor.speciality}</td>
                <td className="table-data">{doctor.ratings}</td>
                <td className='review-review'>
                  <button
                    type="button"
                    id="review-button"
                    className={`table-data login ${submittedReviews[doctor.name] ? 'delete-button' : ''}`}
                    onClick={() => {
                      if (submittedReviews[doctor.name]) {
                        handleReviewDelete(doctor.name);
                      } else {
                        setSelectedDoctor(doctor);
                      }
                    }}
                  >
                    {submittedReviews[doctor.name] ? 'Delete Review' : 'Leave a review'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selectedDoctor && (
        <Popup open={!!selectedDoctor} closeOnDocumentClick onClose={() => setSelectedDoctor(null)}>
          <div className="popup-content">
            <h2 className='review-main'>Leave a Review for {selectedDoctor.name}</h2>
            <p className='speciality'>{selectedDoctor.speciality}</p>
            <br />
            <label>Name</label>
            <input
              className='name-input2'
              ref={nameRef}
              placeholder='Please enter your name'
              required
            />
            <textarea
              id='textarea'
              ref={reviewRef}
              placeholder="Please tell us about your experience"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className='name-input2'
              required
            />
            <br />
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${i < rating ? 'selected' : ''}`}
                onClick={() => setRating(i + 1)}
              >★</span>
            ))}
            <br />
            <button className="review-submit-btn" onClick={handleReviewSubmit}>Submit</button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ReviewForm;
