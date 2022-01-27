require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./models/Products');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.validateName, Products.validateQuantity, Products.createProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
