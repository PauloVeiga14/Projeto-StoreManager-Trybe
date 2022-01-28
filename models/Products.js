const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products');
  return products;
};

const createProduct = async (name, quantity) => {
  const [product] = await connection.execute(`
    INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)`,
  [name, quantity]);
  return product;
};

const updateProduct = async (id, newName, newQuantity) => {
  const [product] = await connection.execute(`
    UPDATE StoreManager.products
    SET name = ?, quantity = ?
    WHERE id = ?
    `,
  [newName, newQuantity, id]);
  
  return product;
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
};

module.exports = {
  getAll,
  createProduct,
  updateProduct,
  deleteProduct,
};