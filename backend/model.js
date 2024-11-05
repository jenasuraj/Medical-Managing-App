// model.js
const db = require('./db');

// Function to fetch all patients
const getPatients = (callback) => {
  const query = 'SELECT * FROM patient_table';
  db.query(query, callback);
};

// Function to delete an appointment
const deleteAppointment = (id, callback) => {
  const query = 'DELETE FROM appointment_table WHERE id = ?';
  db.query(query, [id], callback);
};

// Function to register a new patient
const addPatient = (patientData, callback) => {
  const query = 'INSERT INTO patient_table (name, age, gender, contact, address, history, symptoms) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, patientData, callback);
};

// Function to delete a patient
const deletePatient = (id, callback) => {
  const query = 'DELETE FROM patient_table WHERE id = ?';
  db.query(query, [id], callback);
};

// Function to add a doctor
const addDoctor = (doctorData, callback) => {
  const query = 'INSERT INTO doctor_table (name, age, gender, contact, Speciality) VALUES (?, ?, ?, ?, ?)';
  db.query(query, doctorData, callback);
};

// Function to find doctors by specialty
const findDoctors = (speciality, callback) => {
  const query = 'SELECT name, Speciality, id FROM doctor_table WHERE Speciality = ?';
  db.query(query, [speciality], callback);
};

// Function to get appointments by patient ID
const getAppointmentsByPatientId = (patientId, callback) => {
  const query = 'SELECT * FROM appointment_table WHERE p_id = ?';
  db.query(query, [patientId], callback);
};

// Function to add an appointment
const addAppointment = (appointmentData, callback) => {
  const query = 'INSERT INTO appointment_table (d_id, p_id, date) VALUES (?, ?, ?)';
  db.query(query, appointmentData, callback);
};

module.exports = {
  getPatients,
  deleteAppointment,
  addPatient,
  deletePatient,
  addDoctor,
  findDoctors,
  getAppointmentsByPatientId,
  addAppointment,
};
