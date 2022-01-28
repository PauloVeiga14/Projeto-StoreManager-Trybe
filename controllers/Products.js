const Products = require('../models/Products');

const getAll = async (_req, res) => {
  const products = await Products.getAll();
  
  return res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const products = await Products.getAll();
  const findProduct = products.find((product) => product.id === Number(id));
  
  if (!findProduct) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(findProduct);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await Products.getAll();
  const findProduct = products.find((product) => product.name === name);
  
  if (findProduct !== undefined) return res.status(409).json({ message: 'Product already exists' });

  const newProduct = await Products.createProduct(name, quantity);

  return res.status(201).json({
    id: newProduct.insertId,
    name,
    quantity,
  });
};

const updateProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const products = await Products.getAll();
  const findProduct = products.find((product) => product.id === Number(id));

  if (!findProduct) return res.status(404).json({ message: 'Product not found' });

  await Products.updateProduct(id, name, quantity); 

  return res.status(200).json({
    id,
    name,
    quantity,
  });
};

module.exports = {
  getAll,
  createProduct,
  findById,
  updateProduct,
};