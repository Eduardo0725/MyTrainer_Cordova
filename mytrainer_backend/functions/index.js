const corsModule = require('cors');
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const cors = corsModule({
    //O "origin" escolhe quais origens tem permissão para fazer a solicitação. 
    //Se for "true" qualquer origem pode fazer a soicitação, 
    //caso uma origem especifica pode fazer a solicitação, será colocado uma string com o nome da origem, ex: "http://example.com/user".
    origin: true,

    //O "methods" é os métodos utilizados pelo servidor.
    methods: ['GET', 'PUT', 'POST']
});

//Ambos

//O "validate_usuario" vai verificar se o email existe e se a senha esta correta.
exports.validate_usuario = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {

        //A variável "arquivo" vai pegar o body na requisição.
        let arquivo = request.body;

        //Vai acessar o banco de dados na coleção especificada na propriedade "arquivo.collection",
        //e vai procurar quais documentos tem a propriedade "email" com o valor do "arquivo.email" e vai traze-lo. 
        await db.collection(arquivo.collection).where("email", "==", arquivo.email).get()
            .then(snapshot => { //Caso a conexão com o banco de dados for bem sucedida, vai trazer o resultado para a variável "snapshot".

                //Caso o "snapshot" for vazio vai retornar uma resposta em formato json com uma mensagem de erro
                if (snapshot.empty) {
                    return response.json({ "erro": "Esse email não existe." });
                }

                let disponiveis;

                //O ".forEach()" vai percorrer a cada index do snapshot e passá-la para a variável "doc", 
                //cada index é um documento encontrado, mas como os emails do banco de dados são todos diferentes, vai ter somente um documento (index)
                snapshot.forEach((doc) => {
                    //Caso a senha da solicitação seja igual a senha do documento, vai retornar o id do documento e o email do usuario para o "disponiveis", senão vai retorna "false" para o "disponiveis"
                    disponiveis = (doc.data().senha == arquivo.senha) ? {
                        "id": doc.id,
                        "email": doc.data().email
                    } : false;
                });

                //Agora é retornado o "disponiveis" como resposta em formato json.
                return response.json(disponiveis);
            })
            .catch(() => { //Caso a conexão com o banco for mal sucedida vai retornar uma mensagem de erro como resposta em formato json.
                return response.json({ "erro": "Erro na conexão." });
            });
    })
});

//O "find_data" procura o documento, se achar envia as informações devolta, senão retorna "false".
exports.find_data = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection(arquivo.collection).doc(arquivo.id).get()
            .then(doc => {
                if (!doc.exists) {
                    return false;
                }
                let usuario = [doc.id, doc.data()];
                return response.json(usuario);
            })
    })
});

//O "create_usuario" vai criar a conta do usuario.
exports.create_usuario = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {

        //A variável "arquivo" vai pegar o body na requisição.
        let arquivo = request.body;

        //Vai acessar o banco de dados na coleção especificada na propriedade "arquivo.tipo",
        //e vai procurar quais documentos tem a propriedade "email" com o valor do "arquivo.doc.email" e vai traze-lo.
        let result = await db.collection(arquivo.tipo).where("email", "==", arquivo.doc.email).get()
            .then(doc => { //Caso a conexão com o banco de dados for bem sucedida, vai trazer o resultado para a variável "doc".
                
                //Caso o "doc" não for vazio vai retornar um objeto com uma mensagem de erro, escrito que já existe esse email.
                if (!doc.empty) {
                    return { erro: "Esse email já existe." };
                }
    
            }).catch(() => {  //Caso a conexão com o banco for mal sucedida vai retornar um objeto com uma mensagem de erro, escrito que ouve um erro na conexão.
                return { "erro": "Erro na conexão." };
            });

        //Se a variável "result" tiver alguma informação, ele será retornado como uma resposta em formato json.
        if (result) {
            return response.json(result);
        }

        //Se o "result" for vazio,
        //vai acessar o banco de dados na coleção especificada na propriedade "arquivo.tipo",
        //e vai adicionar um documento na coleção usando o objeto "arquivo.doc".
        await db.collection(arquivo.tipo).add(arquivo.doc)
            .then(() => { //Caso a conexão com o banco de dados for bem sucedida, vai enviar uma resposta em json com uma mensagem de sucesso.
                
                return response.json({ "sucesso": "Sucesso" })
            })
            .catch(() => { //Caso a conexão com o banco de dados for mal sucedida, vai enviar uma resposta em json com uma mensagem de erro.
                return response.json({ "erro": "Erro na conexão." })
            })
    })
});

