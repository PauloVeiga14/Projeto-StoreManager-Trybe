require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Products = require('./controllers/Products');
const validateName = require('./middlewares/validateName');
const validateQuantity = require('./middlewares/validateQuantity');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', Products.getAll);

app.post('/products', validateName, validateQuantity, Products.createProduct);

app.get('/products/:id', Products.findById);

app.put('/products/:id', validateName, validateQuantity, Products.updateProduct);

app.delete('/products/:id', Products.deleteProduct);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
