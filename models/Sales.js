const connection = require('./connection');

const getAllSales = async () => {
  const [sale] = await connection.execute('SELECT * FROM StoreManager.sales');
  return sale;
};

const createSaleId = async () => {
  const [insertSale] = await connection.execute('INSERT INTO StoreManager.sales VALUES ();');
  return insertSale;
};

const createSale = async (saleId, productId, quantity) => {
  await connection.execute('SET FOREIGN_KEY_CHECKS=0;');
  const [newSaleProduct] = await connection.execute(`
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
  [saleId, productId, quantity]);
  await connection.execute('SET FOREIGN_KEY_CHECKS=1;');
  return newSaleProduct;
};

module.exports = {
  getAllSales,
  createSaleId,
  createSale,
};