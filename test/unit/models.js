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
        const response = await ProductsModels.deleteProduct(1);
        expect(response).to.have.property("affectedRows").equal(1);
      });
    });
  });
  
  
  });
});