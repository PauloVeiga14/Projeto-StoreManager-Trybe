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

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const foundSale = await Sales.getById(id);

  res.status(200).json(foundSale);
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
  getSaleById,
  insertSaleProduct,
  updateSale,
};