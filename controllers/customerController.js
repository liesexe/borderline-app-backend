const Customer = require('../models/Customer');

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes' });
  }
};

const saveCustomer = async (req, res) => {
  const { name, lastname, documentNumber, email, phone, birthDate, host, consent } = req.body;
  try {
    const formattedDate = convertDateToIso(birthDate);
    const newCustomer = new Customer({ name, lastname, documentNumber, email, phone, birthDate: formattedDate, host, consent });
    await newCustomer.save();
    res.status(201).json(newCustomer);
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
