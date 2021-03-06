const Sales = require('../models/Sales');

const { insert, getAll, getById } = require('../services/Sales');

const insertSaleProduct = async (req, res) => {
  const sales = req.body;

  const saleProduct = await insert(sales);

  return res.status(201).json(saleProduct);
};

const getAllSales = async (_req, res) => {
  const sales = await getAll();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const foundSale = await getById(id);

 return res.status(200).json(foundSale);
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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const foundSale = await getById(id);
  console.log(foundSale);

  if (foundSale.length < 1) return res.status(404).json({ message: 'Sale not found' });

  await Sales.deleteSale(id);

  return res.status(200).json(foundSale);
};
  
module.exports = {
  getAllSales,
  getSaleById,
  insertSaleProduct,
  updateSale,
  deleteSale,
};