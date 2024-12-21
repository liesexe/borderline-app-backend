const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const setHostRoutes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

setHostRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});