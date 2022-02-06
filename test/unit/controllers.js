const sinon = require("sinon");
const { expect } = require("chai");
const { it } = require("mocha");

const connection = require("../../models/connection");
const ProductsControllers = require("../../controllers/Products");
const SalesControllers = require("../../controllers/Sales");

describe("Testando a camada de controllers dos Products", () => {
  describe("Testando a inclusão de um produto", async () => {
    describe("Produto cadastrado com sucesso", () => {
      const response = {};
      const request = {};
      
      before(async () => {
        request.body = { name: "Caneca de café", quantity: 20 };
        // const execute = [{id: 1, name: "Caneca de Café", quantity: 20}];
        // sinon.stub(connection, 'execute').resolves(execute);

        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });

      // after(async () => {
      //   connection.execute.restore();
      // });

      it("É chamado um status com código 201", async () => {
        await ProductsControllers.createProduct(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      }); 
    });
  });
});
