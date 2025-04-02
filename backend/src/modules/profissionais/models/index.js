const { pool } = require('../../../config/database')

class ProfissionaisModel {
    static async criar(nome, especialidade, telefone, email, disponibilidade) {
        const dados = [nome, especialidade, telefone, email, disponibilidade]
        const consulta = `INSERT into profissional_profissional(nome, especialidade, telefone, email, disponibilidade) values($1, $2, $3, $4, $5) returning *`
        const novoProfissional = await pool.query(consulta, dados)
        return novoProfissional.rows
    }

   
    static async Editar(id, nome, especialidade, telefone, email, disponibilidade) {
        const dados = [id, nome, especialidade, telefone, email, disponibilidade]
        const consulta = `update profissional_profissional set nome = $2, especialidade = $3, telefone = $4, email = $5, disponibilidade = $6 where id = $1 returning *`
        const profissionalAtualizado = await pool.query(consulta, dados)
        return profissionalAtualizado.rows

}

static async listar() {
    const consulta = `select * from profissional_profissional`
    const profissionais = await pool.query(consulta)  // chamar dados no banco
    return profissionais.rows  // retornar todas as linhas do elemento
}

static async listarPorID(id) {
    const dados = [id]
    const consulta = `select * from profissional_profissional where id = $1`
    const profissionais = await pool.query(consulta, dados)
    return profissionais.rows
}

static async excluirPorID(id) {
    const dados = [id]
    const consulta = `delete from profissional_profissional where id = $1`
    await pool.query(consulta, dados)
}

static async excluirTodos() {
    const consulta = `delete from profissional_profisional`
    await pool.query(consulta)
}
}

module.exports = ProfissionaisModel