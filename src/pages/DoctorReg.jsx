import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const DoctorReg = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    Speciality: '',
  });
const navigate = useNavigate('');

 
  const handleChange = (e) => { //the e This object contains all the information about the event that just occurred, including details about the element that triggered it.
    const { name, value } = e.target; //e.target is a reference to the DOM element (in this case, an <input> element) that triggered the event.
    setFormData({ ...formData, [name]: value });
  };
   
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:5000/doctors-data',formData);
      console.log('Data saved:', response.data);
      setFormData({
        name: '',
        age: '',
        gender: '',
        contact: '',
        Speciality: '',
      });

    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
    navigate('/');
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2>Doctor Form</h2>
      
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      
      <label>Age:</label>
      <input type="number" name="age" value={formData.age} onChange={handleChange} />
      
      <label>Gender:</label>
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      
      <label>Contact Number:</label>
      <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
     
    
      <label>Speciality:</label>
      <input name="Speciality" value={formData.Speciality} onChange={handleChange} />
      
      <button type="submit">Register</button>
    </form>
  );
};

export default DoctorReg;
