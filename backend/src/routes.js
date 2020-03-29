const express = require('express');
const routes  = express.Router();


const { celebrate, Joi, Segments } = require('celebrate')
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

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().integer().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()

}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object({
        title: Joi.string().required().max(255),
        description: Joi.string().required().max(255),
        value: Joi.number().required()
    })
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);

module.exports = routes;