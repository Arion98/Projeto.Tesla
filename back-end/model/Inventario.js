const db = require("../sequelize");
const Sequelize = require("sequelize");

const Inventario = db.define("Inventario", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carroId: Sequelize.INTEGER,
  quantidade: Sequelize.INTEGER
});

Inventario.sync();

module.exports = Inventario;

