const sinon = require("sinon");
const { expect } = require("chai");
const { it } = require("mocha");

const connection = require("../../models/connection");
const ProductsControllers = require("../../controllers/Products");
const SalesControllers = require("../../controllers/Sales");










// Guardar para teste de controller!
    // describe("Lista produtos por id", () => {
    //   describe("Produto é encontrado com sucesso", () => {
    //     before(async () => {
    //       const products = [[{ id: 1, name: "Canecas de Café", quantity: 20 }]];
    //       sinon.stub(connection, "execute").resolves(products);
    //     });

    //     after(async () => {
    //       connection.execute.restore();
    //     });

    //     it()

    //   });
    // });