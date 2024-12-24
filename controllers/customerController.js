const Customer = require('../models/customer');
const Event = require('../models/event');
const Attendance = require('../models/attendance');
const Host = require('../models/host');
const QRCode = require('qrcode');

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

    const activeEvent = await Event.findOne({ status: 'active' });
    if (!activeEvent) {
      return res.status(404).json({ mensaje: 'No hay evento activo' });
    }

    let customer = await Customer.findOne({ documentNumber });

    if (customer) {
      const existingAttendance = await Attendance.findOne({
        customer: customer._id,
        event: activeEvent._id
      });

      if (existingAttendance) {
        return res.status(400).json({ 
          mensaje: 'El cliente ya está registrado para este evento' 
        });
      }
    }else{
      const formattedDate = convertDateToIso(birthDate);
      customer = new Customer({ 
        name, lastname, documentNumber, email, 
        phone, birthDate: formattedDate, consent 
      });
      await customer.save();
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

    const idString = `${attendance._id}-${activeEvent._id}-${customer._id}`;
    const base64Id = Buffer.from(idString).toString('base64');

    const qrCode = await QRCode.toDataURL(base64Id);

    res.status(201).json({ 
      code: qrCode,
      mensaje: 'Cliente registrado y asistencia creada' 
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: 'Error al crear cliente' });
  }
};

const getCustomerByDocumentNumber = async (req, res) => {
  try {
    const customer = await Customer.findOne({ documentNumber: req.params.id });
    
    if (!customer) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al buscar cliente' });
  }
};

function convertDateToIso(dateStr) {
  const [date, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, date);
}

module.exports = {
  getCustomers,
  saveCustomer,
  getCustomerByDocumentNumber
};
