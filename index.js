const express = require('express');
const { pool } = require('./src/config/database');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORTA;
const app = express();

app.use(express.json());

// const bancoDados = [];

app.get("/profissionais", async (req, res) => {
    try {
        const consulta =  `SELECT * FROM profissionais`
        const buscando = await pool.query(consulta)
        if (buscando.rows.length === 0) {
            return res.status(200).json({msg: "Banco de dados vazio"})
        }
        res.status(200).json(buscando.rows);
    } catch (error) {
        res.status(500).json({msg: "Erro ao buscar prestador de serviço", erro: error.message});
    }
});

app.get("/profissionais/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const dados1 = [id];
        const consulta1 = `SELECT * FROM profissionais WHERE id = $1`;
        const resultado1 = await pool.query(consulta1, dados1);
        if(resultado1.rows.length === 0) {
            return res.status(404).json({msg: "Prestador de serviço não encontrado."});
        }
        res.status(200).json(resultado1.rows);
    } catch (error) {
        res.status(500).json({msg: "Erro ao buscar prestador de serviço!",  erro: error.message});
    }
});

app.post("/profissionais", async (req, res) => {
    try {
        const {nome, especialidade, telefone, email, disponibilidade} = req.body;
        if (!nome || !especialidade || !telefone || !email || !disponibilidade) {
            return res.status(200).json({msg: "Todos os dados devem ser preenchidos!"});
        }
        const novoprofissionais = [nome, especialidade, telefone, email, disponibilidade];
        const consulta = `insert into profissionais (nome, especialidade, 
                            telefone, email, disponibilidade) values ($1, $2, $3, $4, $5) returning*`
        await pool.query(consulta, novoprofissionais);

        res.status(201).json({msg: "Prestador de serviço cadastrado com sucesso!"});
    } catch (error) {
        res.status(500).json({msg: "Erro ao cadastrar novo prestador de serviço.",
            erro: error.message
        });
    }
});
app.put("/profissionais/:id", async (req, res) => {
    try {
        const id = req.params.id;
    const {novoNome, novoEspecialidade, novoTelefone, novoEmail, novaDisponibilidade} = req.body;
    if (!id){
        return res.status(404).json({msg: "Informe o parametro"});
    }
    const dados1 = [id]
    const consulta1 = `SELECT * FROM profissionais WHERE id = $1`
    const resultado1 = await pool.query(consulta1, dados1)
    if (resultado1.rows.length === 0) {
        return res.status(404).json({msg: "prestador de serviço não encontrado!"});
    }

    const dados2 = [id, novoNome, novoEspecialidade, novoTelefone, novoEmail, novaDisponibilidade]
    const consulta2 = `UPDATE profissionais set nome = $2, especialidade = $3, telefone = $4, email = $5, disponibilidade = $6 WHERE id = $1`
    await pool.query(consulta2, dados2)
    res.status(200).json({msg: "Dados do prestador de serviço atualizado com sucesso!"})
    } catch (error) {
        res.status(500).json({msg: "Erro ao editar dados do prestador de serviço."});
    }
});

app.delete("/profissionais/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const parametro = [id]
        const consulta1 = `SELECT * FROM profissionais WHERE id = $1`
        const resultado1 = await pool.query(consulta1, parametro)
        if (resultado1.rows.length === 0) {
            return res.status(200).json({msg: "Prestador de serviço não encontrado"})
        }
        const dados2 = [id]
        const consulta2 = `DELETE FROM profissionais WHERE id = $1`
        await pool.query(consulta2, dados2)
        res.status(200).json({msg: "Prestador de serviço deletado com sucesso!"})
    } catch (error) {
        res.status(500).json({msg: "Erro ao excluir prestador de serviço!", erro: error.message})
    }
})

app.listen(port, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${port}`);
});

//atualizado com o banco de dados 



