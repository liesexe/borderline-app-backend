const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const setHostRoutes = require('./routes/hostRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Set up routes
setHostRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});