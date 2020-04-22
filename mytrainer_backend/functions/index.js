const corsModule = require('cors');
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const cors = corsModule({ origin: true, methods: ['GET', 'PUT', 'POST'] });

//Personal

exports.create_personal = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection("personal").doc(arquivo.email).get()
            .then((doc) => {
                if (doc.exists) {
                    return response.json({ erro: "Esse email existe." });
                }
            }).catch((err) => {
                return response.json({ "erro": "<h1>Erro ao cadastrar.</h1>", "err": err });
            });

        await db.collection("personal").doc(arquivo.email).set({
            "nome completo": arquivo.nome,
            "idade": arquivo.idade,
            "email": arquivo.email,
            "senha": arquivo.senha,
            "tipo": arquivo.tipo,
            "estado": true,
            "coords": {
                "Latitude": arquivo.Latitude,
                "Longitude": arquivo.Longitude
            }
        })
            .then(() => { return response.json({ "sucesso": "sucesso" }) })
            .catch(() => { return response.json({ "erro": "erro" }) })
    })
});

exports.validate_personal = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection("personal").doc(arquivo.email).get()
            .then(doc => {
                if (!doc.exists) {
                    return response.json({ erro: "Esse email não existe." });
                } else if (arquivo.senha != doc.data().senha) {
                    return response.json({ erro: "Senha incorreta." });
                }
                return response.json(doc.data());
            })
            .catch(err => {
                return response.json({ erro: `<h1>Erro ao validar, erro: ${err}</h1>` });
            })
    })
});

exports.last_personal_coords = functions.https.onRequest((request, response) => {
    cors(request, response, async() => {
        let arquivo = request.body;

        await db.collection("personal").doc(arquivo.id)
            .update({ coords: {
                Latitude : arquivo.latitude,
                Longitude : arquivo.longitude
            } })
            .then(() => { return response.json({ "pronto": "pronto" }); })
            .catch(err => { return response.json({ "erro:": err })
        });
    });
});

exports.last_personal_access = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {

        let arquivo = request.body;

        await db.collection("personal").doc(arquivo.id)
            .update({ ultimo_acesso: arquivo.visto_por_ultimo })
            .then(() => { return response.json({ "pronto": "pronto" }); })
            .catch(err => { return response.json({ "erro:": err });
        });
    })
})

// exports.last_personal_access = functions.https.onRequest((request, response) => {
//     cors(request, response, async()=>{

//         let arquivo = request.body;

//         let data = new Date;

//         personal = db.collection("personal").doc(arquivo.id)

//         await personal.get().then(doc => {
//             let estado = doc.data().estado;

//             if(estado == true){
//                 let visto_por_ultimo = [
//                     {
//                         dia  : data.getDate(),
//                         mes  : data.getMonth(),
//                         ano  : data.getFullYear()
//                     },
//                     {
//                         hora : data.getHours(),
//                         min  : data.getMinutes(),
//                         seg  : data.getSeconds(),
//                     }
//                 ]

//                 personal.update({ ultimo_acesso: visto_por_ultimo })

//                 return response.json({"pronto":"pronto"});
//             }

//             validar(personal);
//         }).catch(err => {return response.json({"erro:":err})})
//         return response.json({"pronto2":"pronto2"});
//     })
// })

// async function validar(personal){

//     let data = new Date;
//     let seg = 0;

//     for(estado = true; estado == true;){

//         setTimeout(()=>{

//             /*await*/ personal.get().then(doc =>{
//                 let acesso = doc.data().ultimo_acesso[1].seg;

//                 if(acesso >= seg){
//                     estado = true;
//                 }else{
//                     estado = false;
//                 }
//             })

//         },100000);

//         seg = data.getSeconds();
//     }

//     personal.update({
//         estado : false
//     });
// }

//Client

exports.create_client = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection("cliente").doc(arquivo.email).get()
            .then((doc) => {
                if (doc.exists) {
                    return response.json({ erro: "Esse email existe." });
                }
            }).catch((err) => {
                return response.json({ "erro": "<h1>Erro ao cadastrar.</h1>", "err": err });
            });

        await db.collection("cliente").doc(arquivo.email).set({
            "nome completo": arquivo.nome,
            "idade": arquivo.idade,
            "email": arquivo.email,
            "senha": arquivo.senha
        }).then(() => {
            return response.json({ "aviso": "<h1>Cadastro com sucesso!</h1>" });
        }).catch(() => {
            return response.json({ "erro": "<h1>Erro ao cadastrar.</h1>", "err": err });
        });
    })
})

exports.validate_client = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection("cliente").doc(arquivo.email).get()
            .then(doc => {
                if (!doc.exists) {
                    return response.json({ erro: "Esse email não existe." });
                } else if (arquivo.senha != doc.data().senha) {
                    return response.json({ erro: "Senha incorreta." });
                }
                return response.json(doc.data());
            })
            .catch(err => {
                return response.json({ erro: `<h1>Erro ao validar, erro: ${err}</h1>` });
            })
    })
});

exports.fetch_personals = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let arquivo = request.body;

        await db.collection("personal")
        .where('ultimo_acesso', 'array-contains', arquivo.ultimo_acesso[0])
        // .where('ultimo_acesso', '==', arquivo.ultimo_acesso[1].hora)
        // .where('ultimo_acesso', '>=', arquivo.ultimo_acesso[1].min)
        .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return response.json({ "vazio": "vazio" });
                }
                var disponiveis = [];
                snapshot.forEach((doc) => {
                    if(doc.data().ultimo_acesso[1].hora == arquivo.ultimo_acesso[1].hora){
                        if(doc.data().ultimo_acesso[1].min >= arquivo.ultimo_acesso[1].min - 1){
                            disponiveis = [...disponiveis, [doc.id, doc.data()]];
                        }
                    }
                });
                if(!disponiveis){
                    return response.json({ "vazio": "vazio2" });
                }
                return response.json(disponiveis);
            })
    })
});

// exports.fetch_personals = functions.https.onRequest((request, response) => {
//     cors(request, response, async () => {
//         await db.collection("personal").where('estado', '=', true).get()
//             .then(snapshot => {
//                 if (snapshot.empty) {
//                     return response.json({ "erro": "erro" });
//                 }
//                 var disponiveis = [];
//                 snapshot.forEach((doc) => {
//                     disponiveis = [...disponiveis, [doc.id, doc.data()]]
//                 });
//                 return response.json(disponiveis);
//             })
//     })
// });
