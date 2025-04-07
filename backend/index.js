const express = require('express');
const dotenv = require('dotenv');
const { pool } = require('./src/config/database');

const profissionalRoutes = require('./src/modules/profisssional/routes/index');
const especialidadeRoutes = require('./src/modules/especialidade/routes/index');

dotenv.config();

const app = express();
const port = process.env.PORTA;

app.use(express.json());

// Usar as rotas organizadas
app.use('/profissionais', profissionalRoutes);
app.use('/especialidades', especialidadeRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});