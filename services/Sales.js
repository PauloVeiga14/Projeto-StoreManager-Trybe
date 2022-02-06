const Sale = require('../models/Sales');

const insert = async (sales) => {
  const [id] = await Sale.insertSale();
  const newSale = sales.map((element) => [id.insertId, element.product_id, element.quantity]);
  await Sale.insertSaleProduct(newSale);
  return { id: id.insertId, itemsSold: sales };
};

const getAll = async () => {
    const sales = await Sale.getAll();
    return sales;
  };
  
  const getById = async (id) => {
    const foundSale = await Sale.getById(id);
    return foundSale;
  };

module.exports = {
  insert,
  getAll,
  getById,
}; 