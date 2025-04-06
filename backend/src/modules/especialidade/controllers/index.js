const EspecialidadeModel = require('../models/index');

class EspecialidadeController {
    static async criar(req, res) {
        try {
            const { nome } = req.body;
            if (!nome){
                return res.status(400).json({msg: "Todos os campos devem ser preenchidos"})
            }
            const novaEspecialidade = await EspecialidadeModel.criarEspecialidade(nome);
            res.status(201).json({msg: "Especialidade criada com sucesso!", especialidades: novaEspecialidade})
        } catch (error) {
            res.status(500).json({msg: 'Problema interno do servidor. Por favor tente mais tarde!', erro: error.message });
        }
    }

    static async listarTodasEspecialidades(req, res) {
        try {
            const especialidade = await EspecialidadeModel.listarEspecialidades();
            if(especialidade.length === 0){
                return res.status(400).json({msg: "Não foi encontrado nenhuma especialidade"})
            }
            res.status(200).json(especialidade);
        } catch (error) {
            res.status(500).json({msg: 'Problema interno do servidor. Por favor tente mais tarde!', erro: error.message });
        }
    }

    static async vincular(req, res) {
        try {
            const { id_profissional, id_especialidade } = req.body;
            const resultado = await EspecialidadeModel.vincularEspecialidadeAoProfissional(id_profissional, id_especialidade);
            res.status(201).json({ msg: "Especialidade vinculada com sucesso!", resultado });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

    static async listarPorProfissional(req, res) {
        try {
            const { id_profissional } = req.params;
            const especialidades = await EspecialidadeModel.listarEspecialidadesPorProfissional(id_profissional);
            res.status(200).json(especialidades);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
}

module.exports = EspecialidadeController;
