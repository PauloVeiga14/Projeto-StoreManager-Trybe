const sale = require('../models/Sales');

const insert = async (saleId, arr) => {
  const newArray = [];
  arr.forEach((element) => {
    newArray.push(saleId, element.product_id, element.quantity);
  });
  const saleProduct = await sale.insertSaleProduct(newArray);
  return saleProduct;
};

const getAll = async () => {
    const sales = await sale.getAll();
    return sales;
  };
  
  const getById = async (id) => {
    const foundSale = await sale.getById(id);
    return foundSale;
  };

module.exports = {
  insert,
  getAll,
  getById,
}; 