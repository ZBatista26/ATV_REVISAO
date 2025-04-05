const axios = require('axios');
const { pool } = require('../../../config/database');

class EnderecoModel{
    static async criarEndereco(id_profissional, cep, numero, ponto_referencia){
        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data

        const dados = [
            id_profissional,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            uf,
            ponto_referencia,
        ]
        const consulta = `INSERT into profissional_endereco(id_profissional, cep, logradouro, numero, complemento, bairro, localidade, uf, ponto_referencia) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async AtualizarEndereco(id_profissional, cep, numero, ponto_referencia){
        const resposta = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)
        const {logradouro, complemento, bairro, localidade, uf} = resposta.data
        const dados = [
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            localidade,
            uf,
            ponto_referencia,
            id_profissional,
        ]

        const consulta = `update profissional_endereco set cep = $1, logradouro = $2, numero = $3,
        complemento = $4, bairro = $5, localidade = $6, uf = $7, ponto_referencia = $8 where id_profissional = $9 returning *`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarPorCEP(cep){
        const dados = [cep]
        const consulta = `select * from profissional_endereco where cep = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows
    }

    static async listarPorCidade(cidade){
        const dados = [`%${cidade}%`]
        const consulta = `select * from profissional_endereco where lower(localidade) like lower($1) `
        const resultado = await pool.query(consulta, dados)
        return resultado.rows

    } 
    static async listarPorProfissional(id_profissional){
        const dados = [id_profissional]
        const consulta = `select profissional_profissional.id_profissional, profissional_profissional.nome, profissional_endereco.* from profissional_profissional
        join profissional_endereco on profissional_profissional.id_profissional = profissional_endereco.id_profissional
        where profissional_profissional.id_profissional = $1`
        const resultado = await pool.query(consulta, dados)
        return resultado.rows

    }

    static async listarTodosEndereco(){
        const consulta = `select * from profissional_endereco`
        const resultado = await pool.query(consulta)
        return resultado.rows
    }

}
module.exports = EnderecoModel;