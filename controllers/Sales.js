const Sales = require('../models/Sales');

const getAll = async () => {
  const sales = await Sales.getAll();
  return sales;
};

const createSaleId = async () => {
  await Sales.createSaleId();
  const arrayOfSales = await Sales.getAllSales();
  let saleId;
  if (arrayOfSales.length === 0) { 
    saleId = 1;
  } else {
    const indexOfLastSale = arrayOfSales.length - 1;
    saleId = arrayOfSales[indexOfLastSale].id;
  }
  return saleId;
};

const mapping = async (saleId, array) => {
  const soldItem = [];
  await array.map((sale) => {
    const { product_id: productId, quantity: productQuantity } = sale;
    Sales.createSale(saleId, productId, productQuantity);
    soldItem.push({
      productId,
      productQuantity,
    });
    return {};
  });
  return soldItem;
};

const createSale = async (req, res) => {
  const arrayOfInputSales = req.body;
  const saleId = await createSaleId();
  const soldItem = await mapping(saleId, arrayOfInputSales);
  return res.status(200).json({
    id: saleId,
    itemsSold: soldItem, 
  });
};
  
module.exports = {
  getAll,
  createSale,
};