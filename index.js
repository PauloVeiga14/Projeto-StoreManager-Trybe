require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/Products');
const Sales = require('./controllers/Sales');
const validateProductName = require('./middlewares/validateProductName');
const validateProductQuantity = require('./middlewares/validateProductQuantity');
const validateSale = require('./middlewares/validateSale');

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
app.post('/sales', validateSale, Sales.createSale);

app.get('/sales', Sales.getAll);
app.get('/sales/:id', Sales.findSaleById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
