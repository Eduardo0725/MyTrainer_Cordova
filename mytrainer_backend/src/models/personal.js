const mongoose = require('mongoose');

const personalShema = new mongoose.Schema({
    nome: String,
    primeiroNome: String,
    segundoNome: String,
    terceiroNome: String,
    quartoNome: String,
    idade: String,
    sexo: String,
    cpf: Number,
    tipo_de_treino: Array,
    biografia: String,
    email: String,
    senha: String,
    status: Boolean,
    localizacao: {
        latitude: Number,
        longitude: Number,
    }
})

module.exports = mongoose.model('Personal', personalShema);