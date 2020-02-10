const Client = require('../../models/client');

module.exports = {
    async story(request,response){
        const { nome, idade, sexo, cpf, email, senha, /*latitude, longitude*/ } = request.body;

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