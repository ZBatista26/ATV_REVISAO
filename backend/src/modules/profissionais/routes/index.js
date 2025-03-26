const express = require('express'); // biblioteca (sempre em cima) 
const ProfissionaisController = require('../controllers/index');

// sistema de roteamento do express (todo gereciamento de rota dentro do router)
const router = express.Router()
// criando
router.post("/profissionais", ProfissionaisController.criar)  // passando o path e pegando a funçao de criar no controller

// pegando todos
router.get("/profissionais", ProfissionaisController.listarTodos) // passando o path e pegando a funçao de listar todos no controller

// pegando por matricula
router.get("/profissionais/:id", ProfissionaisController.listarPorID) // passando o path e pegando a funçao de listar por matricula no controller

// editando
router.put("/profissionais/:id", ProfissionaisController.editar) // passando o path e pegando a funçao de editar no controller

// excluindo todos
router.delete("/profissionais", ProfissionaisController.excluirTodos) // passando o path e pegando a funçao de excluir todos no controller

// excluindo por id
router.delete("/profissionais/:id", ProfissionaisController.excluirPorID) //passando o path e pegando a funçao de excluir por matricula no controller

module.exports = router;