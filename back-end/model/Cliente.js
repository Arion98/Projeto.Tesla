const db = require("../sequelize");
const Sequelize = require("sequelize");

const Cliente = db.define("Cliente", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: Sequelize.STRING,
  email: Sequelize.STRING,
  telefone: Sequelize.STRING,
  endereco: Sequelize.TEXT
});

Cliente.sync();

module.exports = Cliente;

