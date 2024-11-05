// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./route');
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
