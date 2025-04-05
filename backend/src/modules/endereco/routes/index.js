const express = require('express');
const EnderecoController = require('../controller/index');

const router = express.Router()

router.post("/endereco", EnderecoController.criarEndereco);

router.get("/endereco", EnderecoController.listarTodosEndereco);

router.get("/endereco/profissional/:id_profissional", EnderecoController.listarPorProfissional);

router.get("/endereco/cidade/:cidade", EnderecoController.listarPorCidade);

router.get("/endereco/cep/:cep", EnderecoController.listarPorCep);

router.put("/endereco/:id_profissional", EnderecoController.AtualizarEndereco)

module.exports = router;