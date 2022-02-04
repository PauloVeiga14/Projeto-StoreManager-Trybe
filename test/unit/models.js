const sinon = require("sinon");
const { expect } = require("chai");
const { it } = require("mocha");

const connection = require("../../models/connection");
const ProductsModels = require("../../models/Products");
const SalesModels = require("../../models/Sales");

describe("Testando a camada model dos produtos", () => {
  describe("Insere um novo produto", () => {
    describe("Produto inserido com sucesso", async () => {
      const product = { name: "Caneca de café", quantity: 20 };
      before(async () => {
        const execute = [{ insertId: 1 }];
        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um objeto", async () => {
        const myObject = await ProductsModels.createProduct(product.name, product.quantity);
        expect(myObject).to.be.an("object");
      });  

      it("O objeto possui a propriedade insertId", async () => {
        const myObject = await ProductsModels.createProduct(product.name, product.quantity);
        expect(myObject).to.have.a.property("insertId");
      });
    });
  });

  

});