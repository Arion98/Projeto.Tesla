const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const Carro = require('../model/Carro');

sequelize.sync()


router.get('/Carros', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM Carros ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
        { replacements: [parseInt(limit), (page - 1) * parseInt(limit)] }
    )
    .then(([results, metadata]) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});
// Consulta a média do status do pedido
router.get('/Carros/media', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`
    SELECT carros.modelo,avg(pedidos.statusPedido) AS Pedidos FROM carros 
    LEFT JOIN Pedidos 
    ON pedidos.carroId = carros.id
    GROUP BY carros.modelo
    order by carros.modelo;`,
        { replacements: [req.params.id]}
    )
    .then((results) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

// Consulta o maximo de carros e todos os clientes

router.get('/Carros/max', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`
    SELECT clientes.nome,count(carros.id) "maximo de carros"  from carros
    left join pedidos
    on pedidos.carroId = carros.id
    left join clientes
    on clientes.id = pedidos.clienteId
    group by clientes.nome
    order by  count(carros.id); `,
        { replacements: [req.params.id]}
    )
    .then((results) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//seleciona o modelo dos carros e conta todos os pedidos

router.get('/Carros/pedidos', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`
    SELECT carros.modelo,COUNT(pedidos.id) AS Pedidos FROM carros 
    LEFT JOIN Pedidos 
    ON pedidos.carroId = carros.id
    GROUP BY carros.modelo
    order by carros.modelo;`,
        { replacements: [req.params.id]}
    )
    .then((results) => {
        res.json(results);
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});


//GET Consulta uma tarefa pelo ID
router.get('/Carros/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM Carros WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "tarefa não encontrada",
            });
        } else {
            res.json({
                success: true,
                Carros: results[0],
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//POST Cria uma tarefa
router.post('/Carros', async (req, res) => {
    sequelize.query(`INSERT INTO Carros (modelo,preco,caracteristicas, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
        { replacements: [req.body.modelo, req.body.preco, req.body.caracteristicas, new Date(), new Date()] }
    )
    .then(([results, metadata]) => {
        res.status(201).json({
            success: true,
            message: "Tarefa criada com sucesso",
        });
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//PUT Atualiza uma tarefa pelo ID
router.put('/Carros/:id', async (req, res) => {
    sequelize.query(`UPDATE Carros SET preco = ? WHERE id = ?`,
        { replacements: [req.body.preco, req.params.id] }
    )
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "tarefa não encontrada",
            });
        } else {
            res.json({
                success: true,
                message: "Tarefa atualizada com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//DELETE Deleta uma tarefa pelo ID
router.delete('/Carros/:id', async (req, res) => {
    sequelize.query(`DELETE FROM Carros WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (metadata.affectedRows === 0) {
            res.status(404).json({
                success: false,
                message: "tarefa não encontrada",
            });
        } else {
            res.json({
                success: true,
                message: "Tarefa deletada com sucesso",
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

module.exports = router;