const Sales = require('../models/Sales');

const { insert } = require('../services/Sales');

const insertSaleProduct = async (req, res) => {
  const [id] = await Sales.insertSale();

  await insert(id.insertId, req.body);

  res.status(201).json({ id: id.insertId, itemsSold: req.body });
};

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

const updateSale = async (req, res) => {
  const productKeyId = 'product_id';
  const { id } = req.params;
  const { product_id: productId, quantity } = req.body[0];

  await Sales.updateSale(productId, quantity, id);
    
  return res.status(200).json({ 
    saleId: id,
    itemUpdated: [
      {
        [productKeyId]: productId,
        quantity,
      },
    ],
   });
};
  
module.exports = {
  getAll,
  findSaleById,
  insertSaleProduct,
  updateSale,
};