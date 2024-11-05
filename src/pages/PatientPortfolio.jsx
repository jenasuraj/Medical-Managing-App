import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PatientPortfolio = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/get-data');
      if (response.status === 200) {
        const data = response.data;
        setDataFromServer(data);
      }
    };
    fetchData();
  }, []);

  // Filter the patients based on the search query
  const filteredPatients = dataFromServer.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patient) => {
    navigate(`/patient/${patient.id}`, { state: { patient } }); // Use navigate to pass the state
  };
  const deleteProfile = async(id) =>
  {
   try{
    console.log(id);
    const response = await axios.delete(`http://localhost:5000/delete-patient/${id}`);
   }
   catch(error)
   {
    console.log("error");
   }
   window.location.reload();
  }
 
  return (
    <div className='container'>
      <div className='input-section'>
        <input
          type="text"
          placeholder='Search for the patient'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        />
        
      </div>

      <div className='all-patients-profile'>
        {filteredPatients.length > 0 ? (
          filteredPatients.map((item, index) => (
            <>
            <div
              onClick={() => handlePatientClick(item)} // Handle click to navigate
              key={index}
              className='box-item'
              sty
            >
              {item.name}
              {` ---- `}
              {item.contact}
              {` ---- `}
              {item.symptoms}
            </div>
             <button style={{backgroundColor:'red',width:'80px',height:'20px',
             display:'flex',justifyContent:'center',alignItems:'center'

             }} onClick={()=>deleteProfile(item.id)}>Delete</button>
             </>
          ))
        ) : (
          <div>No patients found</div>
        )}
      </div>
    </div>
  );
}

export default PatientPortfolio;
