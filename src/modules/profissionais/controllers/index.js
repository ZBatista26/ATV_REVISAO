const ProfissionaisModel = require ('../models/index')

class ProfissionaisController{
    static async criar(req, res){
        try {
            const {nome, especialidade, telefone, email, disponibilidade} = req.body
            if  (!nome || !especialidade || !telefone || !email || !disponibilidade) {
                return res.status(400).json({msg: "Todos os campos devem ser preenchidos!"})
            }
            const novoProfissional = await ProfissionaisModel.criar(nome, especialidade, telefone, email, disponibilidade)
            res.status(201).json({msg: "Profissional cadastrado com sucesso!", profissional: novoProfissional})
        } catch (error) {
            res.status(500).json({msg: "Erro ao cadastrar profissional!", erro: error.message})
        }
    }

    static async listarTodos(req, res){
        try {
            const profissionais = await ProfissionaisModel.listar()
            if(profissionais.length === 0){ //const profissional = await ProfissionaisModel.listarPorID(id); if (profissional.length === 0) { ... }
                return res.status(400).json({msg: "Não foi encontarado nenhum profissional"})
            }
            res.status(200).json(profissionais)
        } catch (error) {
            res.status(500).json({msg: "Erro ao listar profissionais.", erro: error.message})
        }
    }

    static async listarPorID(req, res){
       try {
        const id = req.params.id;
        const profissional = await ProfissionaisModel.listarPorID(id);
        if (!profissional){
            return res.status(400).json({msg: "Profissional não encontrado"})
        }
        res.status(201).json({profissional})
       } catch (error) {
        res.status(500).json({msg: "Erro ao Listar profissional!", erro: error.message})
       }
    }

    static async editar(req, res) {
        try {
            const id = req.params.id;
            const {nome, especialidade, telefone, email, disponibilidade} = req.body;

            if (!nome && !especialidade && !telefone && !email && !disponibilidade) {
                return res.status(400).json({msg: "Pelo menos um campo deve ser atualizado" });
            }
            const profissionalAtualizado = await ProfissionaisModel.editar (id, { nome, especialidade, telefone, email, disponibilidade});
            if (!profissionalAtualizado) { //const profissionalAtualizado = await ProfissionaisModel.Editar(id, nome, especialidade, telefone, email, disponibilidade);
                return res.status(400).json({msg: "Profisssional não encontrado." });
            }
            res.status(200).json({msg: "profissional atualizado com sucesso", profissional: profissionalAtualizado});
        } catch (error) {
            res.status(500).json({msg: "Erro ao editar profissional.", erro: error.message });
        }
    }

    static async excluirPorID(req, res) {
        try {
            const id = req.params.id;
            const profissionalExcluido = await ProfissionaisModel.excluirPorID(id);
            if (!profissionalExcluido) {
                return res.status(400).json({msg: "profissional não encontrado." });
            }
            res.status(200).json({msg: "profisssional excluído com sucesso." });
        } catch (error) {
            res.status(500).json({msg: "Erro ao excluir profissional.", erro: error.message });
        }
    }

    static async excluirTodos(req, res) {
        try {
            await ProfissionaisModel.excluirTodos();
            res.status(200).json({msg: "Todos os profissionais foram excluídos com sucesso." });
        } catch (error) {
            res.status(500).json({msg: "Erro ao excluir todos os profissionais.", erro: error.message });
        }
    }

}

module.exports = ProfissionaisController;