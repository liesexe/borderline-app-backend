const Customer = require('../models/customer');
const Event = require('../models/event');
const Attendance = require('../models/attendance');
const Host = require('../models/host');

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes' });
  }
};

const saveCustomer = async (req, res) => {
  const { name, lastname, documentNumber, email, phone, birthDate, consent, host } = req.body;
  try {

    let customer = await Customer.findOne({ documentNumber });

    if (!customer) {
      const formattedDate = convertDateToIso(birthDate);
      customer = new Customer({ 
        name, lastname, documentNumber, email, 
        phone, birthDate: formattedDate, consent 
      });
      await customer.save();
    }

    const activeEvent = await Event.findOne({ status: 'active' });
    if (!activeEvent) {
      return res.status(404).json({ mensaje: 'No hay evento activo' });
    }

    const host = await Host.findById(req.body.host);
    if (!host) {
      return res.status(404).json({ mensaje: 'Host no encontrado' });
    }

    const attendance = new Attendance({
      customer: customer._id,
      event: activeEvent._id,
      host: host._id,
    });
    await attendance.save();

    res.status(201).json({ 
      customer, 
      attendance,
      mensaje: 'Cliente registrado y asistencia creada' 
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: 'Error al crear cliente' });
  }
};

function convertDateToIso(dateStr) {
  const [date, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, date);
}

module.exports = {
  getCustomers,
  saveCustomer,
};
