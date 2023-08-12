const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const Pedido = require('../model/Pedido');
sequelize.sync()




router.get('/Pedidos', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM Pedidos ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
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

//Mostra todas tabelas

router.get('/TotasTabelas', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`
    SELECT carros.*,clientes.*,pedidos.* FROM carros
    left join pedidos 
    on pedidos.carroId = carros.id
    left join clientes
    on clientes.id = pedidos.clienteId;`,
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



router.get('/Pedidos/Clientes', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`
            SELECT 
            Pedidos.id, 
            Clientes.nome, 
            Carros.modelo, 
            Carros.preco
        FROM 
            Pedidos
        INNER JOIN 
            Clientes ON Pedidos.clienteId = Clientes.id
        INNER JOIN 
            Carros ON Pedidos.carroId = Carros.id
        ORDER BY 
            Pedidos.updatedAt DESC;`,
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
router.get('/Pedidos/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM Pedidos WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "tarefa não encontrada",
            });
        } else {
            res.json({
                success: true,
                Pedidos: results[0],
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
router.post('/Pedidos', async (req, res) => {
    sequelize.query(`INSERT INTO Pedidos (clienteId, carroId, dataPedido, statusPedido, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
        { replacements: [req.body.clienteId,req.body.carroId,new Date(),req.body.statusPedido, new Date(), new Date()] }
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
router.put('/Pedidos/:id', async (req, res) => {
    sequelize.query(`UPDATE Pedidos SET statusPedido = ? WHERE id = ?`,
        { replacements: [req.body.statusPedido, req.params.id] }
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
router.delete('/Pedidos/:id', async (req, res) => {
    sequelize.query(`DELETE FROM Pedidos WHERE id = ?`, { replacements: [req.params.id] })
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