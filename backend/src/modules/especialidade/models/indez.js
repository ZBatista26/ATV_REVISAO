const { pool } = require('../../../config/database');

class EspecialidadeModel {
    static async criarEspecialidade(nome) {
        const dados = [nome]
        const consulta = `INSERT INTO especialidade (nome) VALUES ($1) RETURNING *`;
        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async listarEspecialidades() {
        const consulta = `SELECT * FROM especialidade`;
        const resultado = await pool.query(consulta);
        return resultado.rows;
    }

    static async vincularEspecialidadeAoProfissional(id_profissional, id_especialidade) {
        const dados = [id_profissional, id_especialidade]
        const consulta = `
            INSERT INTO profissional_especialidade (id_profissional, id_especialidade) VALUES ($1, $2) RETURNING *`;
        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }

    static async listarEspecialidadesPorProfissional(id_profissional) {
        const dados = [id_profissional]
        const consulta = `SELECT especialidade.* FROM especialidade JOIN profissional_especialidade ON especialidade.id_especialidade = profissional_especialidade.id_especialidade WHERE profissional_especialidade.id_profissional = $1`
        const resultado = await pool.query(consulta, dados);
        return resultado.rows;
    }
}

module.exports = EspecialidadeModel;
