const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT
    id AS saleId, date, product_id, quantity 
  FROM 
    StoreManager.sales AS sales
  JOIN 
    StoreManager.sales_products AS sales_products
  ON 
    sales.id = sales_products.sale_id;
  `);
  return sales;
};

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
  getAll,
  getAllSales,
  createSaleId,
  createSale,
};