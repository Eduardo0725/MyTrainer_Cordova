const parseToArrayString = require('./parseToArrayString');
module.exports = function nameOrganizer(nome) {
    let names = parseToArrayString(nome);
    let newName = {};
    i = 0
    for (name of names) {
        ordem = ["primeiroNome", "segundoNome", "terceiroNome", "quartoNome"]
        newName[ordem[i]] = name
        i++
    }
    return newName;
}