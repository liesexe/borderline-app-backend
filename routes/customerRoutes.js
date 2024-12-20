const express = require('express');
const router = express.Router();
const {
  getCustomers,
  saveCustomer,
} = require('../controllers/customerController');

router.route('/').get(getCustomers).post(saveCustomer);

module.exports = router;
