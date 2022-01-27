const connection = require('./connection');

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  console.log(products);
  const findProduct = products.find((product) => product.name === name);
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (findProduct !== undefined) return res.status(409).json({ message: 'Product already exists' });
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
  if (typeof quantity === 'string' || quantity <= 0) {
    return res.status(400).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }

  next();
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const [product] = await connection.execute(`
    INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)`,
  [name, quantity]);
  return res.status(201).json({
    id: product.insertId,
    name,
    quantity,
  });
};

module.exports = {
  validateName,
  validateQuantity,
  createProduct,
};