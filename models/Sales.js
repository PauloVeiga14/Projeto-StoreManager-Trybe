const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
  SELECT
    products.sale_id AS saleId, date, product_id, quantity 
  FROM 
    StoreManager.sales_products AS products
  JOIN 
    StoreManager.sales AS sales
  ON 
    products.sale_id = sales.id;
  `);
  return sales;
};

const getById = async (id) => {
  const [sales] = await connection.execute(`
  SELECT
    date, product_id, quantity
  FROM 
    StoreManager.sales_products as products
  JOIN
    StoreManager.sales as sales
  ON
    products.sale_id = sales.id
  WHERE
    products.sale_id = ?
  `, [id]);
  return sales;
};

const insertSale = async () => {
  const sale = await connection.execute('INSERT INTO StoreManager.sales () VALUES ()');
  return sale;
};

const insertSaleProduct = async (array) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
  VALUES ?`;
  const saleProduct = await connection.query(query, [array]);
  return saleProduct;
};

const updateSale = async (productId, newQuantity, id) => {
  const [sale] = await connection.execute(`
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?
    `,
  [newQuantity, id, productId]);
  return sale;
};

module.exports = {
  getAll,
  getById,
  insertSale,
  insertSaleProduct,
  updateSale,
};