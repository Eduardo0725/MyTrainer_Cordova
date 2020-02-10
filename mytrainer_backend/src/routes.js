const { Router } = require('express');
const personalController = require('./controller/personal/personalController')
const clientController = require('./controller/client/clientController')
const routes = Router(); 

routes.post('/personal', personalController.story);
routes.get('/personals', personalController.index);


routes.post('/client', clientController.story);

module.exports = routes;