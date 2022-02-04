const Sales = require('../models/Sales');

const getAll = async (_req, res) => {
  const sales = await Sales.getAll();
  return res.status(200).json(sales);
};

const findSaleById = async (req, res) => {
  const productId = 'product_id';
  const { id } = req.params;
  const arrayOfSalesById = [];
  const arrayOfSales = await Sales.getAll();
  const salesById = arrayOfSales.filter((sale) => sale.saleId === Number(id));
  
  if (salesById.length === 0) return res.status(404).json({ message: 'Sale not found' });
  
  salesById.map((sale) => { 
    const newObj = {
      date: sale.date,
      [productId]: sale.product_id,
      quantity: sale.quantity,
    };
    arrayOfSalesById.push(newObj);
    return arrayOfSalesById;
  }); 

  return res.status(200).json(arrayOfSalesById);
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

const mapping = async (saleId, arrayOfInputSales) => {
  const productId = 'product_id';
  const soldItem = [];
  await arrayOfInputSales.map((sale) => {
    const { product_id, quantity } = sale;
    Sales.createSale(saleId, product_id, quantity);
    soldItem.push({
      [productId]: sale.product_id,
      quantity: sale.quantity,
    });
    return {};
  });
  return soldItem;
};

const createSale = async (req, res) => {
  const arrayOfInputSales = req.body;
  const saleId = await createSaleId();
  const soldItem = await mapping(saleId, arrayOfInputSales);
  
  return res.status(201).json({
    id: saleId,
    itemsSold: soldItem, 
  });
};
  
module.exports = {
  getAll,
  findSaleById,
  createSale,
};