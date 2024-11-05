import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Appointment = () => {
  const { id } = useParams();
  const location = useLocation();
  const { symptoms } = location.state || {}; // Retrieve symptoms from state
  const [date,setDate]= useState('');
  const [fixDoctor,setFixDoctor]=useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);

  // Function to find doctors
  const findDoctor = async () => {
    try {
      const response = await axios.get('http://localhost:5000/find-doctors', {
        params: { disease: symptoms }
      });
      if (response.status === 200) {
        setDoctors(response.data); // Update state with the fetched doctors data
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };

  // Function to handle doctor selection
  const handleDoctorClick = (index,doctor) => {
    setSelectedDoctorIndex(index);
    setFixDoctor(doctor.id);

  };

  return (
    <div className='container2'>
      <h1>Appointment for Patient ID: {id}</h1>
      <p><strong>Symptoms:</strong> {symptoms || "No symptoms provided"}</p>
      <button onClick={findDoctor} className='appointment-btn'>Find doctors</button>

      {/* Display message if no doctors are available */}
      {doctors.length === 0 ? (
        <h2>No doctors available</h2>
      ) : (
        <div className='doctor-list'>
          <h2>Available Doctors</h2>
          <ul>
            {doctors.map((doctor, index) => (
              <li
                key={index}
                onClick={() => handleDoctorClick(index,doctor)}
                style={{
                  border: selectedDoctorIndex === index ? '2px solid blue' : 'transparent',
                 
                  cursor: 'pointer', // Change cursor to pointer to indicate clickable
                  padding: '10px',   // Add some padding for better touch area
                  margin: '5px 0',   // Add some margin between list items
                }}
              >
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Speciality:</strong> {doctor.Speciality}</p>
                <p><strong>Id:</strong> {doctor.id}</p>
              </li>
            ))}
          </ul>
        </div>
      )}


{doctors.length > 0 ? (
  <>
    <input
      type="date"
      name="date"
      placeholder='set date'
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

<Link to={`/payment/${fixDoctor}/${date}/${id}`}>
  <button disabled={!fixDoctor || !date} className='appointment-btn'>Set Appointment</button>
</Link>

  </>
) : null}

    
    </div>
  );
};

export default Appointment;
