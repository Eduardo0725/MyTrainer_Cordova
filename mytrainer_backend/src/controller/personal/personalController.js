const Personal = require('../../models/personal');
const nameOrganizer = require('../../util/nameOrganizer');
const nameSelector = require('../../util/nameSelector');

module.exports = {
    async index(request, response) {
        const { busca } = request.query;
        let PersonalID = await Personal.find( nameSelector(busca) );
        if (!PersonalID[0]) {
            PersonalID = {erro:"não existe"}
        }
        return response.json(PersonalID);
    },

    async confirmLogin(request, response){
        const { cpf, senha } = request.query;
        let PersonalID = await Personal.findOne({ cpf, senha });
        if (!PersonalID) {
            PersonalID = {erro:"Error: CPF e/ou Senha incorreto(s)"}
        }
        return response.json(PersonalID);
    },

    async story(request, response) {
        const { nome, idade, sexo, cpf, tipo_de_treino, email, senha} = request.body;
        let nomeDividido = nameOrganizer(nome);

        let PersonalID = await Personal.findOne({ cpf })

        if (!PersonalID) {
            PersonalID = await Personal.create({
                nome,
                primeiroNome: nomeDividido.primeiroNome,
                segundoNome: nomeDividido.segundoNome,
                terceiroNome: nomeDividido.terceiroNome || null,
                quartoNome: nomeDividido.quartoNome || null,
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
        } else {
            PersonalID = { error: "Já existe essa conta" }
        }
        return response.json(PersonalID);
    },
}