const express = require('express');
const router = express.Router();
const EspecialidadeController = require('../controllers/EspecialidadeController');

// Criar uma especialidade
router.post('/especialidade', EspecialidadeController.criar);

// Listar todas as especialidades
router.get('/especialidade', EspecialidadeController.listarTodasEspecialidades);

// Vincular especialidade a profissional
router.post('/especialidade/vincular', EspecialidadeController.vincular);

// Listar especialidades por profissional
router.get('/especialidade/profissional/:id_profissional', EspecialidadeController.listarPorProfissional);

// [SUGESTÃO] Remover todos os vínculos de especialidades de um profissional
router.delete('/especialidade/profissional/:id_profissional', EspecialidadeController.removerVinculos);

// [SUGESTÃO] Deletar uma especialidade (opcional)
router.delete('/especialidade/:id_especialidade', EspecialidadeController.deletarEspecialidade);

module.exports = router;
