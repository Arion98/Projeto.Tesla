const express = require('express');
const router = express.Router();
const sequelize = require('../sequelize');
const Inventario = require('../model/Inventario');
sequelize.sync()


router.get('/Inventarios', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`SELECT * FROM Inventarios ORDER BY updatedAt DESC LIMIT ? OFFSET ?`,
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

//GET Consulta uma tarefa pelo ID
router.get('/Inventarios/:id', async (req, res) => {
    sequelize.query(`SELECT * FROM Inventarios WHERE id = ?`, { replacements: [req.params.id] })
    .then(([results, metadata]) => {
        if (results.length === 0) {
            res.status(404).json({
                success: false,
                message: "tarefa não encontrada",
            });
        } else {
            res.json({
                success: true,
                Inventarios: results[0],
            });
        }
    }).catch((error) => {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    });
});

//Motra o inventario junto de detalhes do carro

router.get('/Inventarios/carros', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    sequelize.query(`
    select inventarios.*,carros.* from inventarios
    left join carros
    on carros.id = inventarios.carroId`,
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

//POST Cria uma tarefa
router.post('/Inventarios', async (req, res) => {
    sequelize.query(`INSERT INTO Inventarios (carroId,quantidade, createdAt, updatedAt) VALUES (?, ?, ?, ?)`,
        { replacements: [req.body.carroId,req.body.quantidade, new Date(), new Date()] }
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
router.put('/Inventarios/:id', async (req, res) => {
    sequelize.query(`UPDATE Inventarios SET quantidade = ? WHERE id = ?`,
        { replacements: [req.body.quantidade, req.params.id] }
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
router.delete('/Inventarios/:id', async (req, res) => {
    sequelize.query(`DELETE FROM Inventarios WHERE id = ?`, { replacements: [req.params.id] })
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