//Personal

//O "last_personal_coords" procura o documento e atualiza as coordenadas do usuario.
exports.last_personal_coords = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection("personal").doc(arquivo.id)
            .update({
                coords: {
                    Latitude: arquivo.latitude,
                    Longitude: arquivo.longitude
                }
            })
            .then(() => { return response.json({ "pronto": "pronto" }); })
            .catch(err => {
                return response.json({ "erro:": err })
            });
    });
});

//O "last_personal_access" procura o documento e atualiza as o ultimo acesso do usuario.
exports.last_personal_access = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {

        let arquivo = request.body;

        await db.collection("personal").doc(arquivo.id)
            .update({
                ultimo_acesso: arquivo.visto_por_ultimo
            })
            .then(() => {
                return response.json({ "pronto": "pronto" });
            })
            .catch(err => {
                return response.json({ "erro:": err });
            });
    })
})

//Client

//O "fetch_personals" pega todos os usuarios que tem o ultimo acesso no mínimo de 1 minuto antes da hora atual.
exports.fetch_personals = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        //Verifica se o cliente existe.
        cliente = await db.collection("cliente").doc(arquivo.id).get()
        .then(snapshot => {
            if(snapshot.empty){
                return {"erro":"cliente não encontrado."};
            }
        })
        .catch(err => {
            return response.json({ "erro:": err });
        });

        //Se ouver algo na variável "cliente" quer dizer que deu algo erro e será retornado.
        if(cliente){
            return response.json(cliente);
        }

        //Procura os personals.
        await db.collection("personal")
            
            //Onde o ultimo acesso tiver um index igual ao index "0" do "arquivo.ultimo_acesso[0]" (dia, mês e ano)
            .where('ultimo_acesso', 'array-contains', arquivo.ultimo_acesso[0])
            
            //Pegar esses dados achados.
            .get()
            .then(snapshot => {

                //Se for vazio retorna uma resposta em forma de json com a mensagem "vazio".
                if (snapshot.empty) {
                    return response.json({ "vazio": "vazio" });
                }

                //O array "disponiveis" vai pegar os personals identificados.
                var disponiveis = [];

                snapshot.forEach((doc) => {

                    //Se a hora do ultimo acesso do personal for igual do cliente, então continua, senão pula essa.
                    if (doc.data().ultimo_acesso[1].hora == arquivo.ultimo_acesso[1].hora) {

                        //Se o minuto do ultimo acesso do personal for maior do que a do cliente continua, senão pula.
                        //Obs: diminuiu um minuto do cliente para poder pegar aqueles personais que estiveram o ultimo acesso no mínimo 1 minuto antes da hora atual do cliente.
                        if (doc.data().ultimo_acesso[1].min >= arquivo.ultimo_acesso[1].min - 1) {

                            //Se ocorrer tudo bem, os dados do personal serão adicionados no "disponiveis".
                            disponiveis = [...disponiveis, [doc.id, doc.data()]];
                        }
                    }
                });

                //Se o "disponiveis" for vazio, retorna uma resposta em json com uma mensagem "vazio". 
                if (!disponiveis) {
                    return response.json({ "vazio": "vazio2" });
                }

                //Se ocorrer tudo bem, retorna a resposta em json com os personais achados.
                return response.json(disponiveis);
            })
            .catch(err => {
                return response.json({ "erro:": err });
            });
    })
});
