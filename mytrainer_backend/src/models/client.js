const mongoose = require('mongoose');

const clientShema = new mongoose.Schema({
    nome: String,
    idade: Number,
    sexo: String,
    cpf: Number,
    email: String,
    senha: Number,
    localizacao: {
        latitude: Number,
        longitude: Number
    }
})

module.exports = mongoose.model('Client', clientShema);