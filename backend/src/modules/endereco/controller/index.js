const EnderecoModel = require ('../models/index');

class EnderecoController{
    static async criarEndereco(req, res){  
        try {
            const {id_profissional, cep, numero, ponto_referencia} = req.body;
            if (!id_profissional || !cep || !numero) {
                return res.status(400).json({msg: "Todos os campos devem ser preenchidos!"})
            }
            const endereco = await EnderecoModel.criarEndereco(id_profissional, cep, numero, ponto_referencia)
            res.status(201).json(endereco)
        } catch (error) {
            res.status(500).json({ mensagem: 'Problema interno do servidor. Por favor tente mais tarde!', erro: error.message })
        }
    }
    
    static async AtualizarEndereco(req, res){
        try {
            const id_profissional = req.params.id_profissional
            const {cep, numero, ponto_referencia} = req.body
            if (!cep || !numero) {
                return res.status(400).json({msg: 'Todos os campos devem ser preenchidos'})
            }
            const endereco = await EnderecoModel.editarEndereco(id_profissional, cep, numero, ponto_referencia)
            if (endereco.length === 0){
                return res.status(400).json({msg: 'Endereco não encontrado'})
            }
            res.status(200).json({msg: 'Endereço atualizado com sucesso!', enderecoEditado: endereco})
        } catch (error) {
            res.status(500).json({msg: 'Problema interno do servidor. Por favor tente mais tarde!', erro: error.message })
        }
    }

    static async listarPorCep(req, res){
        try {
            const cep = req.params.cep
            const endereco = await EnderecoModel.listarPorCEP(cep);
            if(endereco.length === 0){
                return res.status(404).json({msg: 'Cep não existe ou não foi cadastrado!'})
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(500).json({msg: 'Problema interno do servidor. Por favor tente mais tarde!', erro: error.message })
        }
    }

    static async listarPorCidade(req, res){
        try {
            const cidade = req.params.cidade
            const endereco = await EnderecoModel.listarPorCidade(cidade);
            if (endereco.length === 0){
                return res.status(404).json({msg: 'Cidade não existe ou não cadastrado!'})
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(500).json({msg: 'Problema interno do servidor. Por favor tente mais tarde!', erro: error.message })
        }
    }

    static async listarPorProfissional(req, res){
        try {
            const id_profissional = req.params.id_profissional
            const endereco = await EnderecoModel.listarPorProfissional(id_profissional);
            if (endereco.length === 0){
                return res.status(404).json({msg: 'matricula não existe ou não foi cadastrado!'})
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(500).json({msg: 'Problema interno do servidor. Por favor tente mais tarde!', erro: error.message })
        }
    }

    static async listarTodosEndereco(req, res){
        try {
            const endereco = await EnderecoModel.listarTodosEndereco();
            if (endereco.length === 0){
                return res.status(400).json({msg: 'Nenhum endereço cadastrado!'})
            }
            res.status(200).json(endereco)
        } catch (error) {
            res.status(500).json({msg: 'Erro ao listar endereco', erro: error.message})
        }
    }

}

module.exports = EnderecoController;