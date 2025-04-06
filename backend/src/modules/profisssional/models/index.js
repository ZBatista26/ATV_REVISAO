const { pool } = require('../../../config/database')

class ProfissionalModel {
    static async criar(nome, telefone, email, disponibilidade) {
        const dados = [nome, telefone, email, disponibilidade]
        const consulta = `INSERT into profissional_profissional(nome, telefone, email, disponibilidade) values($1, $2, $3, $4) returning *`
        const novoProfissional = await pool.query(consulta, dados)
        return novoProfissional.rows
    }

    static async editar(id, nome, telefone, email, disponibilidade) {
        const dados = [id, nome, telefone, email, disponibilidade]
        const consulta = `update profissional_profissional set nome = $2, telefone = $3, email = $4, disponibilidade = $5 where id = $1 returning *`
        const profissionalAtualizado = await pool.query(consulta, dados)
        return profissionalAtualizado.rows
}

static async listar() {
    const consulta = `select * from profissional_profissional`
    const profissional = await pool.query(consulta)  // chamar dados no banco
    return profissional.rows  // retornar todas as linhas do elemento
}

static async listarPorID(id) {
    const dados = [id]
    const consulta = `select * from profissional_profissional where id = $1`
    const profissional = await pool.query(consulta, dados)
    return profissional.rows
}

static async excluirPorID(id) {
    const dados = [id]
    const consulta = `delete from profissional_profissional where id = $1`
    await pool.query(consulta, dados)
}

static async excluirTodos() {
    const consulta = `delete from profissional_profissional`
    await pool.query(consulta)
}
}

module.exports = ProfissionalModel