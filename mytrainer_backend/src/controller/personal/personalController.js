const Personal = require('../../models/personal');
const Client = require('../../models/client');
//const axios = require('axios');

module.exports = {
    async index(request,response){
        const { buscar } = request.query;
        nome = buscar
        let PersonalID = await Personal.find({ nome });
        if(!PersonalID[0]){
            PersonalID = {erro:"não existe"}
        }
        return response.json(PersonalID);
    },

    async story(request,response){
        const { nome, idade, sexo, cpf, tipo_de_treino, email, senha, /*latitude, longitude*/ } = request.body;

        let PersonalID = await Personal.findOne({ cpf })

        if (!PersonalID){
            PersonalID = await Personal.create({
                nome,
                idade,
                sexo,
                cpf,
                tipo_de_treino,
                email,
                senha,
                status: false,
                localizacao: {
                    latitude: null,
                    longitude: null,
                }
            })
        }else{
            PersonalID = {error : "Já existe essa conta"}
        }
        return response.json(PersonalID);
    },
}