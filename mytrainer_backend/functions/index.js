const corsModule = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const MyTrainer = require('./MyTrainer');

admin.initializeApp();

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const corsGet = corsModule({
    origin: true,
    methods: ['GET']
});
const corsPost = corsModule({
    origin: true,
    methods: ['POST']
});
const corsPut = corsModule({
    origin: true,
    methods: ['PUT']
});
const corsDelete = corsModule({
    origin: true,
    methods: ['DELETE']
});

//Users

exports.create_user = functions.https.onRequest((request, response) => {
    corsPost(request, response, async () => {

        let file = request.body;
        let myTrainerClass = MyTrainer;

        let docs = await myTrainerClass.getUserEmail(db, file.typeUser, file.doc.email);

        let res;
        switch (docs.status) {
            // Criar
            case "empty":
                res = await myTrainerClass.createUser(db, file.typeUser, file.doc);

                if (res.status == "err")
                    return response.json(res);

                res = {
                    status: 200,
                    doc: res
                }
                break;

            // Interrompe, já existe.
            case "ok":
                res = { status: false };
                break;

            // Interrompe, erro 502.
            case "err":
                res = { status: 502 };
                break;

            // Interrompe, erro 500.
            default:
                res = { status: 500 };
        }
        return response.json(res);
    })
});

exports.validate_user = functions.https.onRequest((request, response) => {
    corsPost(request, response, async () => {

        let file = request.body;
        let myTrainerClass = MyTrainer;

        let user = await myTrainerClass.getUserEmail(db, file.collection, file.email, true);

        let res;
        switch (user.status) {
            // Se existir, verifica a senha.
            case "ok":
                if (file.password === user.docs.doc.password) {
                    res = {
                        status: 200,
                        docs: user.docs
                    }
                } else {
                    res = { status: false }
                }
                break;

            // Se não existir retorna false.
            case "empty":
                res = { status: false }
                break;

            case "err":
                res = { status: 502 }
                break;

            default:
                res = { status: 500 };
        }

        return response.json(res);
    })
});

exports.get_data = functions.https.onRequest((request, response) => {
    corsPost(request, response, async () => {
        let file = request.body;
        let myTrainerClass = MyTrainer;

        let user = await myTrainerClass.getUserId(db, file.collection, file.id, true);

        let res;
        switch (user.status) {
            // Se existir, verifica a senha.
            case "ok":
                res = {
                    status: 200,
                    doc: user.docs
                }
                break;

            // Se não existir retorna false.
            case "empty":
                res = { status: false }
                break;

            case "err":
                res = { status: 502 }
                break;

            default:
                res = { status: 500 };
        }

        return response.json(res);
    });
});

//Personal

exports.user_last_seen = functions.https.onRequest((request, response) => {
    corsPut(request, response, async () => {
        let file = request.body;
        let myTrainerClass = MyTrainer;

        let docs = await myTrainerClass.userLastSeen(db, file.collection, file.id, file.lastSeen, file.coords);

        let res;
        switch (docs.status) {
            case "ok":
                res = { status: 200 }
                break;

            case "empty":
                res = { status: false }
                break;

            case "err":
                res = { status: 502 }
                break;

            default:
                res = { status: 500 };
        }

        return response.json(res);
    });
});

exports.training_confirmation = functions.https.onRequest((request, response) => {
    corsPost(request, response, async () => {
        let file = request.body;
        let myTrainerClass = MyTrainer;

        return await myTrainerClass.getUserId(db, "personal", file.idPersonal, true)
        .then(async res => {
            if(!res) return response.json({status: 500});
            let meus_treinos = res.docs.meus_treinos;
            let idMeus_treinos = meus_treinos.findIndex(a => a.id == file.idTraining);

            meus_treinos[idMeus_treinos].status = file.confirmation;

            await myTrainerClass.update(db, "personal", file.idPersonal, {meus_treinos});
            let log = await myTrainerClass.update(db, "client", file.idClient, {meus_treinos});
            return response.json(log);
        });  
    });
});

//Client

exports.fetch_personal_trainers = functions.https.onRequest((request, response) => {
    corsPost(request, response, async () => {
        let file = request.body;
        let myTrainerClass = MyTrainer;

        let docs = await myTrainerClass.searchPersonals(db, file.lastSeen);
        if (!docs)
            return response.json({ status: 500 });

        console.log(docs.status);
        let res;
        switch (docs.status) {
            case "ok":
                res = {
                    status: 200,
                    docs: docs.doc
                }
                break;

            case "empty":
                res = { status: false }
                break;

            case "err":
                console.log(docs.err);
                res = { status: 502 }
                break;

            default:
                res = { status: 500 };
        }

        return response.json(res);
    });
});

exports.create_training = functions.https.onRequest((request, response) => {
    corsPost(request, response, async () => {
        const file = request.body;
        let myTrainerClass = MyTrainer;

        let client = await myTrainerClass.getUserId(db, "client", file.idClient, true);

        let nameClient = client.docs.name + ' ' + client.docs.surname;

        return await myTrainerClass.createTraining(
            db,
            nameClient,
            file.idClient,
            file.idPersonal,
            file.body,
            file.sendDate
        ).then(res => {
            switch (res.status) {
                case "ok":
                    return response.json({ status: 200 });

                case "empty":
                    return response.json({ status: false });

                case "err":
                    return response.json({ status: 502 });

                default:
                    return response.json({ status: 500 });
            }
        });
    });
});
