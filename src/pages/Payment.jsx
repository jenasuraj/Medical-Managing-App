import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Importing the CSS file

const Payment = () => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const { doctorId, appointmentDate, patientId } = useParams();
  const [money,setMoney]= useState('');

  const paymentBtn = async () => {
    setPaymentStatus(true);
    try {
      const response = await axios.post('http://localhost:5000/post-date', {
        doctorId: doctorId,
        patientId: patientId,
        appointmentDate: appointmentDate,
      });

      if (response.status === 200) {
        setPaymentStatus(true); // Update payment status on successful payment
        console.log("Payment successful");
        // Navigate to PatientDetail after successful payment
        navigate(`/patient/${patientId}`); // Adjust this to the correct route for PatientDetail
      } else {
        console.log("Payment failed");
      }
    } catch (error) {
      console.log("Error:", error);
    }
    
    navigate('/');
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Payment Details</h1>
      <p className="payment-info"><strong>Doctor ID:</strong> {doctorId}</p>
      <p className="payment-info"><strong>Appointment Date:</strong> {appointmentDate}</p>
      <p className="payment-info"><strong>Patient ID:</strong> {patientId}</p>
      <div className="payment-input-container">
        <input type="text" className="payment-input"
         value={money} onChange={(e)=>setMoney(e.target.value)} placeholder='Amount (e.g., 300/-)' />
   {money > 299 && (
  <button className="payment-button" onClick={paymentBtn}>
    Pay
  </button>
)}

       
      </div>
    </div>
  );
};

export default Payment;
