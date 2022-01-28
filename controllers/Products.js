const Products = require('../models/Products');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await Products.createProduct(name, quantity);

  return res.status(201).json({
    id: newProduct.insertId,
    name,
    quantity,
  });
};

module.exports = {
  createProduct,
};