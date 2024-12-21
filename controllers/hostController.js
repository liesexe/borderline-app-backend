const Host = require('../models/host');

exports.createHost = async (req, res) => {
  try {
    const host = new Host(req.body);
    await host.save();
    res.status(201).json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllHosts = async (req, res) => {
  try {
    const hosts = await Host.find();
    res.status(200).json(hosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHostById = async (req, res) => {
  try {
    const host = await Host.findById(req.params.id);
    if (!host) {
      return res.status(404).json({ error: 'Host not found' });
    }
    res.status(200).json(host);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHost = async (req, res) => {
  try {
    const host = await Host.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!host) {
      return res.status(404).json({ error: 'Host not found' });
    }
    res.status(200).json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteHost = async (req, res) => {
  try {
    const host = await Host.findByIdAndDelete(req.params.id);
    if (!host) {
      return res.status(404).json({ error: 'Host not found' });
    }
    res.status(200).json({ message: 'Host deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};