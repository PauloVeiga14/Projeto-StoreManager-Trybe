const Products = require('../models/Products');

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const products = await Products.getAll();
  const findProduct = products.find((product) => product.name === name);
  
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (findProduct !== undefined) return res.status(409).json({ message: 'Product already exists' });
  
  next();
};

module.exports = validateName;