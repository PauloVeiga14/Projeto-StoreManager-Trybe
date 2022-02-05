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

      it("Retorna um objeto com a propriedade inserId", async () => {
        const myObject = await ProductsModels.createProduct(product.name, product.quantity);
        expect(myObject).to.be.an("object");
        expect(myObject).to.have.a.property("insertId");
      });  
    });
  });

  describe("Lista todos os produtos", () => {
    describe("Produtos encontrados com suceso", () => {
      before(async () => {
        const products = [[{ id: 1, name: "Canecas de Café", quantity: 20 }]];
        sinon.stub(connection, 'execute').resolves(products);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um array de objetos", async () => {
        const myArray = await ProductsModels.getAll();
        expect(myArray).to.deep.include.members([
          {
            id: 1,
            name: "Canecas de Café",
            quantity: 20,
          }
        ]);
      });
    });
  });
     
  describe("Atualiza o produto por id", () => {
    describe("Produto atualizado com sucesso", () => {
      before(async ()=> {
        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "execute").resolves(execute);
      });
      
      after(async () => {
        connection.execute.restore();
      })

      it("O objeto de retorno possui a propriedade affectedRows", async () => {
        const response = await ProductsModels.updateProduct(1);
        expect(response).to.have.property("affectedRows").equal(1);
      });
    });
  });

  describe("Deleta o produto", () => {
    describe("Produto deletado com sucesso", () => {
      before(async ()=> {
        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "execute").resolves(execute);
      });
      
      after(async () => {
        connection.execute.restore();
      })

      it("O objeto de retorno possui a propriedade affectedRows", async () => {
        const response = await ProductsModels.deleteProduct();
        expect(response[0]).to.have.property("affectedRows").equal(1);
      });
    });
  });  
});

describe("Testando a camada models das Sales", () => {
  describe("Testa o retorno de todas as vendas", () => {
    const sale = {
      saleId: 1,
      date: "2022-02-05T15:00:00.000Z",
      product_id: 2,
      quantity: 1,
    };

    before(async () => {
      const mySale = [[sale]];
      sinon.stub(connection, "execute").resolves(mySale);
    });

    after(async () => {
      connection.execute.restore();
    });

    it("Retorna um array de objetos com props saleId, date, product_id e quantity", async () => {
      const myArray = await SalesModels.getAll();
      expect(myArray).to.be.an("array");
      expect(myArray[0]).to.be.an("object");
      expect(myArray[0]).to.have.property("saleId");
      expect(myArray[0]).to.have.property("date");
      expect(myArray[0]).to.have.property("product_id");
      expect(myArray[0]).to.have.property("quantity");
    });
  });

  // describe("Testa a inclusão de uma venda", () => {
  //   describe("Inclusão feita com sucesso", () => {
  //     before(async () => {
  //       const execute = [{ insertId: 1 }];
  //       sinon.stub(connection, "execute").resolves(execute);
  //     });

  //     after(async () => {
  //       connection.execute.restore();
  //     });

  //     it("Retorna dois objetos com a propriedade insertId", async () => {
  //       const myFirstObject = await SalesModels.createSaleId();
  //       const mySecondObject = await SalesModels.createSale();
  //       expect(myFirstObject).to.be.an("object");
  //       expect(myFirstObject).to.have.a.property("insertId").equal(1);
  //       expect(mySecondObject).to.be.an("object");
  //       expect(mySecondObject).to.have.a.property("insertId").equal(1);
  //     })
  //   });
  // });


  describe("Testa a atualização de uma venda", () => {
    describe("Atualização feita com sucesso", () => {
      before(async () => {
        const execute = [{ affectedRows: 1 }];
        sinon.stub(connection, "execute").resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it("Retorna um objeto com a propriedade affectedRows", async () => {
        const myObject = await SalesModels.updateSale(1);
        expect(myObject).to.be.an("object");
        expect(myObject).to.have.a.property("affectedRows").equal(1);
      });
    });
  });



});