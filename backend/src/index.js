const express = require('express');
const routes  = require('./routes');
const cors    = require('cors');

const app = express()

// Faz com que todas as rotas tenham seu body transformado em JSON
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333)
console.log("Listening 3333")
console.log("Backend executando...")