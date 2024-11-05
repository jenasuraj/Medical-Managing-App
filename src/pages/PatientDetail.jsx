import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const PatientDetail = () => {
  const location = useLocation();
  const { patient } = location.state || {};
  const [data, setData] = useState([]);

  if (!patient) {
    return <div>No patient data available</div>;
  }

  const seeAppointment = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-appointment-date', {
        params: { id: patient.id },
      });
      if (response.status === 200) {
        setData(response.data);
        console.log("Appointment data fetched successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };
  const deleteApp = async(id) =>
    {
     try{
      console.log(id);
      const response = await axios.delete(`http://localhost:5000/delete-appointment/${id}`);
     }
     catch(error)
     {
      console.log("error");
     }
     window.location.reload();
 
    }

  return (
    <div className='patient-detail'>
      <h2 style={{color:'#0077b6',marginBottom:'10px'}}>Patient Details</h2>
      <p><strong>ID:</strong> {patient.id}</p>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Contact:</strong> {patient.contact}</p>
      <p><strong>Symptoms:</strong> {patient.symptoms}</p>
      <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
      <p><strong>Address:</strong> {patient.address}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>

      <Link to={`/appointment/${patient.id}`} state={{ symptoms: patient.symptoms }}>
        <button className='appointment-btn' style={{marginTop:'50px',marginRight:'10px'}}>Appointment</button>
      </Link> 

      <button
        className='stats-btn'
        onClick={seeAppointment}
      >
        See stats
      </button>

      {/* Display appointment data if available */}
      {data.length > 0 && (
        <div className="appointment-data">
          <h3>Appointment Data</h3>
          {data.map((appointment, index) => (
            <div key={index}>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Doctor:</strong> {appointment.d_id}</p>
              <p><strong>id:</strong>{appointment.id}</p>
              <p><strong>Bill:</strong>300 Rps</p>  

              <button  onClick={()=>deleteApp(appointment.id)}  style={{backgroundColor:'red',margin:'20px',marginLeft:'100px'}}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetail;
