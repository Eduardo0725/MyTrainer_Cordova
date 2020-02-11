const Client = require('../../models/client');

module.exports = {
    async confirmLogin(request, response){
        const { cpf, senha } = request.query;
        let ClientID = await Client.findOne({ cpf, senha });
        if (!ClientID) {
            ClientID = {erro:"Error: CPF e/ou Senha incorreto(s)"}
        }
        return response.json(ClientID);
    },

    async story(request,response){
        const { nome, idade, sexo, cpf, email, senha} = request.body;
        let ClientID = await Client.findOne({ cpf })
        if (!ClientID){
            ClientID = await Client.create({
                nome,
                idade,
                sexo,
                cpf,
                email,
                senha,
            })
        }else{
            ClientID = {error: "Já existe essa conta"}
        }
        return response.json(ClientID);
    }
}