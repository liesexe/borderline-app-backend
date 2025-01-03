const express = require('express');
const customerController = require('../controllers/customerController');

const setCustomerRoutes = (app) => {
  const router = express.Router();

  router.get('/customers', customerController.getCustomers);
  router.post('/customers', customerController.saveCustomer);
  router.get('/customers/:id', customerController.getCustomerByDocumentNumber);

  app.use('/api', router);
};

module.exports = setCustomerRoutes;