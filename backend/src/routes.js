const express = require('express');
const routes  = express.Router();

const OngController      = require('./controllers/ongs');
const IncidentController = require('./controllers/incidents');
const ProfileController  = require('./controllers/profiles');
const SessionController  = require('./controllers/session');

/**
 * Tipos de parâmetros:
 * Corpo da requisição
 * const body = request.body;
 *
 * Query params (route/{value})
 * const params = request.params;
 *
 * Route params (?param=value)
 * const query  = request.query;
 */

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;