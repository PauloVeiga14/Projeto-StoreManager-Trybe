const validateSale = async (req, res, next) => {
  const arrayOfInputSales = req.body;

  await arrayOfInputSales.map((sale) => {
    const { product_id: productId, quantity } = sale;
    if (!productId) return res.status(400).json({ message: '"product_id" is required' });
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (typeof quantity === 'string' || quantity <= 0) {
      return res.status(422).json(
        { message: '"quantity" must be a number larger than or equal to 1' },
      );
    }
  return {};
  });

  next();
};

module.exports = validateSale;