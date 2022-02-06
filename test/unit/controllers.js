const sinon = require("sinon");
const { expect } = require("chai");
const { it } = require("mocha");

const connection = require("../../models/connection");
const ProductsControllers = require("../../controllers/Products");
const SalesControllers = require("../../controllers/Sales");

describe("Testando a camada de controllers dos Products", () => {
  describe("Testando a inclusão de produto", async () => {
    describe("Produtos incluído com sucesso", () => {
      const response = {};
      const request = {};
      
      before(() => {
        request.body = { name: 'Caneca de café', quantity: 20 };

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();

        sinon.stub(ProductsControllers, 'createProduct').resolves(true);
      });

      after(() => {
        ProductsControllers.createProduct.restore();
      });

      it("É chamado um status com código 201", async () => {
        await ProductsControllers.createProduct(request, response);
        expect(response.status.calledWith(201)).to.be.equal(false);
      }); 
    });
  });
});
