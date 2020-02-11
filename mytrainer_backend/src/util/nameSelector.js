const nameOrganizer = require('./nameOrganizer');
module.exports = function nameSelector(busca) {
    nomeDividido = nameOrganizer(busca)
    nomeDividido = Object.assign({}, nomeDividido);
    console.log(nomeDividido);
    return nomeDividido;
}