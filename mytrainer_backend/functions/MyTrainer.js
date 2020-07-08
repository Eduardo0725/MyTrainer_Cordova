class MyTrainer {
    async getUserEmail(db, collection, email, returnData = false) {
        return await db.collection(collection).where("email", "==", email).get()
            .then(snapshot => {
                if (snapshot.empty)
                    return { status: "empty" };


                if (!returnData)
                    return { status: "ok" };

                let user;
                snapshot.forEach((doc) => {
                    user = {
                        id: doc.id,
                        doc: doc.data(),
                    };
                });

                return {
                    status: "ok",
                    docs: user
                };
            })
            .catch(err => {
                return {
                    status: "err",
                    err: "Erro na conexão: " + err
                }
            }
            );
    }

    async getUserId(db, collection, id, returnData = false) {
        return await db.collection(collection).doc(id).get()
            .then(snapshot => {
                if (snapshot.empty)
                    return { status: "empty" };


                if (!returnData)
                    return {
                        status: "ok"
                    };

                return {
                    status: "ok",
                    id: snapshot.id,
                    docs: snapshot.data()
                };
            })
            .catch(err => {
                return {
                    status: "err",
                    err: "Erro na conexão: " + err
                }
            }
            );
    }

    async createUser(db, collection, doc) {
        return await db.collection(collection).add(doc)
            .then(res => {
                return {
                    status: "ok",
                    log: res
                }
            }
            )
            .catch(err => {
                return {
                    status: "err",
                    err: "Erro na conexão: " + err
                }
            }
            );
    }

    async userLastSeen(db, collection, id, lastSeen, coords) {
        let obj;
        if (!coords) {
            obj = {
                lastSeen: lastSeen
            }
        } else {
            obj = {
                lastSeen: lastSeen,
                coords: coords
            }
        }

        return await db.collection(collection).doc(id).update(obj)
        .then(res => {
            return {
                status: "ok",
                log: res
            }
        })
        .catch(err => {
            return {
                status: "err",
                err: "Erro na conexão: " + err
            }
        });
    }

    async searchPersonals(db, lastSeen) {
        let hour = (lastSeen.hourMinuteSecond.minute == 0) ? lastSeen.hourMinuteSecond.hour - 1 : lastSeen.hourMinuteSecond.hour;
        let minute = (lastSeen.hourMinuteSecond.minute == 0) ? 59 : lastSeen.hourMinuteSecond.minute - 1;

        return await db.collection("personal")
            .where('lastSeen.dayMonthYear', '==', lastSeen.dayMonthYear)
            // .where('lastSeen.hourMinuteSecond.hour', '==', hour)
            // .where('lastSeen.hourMinuteSecond.minute', '>=', minute)
            .get()
            .then(snapshot => {
                if (snapshot.empty)
                    return { status: "empty" };

                let docs = [];
                snapshot.forEach(doc => {
                    docs = [...docs, {
                        id: doc.id,
                        doc: doc.data()
                    }];
                })

                return {
                    status: "ok",
                    doc: docs
                }
            })
            .catch(err => {
                return {
                    status: "err",
                    err: "Erro na conexão: " + err
                }
            })
    }

    async createTraining(db, nameClient, idClient, idPersonal, body, sendDate) {
        let personal = await this.getUserId(db, "personal", idPersonal, true);
        
        if(!personal || personal.status === "err")
            return { status: "err" };

        if(personal.status === "empty")
            return { status: "empty" };
        
        let namePersonal = `${personal.docs.name} ${personal.docs.surname}`
        let meus_treinos = personal.docs.meus_treinos;

        meus_treinos.push({
            id: idPersonal + idClient + (Math.random() * 1000).toFixed(),
            status: 'pending',
            idClient,
            nameClient,
            idPersonal,
            namePersonal,
            body,
            sendDate
        });

        await this.update(db, "personal", idPersonal, {meus_treinos});
        return await this.update(db, "client", idClient, {meus_treinos});
    }

    async update(db, collection, id, body) {
        return await db.collection(collection).doc(id).update(body)
        .then(res => {
            return {
                status: "ok",
                log: res
            }
        })
        .catch(err => {
            return {
                status: "err",
                err: "Erro na conexão: " + err
            }
        });
    }
}

module.exports = new MyTrainer;