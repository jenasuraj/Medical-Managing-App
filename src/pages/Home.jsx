import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/v996-025.jpg';

const Home = () => {
  return (
    <div 
      className="home-container"
      style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="left-content">
        <h1>
          We care
          <br />
          for your
          <br />
          better health
        </h1>
      </div>

      <div className="right-content" >
        <div className="button-container">
          <Link to='/patient-register'>
            <button className="patient-apply-btn">Register Patient</button>
          </Link>
          <Link to='/fetch-patient'>
            <button className="patient-apply-btn">Patient Portfolio</button>
          </Link>
          <Link to='/doctor-register'>
            <button className="patient-apply-btn">Add Doctor here </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
