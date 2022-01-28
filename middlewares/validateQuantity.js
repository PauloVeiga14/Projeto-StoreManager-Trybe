const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;
  
  if (quantity === undefined) return res.status(400).json({ message: '"quantity" is required' });
  if (typeof quantity === 'string' || quantity <= 0) {
    return res.status(400).json(
      { message: '"quantity" must be a number larger than or equal to 1' },
    );
  }
  
  next();
};

module.exports = validateQuantity;