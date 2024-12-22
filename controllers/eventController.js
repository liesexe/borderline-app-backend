const Event = require('../models/event');

const saveEvent = async (req, res) => {
  try {
    await Event.updateMany({}, { estado: 'inactive' });

    const newEvent = new Event({
      ...req.body,
      estado: 'active'
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear evento' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.estado === 'active') {
      await Event.updateMany({}, { estado: 'inactive' });
    }
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar evento' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ mensaje: 'Evento eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar evento' });
  }
};

const getEventsByStatus = async (req, res) => {
  try {
    const { estado } = 'active';
    const events = await Event.find({ estado });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener eventos' });
  }
};

module.exports = {
  saveEvent,
  updateEvent,
  deleteEvent,
  getEventsByStatus
};