const sinon = require("sinon");
const { expect } = require("chai");
const { it } = require("mocha");

const connection = require("../../models/connection");
const ProductsControllers = require("../../controllers/Products");
const ProductsModels = require("../../models/Products");
const SalesControllers = require("../../controllers/Sales");
const SalesServices = require("../../services/Sales");
const req = require("express/lib/request");

describe("Testando a camada de controllers dos Products", () => {
  describe("Testando a listagem de produtos", async () => {
    describe("Produtos exibidos com sucesso", () => {
      const response = {};
      const request = {};
      
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(ProductsModels, 'getAll').resolves(true);
      });

      after(() => {
        ProductsModels.getAll.restore();
      });

      it("É chamado um status com código 200", async () => {
        await ProductsControllers.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });


    });
  });
});

describe("Testando a camada de controllers dos Sales", () => {
  describe("Testando a listagem de vendas", async () => {
    describe("Vendas exibidas com sucesso", () => {
      const response = {};
      const request = {};
      
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "execute").resolves(execute);

        sinon.stub(SalesServices, 'getAll').resolves(true);
      });

      after(() => {
        connection.execute.restore();
        SalesServices.getAll.restore();
      });

      it("É chamado um status com código 200", async () => {
        await SalesControllers.getAllSales(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });


    });
  });

  describe("Testando a listagem de vendas por id", async () => {
    describe("Vendas exibidas com sucesso", () => {
      const response = {};
      const request = {};
      
      before(() => {
        request.params = {id: 1}
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "execute").resolves(execute);

        sinon.stub(SalesServices, 'getById').resolves(true);
      });

      after(() => {
        connection.execute.restore();
        SalesServices.getById.restore();
      });

      it("É chamado um status com código 200", async () => {
        await SalesControllers.getSaleById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });


    });
  });
});
