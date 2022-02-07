require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');
const validateProductName = require('./middlewares/validateProductName');
const validateProductQuantity = require('./middlewares/validateProductQuantity');
const Validates = require('./middlewares/validateSale');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAll);
app.post('/products', validateProductName, validateProductQuantity, Products.createProduct);
app.get('/products/:id', Products.findById);
app.put('/products/:id', validateProductName, validateProductQuantity, Products.updateProduct);
app.delete('/products/:id', Products.deleteProduct);
app.get('/sales', Sales.getAllSales);
app.post('/sales', Validates.validateSale, Validates.validateAmount, Sales.insertSaleProduct);
app.get('/sales/:id', Validates.validateSaleId, Sales.getSaleById);

app.put('/sales/:id', Validates.validateSale, Sales.updateSale);

app.delete('/sales/:id', Sales.deleteSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
