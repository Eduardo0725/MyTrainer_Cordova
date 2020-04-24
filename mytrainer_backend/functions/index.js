const corsModule = require('cors');
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const cors = corsModule({ origin: true, methods: ['GET', 'PUT', 'POST'] });

//Ambos

exports.validate_usuario = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection(arquivo.collection).where("email", "==", arquivo.email).get()
            .then(snapshot => {

                if (snapshot.empty) {
                    return response.json({ "erro": "Esse email não existe." });
                }

                let disponiveis;
                snapshot.forEach((doc) => {
                    disponiveis = (doc.data().senha == arquivo.senha) ? {
                        "id": doc.id,
                        "email": doc.data().email
                    } : false;
                });

                return response.json(disponiveis);
            })
            .catch(() => {
                return response.json({ "erro": "Erro na conexão." });
            });
    })
});

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

//Personal

exports.create_personal = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        let result = await db.collection("personal").where("email", "==", arquivo.email).get()
            .then(doc => {
                if (!doc.empty) {
                    return { erro: "Esse email já existe." };
                }
            }).catch(err => {
                return { erro: "Erro ao cadastrar.", "err": err };
            });
        
        if(result){
            return response.json(result);
        }

        await db.collection("personal").add({
            "nome": arquivo.nome,
            "sobrenome": arquivo.sobrenome,
            "datanasc": arquivo.datanasc,
            "rg": arquivo.rg,
            "cpf": arquivo.cpf,
            "phone": arquivo.phone,
            "celular": arquivo.celular,
            "cep": arquivo.cep,
            "rua": arquivo.rua,
            "numero": arquivo.numero,
            "bairro": arquivo.bairro,
            "complemento": arquivo.complemento,
            "cidade": arquivo.cidade,
            "estado": arquivo.estado,
            "email": arquivo.email,
            "senha": arquivo.senha,
            "coords": {
                "Latitude": 0,
                "Longitude": 0,
            },
            "certificado": arquivo.certificado,
            "foto": arquivo.foto,
            "visto_por_ultimo": arquivo.visto_por_ultimo,
            "criado": `
                ${arquivo.visto_por_ultimo[0].dia}/${arquivo.visto_por_ultimo[0].mes}/${arquivo.visto_por_ultimo[0].ano} - 
                ${arquivo.visto_por_ultimo[1].hora}:${arquivo.visto_por_ultimo[1].min}:${arquivo.visto_por_ultimo[1].seg}`,
            "meus_treinos": [],
            "bio": arquivo.bio,
            "comentários": []
        })
        .then(() => { 
            return response.json({ "sucesso": "Sucesso" }) 
        })
        .catch(() => { 
            return response.json({ "erro": "Erro na conexão." }) 
        })
    })
});

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

exports.create_client = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        let result = await db.collection("cliente").where("email", "==", arquivo.email).get()
            .then(doc => {
                if (!doc.empty) {
                    return { erro: "Esse email já existe." };
                }
            }).catch(err => {
                return { erro: "Erro ao cadastrar.", "err": err };
            });
        
        if(result){
            return response.json(result);
        }

        await db.collection("cliente").add({
            "nome": arquivo.nome,
            "sobrenome": arquivo.sobrenome,
            "datanasc": arquivo.datanasc,
            "phone": arquivo.phone,
            "celular": arquivo.celular,
            "cep": arquivo.cep,
            "rua": arquivo.rua,
            "numero": arquivo.numero,
            "bairro": arquivo.bairro,
            "complemento": arquivo.complemento,
            "cidade": arquivo.cidade,
            "estado": arquivo.estado,
            "email": arquivo.email,
            "senha": arquivo.senha,
            "foto": arquivo.foto,
            "meus_treinos": [],
            "criado": `
            ${arquivo.visto_por_ultimo[0].dia}/${arquivo.visto_por_ultimo[0].mes}/${arquivo.visto_por_ultimo[0].ano} - 
            ${arquivo.visto_por_ultimo[1].hora}:${arquivo.visto_por_ultimo[1].min}:${arquivo.visto_por_ultimo[1].seg}
            `,
            "comentários": []
        })
        .then(() => { 
            return response.json({ "sucesso": "Sucesso" }) 
        })
        .catch(() => { 
            return response.json({ "erro": "Erro na conexão." }) 
        })
    })
})

exports.fetch_personals = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection("personal")
            .where('ultimo_acesso', 'array-contains', arquivo.ultimo_acesso[0])
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return response.json({ "vazio": "vazio" });
                }
                var disponiveis = [];
                snapshot.forEach((doc) => {
                    if (doc.data().ultimo_acesso[1].hora == arquivo.ultimo_acesso[1].hora) {
                        if (doc.data().ultimo_acesso[1].min >= arquivo.ultimo_acesso[1].min - 1) {
                            disponiveis = [...disponiveis, [doc.id, doc.data()]];
                        }
                    }
                });
                if (!disponiveis) {
                    return response.json({ "vazio": "vazio2" });
                }
                return response.json(disponiveis);
            })
    })
});
