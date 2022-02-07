const { getById } = require('../services/Sales');
const Products = require('../models/Products');

const getErrors = (arrayOfInputSales) => {
  const arrayOfErrors = [];
  arrayOfInputSales.map((sale) => {
  const { product_id: productId, quantity } = sale;
  switch (true) {
    case (!productId):
      return arrayOfErrors.push({ code: 400, message: '"product_id" is required' });
    case (quantity === undefined):
      return arrayOfErrors.push({ code: 400, message: '"quantity" is required' });
    case (typeof quantity === 'string' || quantity <= 0):
      return arrayOfErrors.push(
        { code: 422, message: '"quantity" must be a number larger than or equal to 1' },
      );
    default:
      return {};
  }
  });
  return arrayOfErrors;
};

const validateSale = (req, res, next) => {
  const arrayOfInputSales = req.body;
  const arrayOfErrors = getErrors(arrayOfInputSales);
  
  if (arrayOfErrors.length > 0) {
    const { code, message } = arrayOfErrors[0];
    return res.status(code).json({ message });
  }

  next();
};

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;

  const saleExists = await getById(id);

  if (saleExists.length === 0) return res.status(404).json({ message: 'Sale not found' });

  next();
};

const getArrayOfQuantitys = async (sales) => {
  const arrayOfQuantitys = [];
  const products = await Products.getAll();

  sales.map((product) => {
    const id = product.product_id;
    const findProduct = products.find((p) => p.id === Number(id));
    const productQuantity = findProduct.quantity;
    const newQuantity = productQuantity - product.quantity;
    if (newQuantity < 0) {
      arrayOfQuantitys.push(newQuantity);
    }
    return {};
  });

  return arrayOfQuantitys;
};

const validateAmount = async (req, res, next) => {
  const sales = req.body;
  const myArray = await getArrayOfQuantitys(sales);
  if (myArray.length > 0) {
    return res.status(422).json({ message: 'Such amount is not permitted to sell' });
  }
  next();
};

module.exports = {
  validateAmount,
  validateSale,
  validateSaleId,
};