const express = require('express');
const router = express.Router();
const EspecialidadeController = require('../controllers/index');

// Criar uma especialidade
router.post('/especialidade', EspecialidadeController.criar);

// Listar todas as especialidades
router.get('/especialidade', EspecialidadeController.listarTodasEspecialidades);

// Vincular especialidade a profissional
router.post('/especialidade/vincular', EspecialidadeController.vincular);

// Listar especialidades por profissional
router.get('/especialidade/profissional/:id_profissional', EspecialidadeController.listarPorProfissional);


module.exports = router;
