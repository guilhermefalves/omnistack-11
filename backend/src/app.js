const express = require('express');
const routes  = require('./routes');
const cors    = require('cors');
const { errors } = require('celebrate');

const app = express();

// Faz com que todas as rotas tenham seu body transformado em JSON
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;