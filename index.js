const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

const bancoDados = [];

app.get("/prestadorServico", (req, res) => {
    try {
        if (bancoDados.length === 0) {
            return res.status(200).json({msg: "Banco de dados vazio"})
        }
        res.status(200).json({bancoDados})
    } catch (error) {
        res.status(500).json({msg: "Erro ao buscar prestador de sersiço", erro: error.message});
    }
});

app.get("/prestadorServico/:id", (req, res) => {
    try {
        const id = req.params.id;
        const prestadorServico = bancoDados.find(elemento => elemento.id === id);
        if(!prestadorServico){
            return res.status(404).json({msg: "Prestador de serviço não encontrado."});
        }
        res.status(200).json(prestadorServico)
    } catch (error) {
        res.status(500).json({msg: "Erro ao buscar prestador de serviço!"});
    }
});

app.post("/prestadorServico", (req, res) => {
    try {
        const {id, nome, especialidade, telefone, email, disponibilidade} = req.body;
        if (!id || !nome || !especialidade || !telefone || !email || !disponibilidade) {
            return res.status(200).json({msg: "Todos os dados devem ser preenchidos!"});
        }
        const novoPrestadorServico = {id, nome, especialidade, telefone, email, disponibilidade};
        bancoDados.push(novoPrestadorServico);
        res.status(201).json({msg: "Prestador de serviço cadastrado com sucesso!"});
    } catch (error) {
        res.status(500).json({msg: "Erro ao cadastrar novo prestador de serviço.",
            erro: error.message
        });
    }
});
app.put("/prestadorServico/:id", (req, res) => {
    try {
        const id = req.params.id;
    const {novoNome, novoEspecialidade, novoTelefone, novoEmail, novoDisponibilidade} = req.body;
    if (!id){
        return res.status(404).json({msg: "Informe o parametro"});
    }
    const prestadorServico = bancoDados.find((elemento) => elemento.id === id);
    if (!prestadorServico) {
        return res.status(404).json({msg: "prestador de serviço não encontrado!"});
    }
    prestadorServico.nome = novoNome || prestadorServico.nome;
    prestadorServico.especialidade = novoEspecialidade || prestadorServico.disponibilidade;
    prestadorServico.telefone = novoTelefone || prestadorServico.telefone;
    prestadorServico.email = novoEmail || prestadorServico.email;
    prestadorServico.disponibilidade = novoDisponibilidade || prestadorServico.disponibilidade;
    res.status(200).json({msg: "Dados do prestador de serviço atualizado com sucesso!"})
    } catch (error) {
        res.status(500).json({msg: "Erro ao editar dados do prestador de serviço."});
    }
});

app.delete("/prestadorServico/:id", (req, res) => {
    try {
        const id = req.params.id;
        const index = bancoDados.findIndex((elemento) => elemento.id === id);
        if (index === -1) {
            return res.status(200).json({msg: "Prestador de serviço não encontrado!"})
        }
        bancoDados.splice(index, 1);
        res.status(200).json({msg: "Prestador de serviço deletado com sucesso"})
    } catch (error) {
        res.status(500).json({msg: "Erro ao excluir prestador de serviço!", erro: error.message})
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${port}`);
});





