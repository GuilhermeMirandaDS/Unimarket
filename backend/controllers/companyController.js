const Company = require('../models/Company');

exports.addCompany = async (req, res) => {
  const { name, cnpj } = req.body;
  try {
    const company = await Company.create({ name, cnpj });
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
