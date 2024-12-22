const express = require('express');
const eventController = require('../controllers/eventController');

const setEventRoutes = (app) => {
  const router = express.Router();

  router.post('/events', eventController.saveEvent);
  router.put('/events/:id', eventController.updateEvent);
  router.delete('/events/:id', eventController.deleteEvent);
  router.get('/events/active', eventController.getEventsByStatus);

  app.use('/api', router);
};

module.exports = setEventRoutes;