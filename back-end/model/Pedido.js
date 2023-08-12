const db = require("../sequelize");
const Sequelize = require("sequelize");

const Pedido = db.define("Pedido", {

  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clienteId: Sequelize.INTEGER,
  carroId: Sequelize.INTEGER,
  dataPedido: Sequelize.DATE,
  statusPedido: Sequelize.STRING
});

Pedido.sync();

module.exports = Pedido;

