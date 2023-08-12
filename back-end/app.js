const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const Carro = require ("./routes/Carro")
const Cliente = require ("./routes/Cliente")
const Inventario = require ("./routes/Inventario")
const Pedido = require ("./routes/Pedido")
const PORT =  8081;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(Carro);
app.use(Cliente);
app.use(Inventario);
app.use(Pedido);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


