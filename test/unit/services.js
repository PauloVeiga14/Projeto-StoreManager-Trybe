const sinon = require("sinon");
const { expect } = require("chai");
const { it } = require("mocha");

const connection = require("../../models/connection");
const SalesService = require("../../services/Sales");

describe("Testando a camada de serviços Sales", () => {
  describe("Testando a busca por vendas", () => {
    describe("Vendas encontradas com suceso", () => {
      before(async () => {
        const sales = [[{ saleId: 1, date: "2022-02-05T15:00:00.000Z", product_id: 1, quantity: 20 }]];
        sinon.stub(connection, 'execute').resolves(sales);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um array com pelo menos um objeto", async () => {
        const myArray = await SalesService.getAll();
        expect(myArray).to.deep.include.members([
          {
            saleId: 1,
            date: "2022-02-05T15:00:00.000Z",
            product_id: 1,
            quantity: 20,
          }
        ]);
      });
    });

    describe("Vendas encontradas com suceso pelo id", () => {
      before(async () => {
        const sales = [[{ date: "2022-02-05T15:00:00.000Z", product_id: 1, quantity: 20 }]];
        sinon.stub(connection, 'execute').resolves(sales);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um array com pelo menos um objeto", async () => {
        const myArray = await SalesService.getById(1);
        expect(myArray).to.deep.include.members([
          {
            date: "2022-02-05T15:00:00.000Z",
            product_id: 1,
            quantity: 20,
          }
        ]);
      });
    });
  });
});