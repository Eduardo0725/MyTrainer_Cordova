const { Router } = require('express');
const personalController = require('./controller/personal/personalController')
const clientController = require('./controller/client/clientController')
const routes = Router(); 

routes.post('/personal', personalController.story); //Cadastrar Personal
routes.get('/personals', personalController.index); //Procurar personais
routes.get('/personals', personalController.confirmLogin); //Confimar login de Personal


routes.post('/client', clientController.story); //Cadastrar Cliente
routes.get('/clients', clientController.confirmLogin); //Confirmar login de Cliente

module.exports = routes;