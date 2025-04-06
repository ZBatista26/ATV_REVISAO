const ProfissionalModel = require('../models/index');
const EspecialidadeModel = require('../../especialidade/models/index');
const { pool } = require('../../../config/database');


class ProfissionalController {
    static async criar(req, res) {
        try {
            const { nome, telefone, email, disponibilidade, especialidade } = req.body;

            if (!nome || !telefone || !email || !disponibilidade) {
                return res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
            }

            const [novoProfissional] = await ProfissionalModel.criar(nome, telefone, email, disponibilidade);

            if (Array.isArray(especialidade) && especialidade.length > 0) {
                for (const id_especialidade of especialidade) {
                    await EspecialidadeModel.vincularEspecialidadeAoProfissional(novoProfissional.id, id_especialidade);
                }
            }

            res.status(201).json({ msg: "Profissional cadastrado com sucesso!", profissional: novoProfissional });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao cadastrar profissional!", erro: error.message });
        }
    }

    static async listarTodos(req, res) {
        try {
            const profissionais = await ProfissionalModel.listar();

            if (profissionais.length === 0) {
                return res.status(204).json({ msg: "Nenhum profissional encontrado." });
            }

            const profissionaisComEspecialidades = await Promise.all(
                profissionais.map(async (prof) => {
                    const especialidades = await EspecialidadeModel.listarEspecialidadesPorProfissional(prof.id);
                    return { ...prof, especialidades };
                })
            );

            res.status(200).json(profissionaisComEspecialidades);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar profissionais.", erro: error.message });
        }
    }

    static async listarPorID(req, res) {
        try {
            const id = req.params.id;
            const [profissional] = await ProfissionalModel.listarPorID(id);

            if (!profissional) {
                return res.status(404).json({ msg: "Profissional não encontrado." });
            }

            const especialidades = await EspecialidadeModel.listarEspecialidadesPorProfissional(id);

            res.status(200).json({ ...profissional, especialidades });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar profissional!", erro: error.message });
        }
    }

    static async editar(req, res) {
        try {
            const id = req.params.id;
            const { nome, telefone, email, disponibilidade, especialidade } = req.body;

            const campos = { nome, telefone, email, disponibilidade };
            const algumCampoPreenchido = Object.values(campos).some(v => v !== undefined);

            if (!algumCampoPreenchido && !Array.isArray(especialidade)) {
                return res.status(400).json({ msg: "Pelo menos um campo deve ser atualizado." });
            }

            const [profissionalAtualizado] = await ProfissionalModel.editar(id, nome, telefone, email, disponibilidade);

            if (!profissionalAtualizado) {
                return res.status(404).json({ msg: "Profissional não encontrado." });
            }

            if (Array.isArray(especialidade)) {
                await EspecialidadeModel.removerVinculosDoProfissional(id);

                for (const id_especialidade of especialidade) {
                    await EspecialidadeModel.vincularEspecialidadeAoProfissional(id, id_especialidade);
                }
            }

            res.status(200).json({ msg: "Profissional atualizado com sucesso", profissional: profissionalAtualizado });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao editar profissional.", erro: error.message });
        }
    }

    static async excluirPorID(req, res) {
        try {
            const id = req.params.id;

            await EspecialidadeModel.removerVinculosDoProfissional(id);
            await ProfissionalModel.excluirPorID(id);

            res.status(200).json({ msg: "Profissional excluído com sucesso." });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao excluir profissional.", erro: error.message });
        }
    }

    static async excluirTodos(req, res) {
        try {
            await pool.query(`DELETE FROM profissional_especialidade`);
            await ProfissionalModel.excluirTodos();
            res.status(200).json({ msg: "Todos os profissionais foram excluídos com sucesso." });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao excluir todos os profissionais.", erro: error.message });
        }
    }
}

module.exports = ProfissionalController;
