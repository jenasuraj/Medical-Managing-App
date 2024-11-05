// route.js
const express = require('express');
const router = express.Router();
const model = require('./model');

// Route to get all patients
router.get('/get-data', (req, res) => {
  model.getPatients((err, data) => {
    if (err) {
      console.error("Error fetching patients data:", err);
      res.status(500).json({ error: "Error fetching patients data" });
    } else {
      res.json(data);
    }
  });
});

// Route to delete an appointment by ID
router.delete('/delete-appointment/:id', (req, res) => {
  const { id } = req.params;
  model.deleteAppointment(id, (err, result) => {
    if (err) {
      console.error("Error deleting appointment:", err);
      res.status(500).json({ error: "Failed to delete appointment" });
    } else {
      res.json({ message: 'Deleted successfully' });
    }
  });
});

// Route to register a new patient
router.post('/patients-data', (req, res) => {
  const { name, age, gender, contact, address, medicalHistory, symptoms } = req.body;
  model.addPatient([name, age, gender, contact, address, medicalHistory, symptoms], (err, result) => {
    if (err) {
      console.error('Error saving patient data:', err);
      res.status(500).json({ error: 'Error saving patient data' });
    } else {
      res.status(200).json({ message: 'Patient registered successfully' });
    }
  });
});

// Route to delete a patient by ID
router.delete('/delete-patient/:id', (req, res) => {
  const { id } = req.params;
  model.deletePatient(id, (err, result) => {
    if (err) {
      console.error("Error deleting patient:", err);
      res.status(500).json({ error: "Failed to delete patient" });
    } else {
      res.json({ message: 'Deleted successfully' });
    }
  });
});

// Route to add a doctor
router.post('/doctors-data', (req, res) => {
  const { name, age, gender, contact, Speciality } = req.body;
  model.addDoctor([name, age, gender, contact, Speciality], (err, result) => {
    if (err) {
      console.error('Error saving doctor data:', err);
      res.status(500).json({ error: 'Error saving doctor data' });
    } else {
      res.status(200).json({ message: 'Doctor added successfully' });
    }
  });
});

// Route to find doctors by specialty
router.get('/find-doctors', (req, res) => {
  const { disease } = req.query;
  model.findDoctors(disease, (err, results) => {
    if (err) {
      console.error('Error finding doctors:', err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

// Route to get appointments by patient ID
router.get('/get-appointment-date', (req, res) => {
  const { id } = req.query;
  model.getAppointmentsByPatientId(id, (err, results) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

// Route to add an appointment
router.post('/post-date', (req, res) => {
  const { doctorId, patientId, appointmentDate } = req.body;
  model.addAppointment([doctorId, patientId, appointmentDate], (err, result) => {
    if (err) {
      console.error('Error saving appointment:', err);
      res.status(500).json({ error: 'Error saving appointment' });
    } else {
      res.status(200).json({ message: 'Appointment added successfully' });
    }
  });
});

module.exports = router;
