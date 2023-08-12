const db = require("../sequelize");
const Sequelize = require("sequelize");

const Carro = db.define("Carro", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  modelo: Sequelize.STRING,
  preco: Sequelize.FLOAT,
  caracteristicas: Sequelize.TEXT
});

Carro.sync();

module.exports = Carro;

