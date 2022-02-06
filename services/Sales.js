const sale = require('../models/Sales');

const insert = async (saleId, arr) => {
  const newArray = [];
  arr.forEach((element) => {
    newArray.push(saleId, element.product_id, element.quantity);
  });
  const saleProduct = await sale.insertSaleProduct(newArray);
  return saleProduct;
};

module.exports = {
  insert,
}; 