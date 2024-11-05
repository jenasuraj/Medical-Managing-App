import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import PatientReg from './pages/PatientReg';
import PatientPortfolio from './pages/PatientPortfolio';
import PatientDetail from './pages/PatientDetail'; // Import the PatientDetail component
import DoctorReg from './pages/DoctorReg';
import Appointment from './pages/Appointment';
import Payment from './pages/Payment';
function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/patient-register', element: <PatientReg /> },
    { path: '/fetch-patient', element: <PatientPortfolio /> },
    { path: '/patient/:id', element: <PatientDetail /> }, // Add route for PatientDetail
    {path:'/doctor-register',element:<DoctorReg/>},
    {path:'/appointment/:id',element:<Appointment />},
    { path: '/payment/:doctorId/:appointmentDate/:patientId', element: <Payment /> },




  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
