const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  documentNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  host:{
    type: String,
    required: true,
  },
  consent: {
    type: Boolean,
    required: true,
  },
  creationDate:{
    type: Date,
    default: Date.now
  }
});

const customer = mongoose.model('Customer', customerSchema);
module.exports = customer;
