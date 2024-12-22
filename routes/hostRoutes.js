const express = require('express');
const hostController = require('../controllers/hostController');
const customerController = require('../controllers/customerController');

const setHostRoutes = (app) => {
  const router = express.Router();

  router.post('/hosts', hostController.createHost);
  router.get('/hosts', hostController.getAllHosts);
  router.get('/hosts/:id', hostController.getHostById);
  router.put('/hosts/:id', hostController.updateHost);
  router.delete('/hosts/:id', hostController.deleteHost);
  router.get('/customers', customerController.getCustomers);
  router.post('/customers', customerController.saveCustomer);

  app.use('/api', router);
};

module.exports = setHostRoutes;