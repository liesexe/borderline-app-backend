const express = require('express');
const hostController = require('../controllers/hostController');

const setHostRoutes = (app) => {
  const router = express.Router();

  router.post('/hosts', hostController.createHost);
  router.get('/hosts', hostController.getAllHosts);
  router.get('/hosts/:id', hostController.getHostById);
  router.put('/hosts/:id', hostController.updateHost);
  router.delete('/hosts/:id', hostController.deleteHost);

  app.use('/api', router);
};

module.exports = setHostRoutes;