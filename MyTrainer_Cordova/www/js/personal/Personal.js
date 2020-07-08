class Personal {
    box;
    data;
    idWatchPosition;
    loading;
    local;
    map;
    myTrainerServer;
    myTrainings;
    pageDetail;
    redirect;
    sendTimeInterval;

    constructor() {
        this.myTrainerServer = new MyTrainerServer;
        this.redirect = new Redirect;
        this.local = new LocalStorage;
        this.pageDetail = new PageDetail;
        this.loading = false;
        this.map = false;
        this.myTrainings = {};
    }

    async validate() {
        let data = this.local.checkUser();
        if (!data) {
            alert("Erro nos dados, entre na conta novamente!");
            this.exit();
        }

        this.data = data;
        this.box = await this.myTrainerServer.getData(data.id, "personal");
    }

    exit() {
        if (!this.local.removeUser())
            return alert("Erro ao sair");

        this.redirect.submit('index.html');
    }

    async confirmation(idTraining, idClient, idPersonal, typeConfirmation) {
        return await this.myTrainerServer.trainingConfirmation(
            idTraining,
            idClient,
            idPersonal,
            typeConfirmation
        ).then(res => {
            switch (res.status) {
                case 'empty':
                case 500:
                case 502:
                    return alert('Erro no envio da mensagem');
            }

            this.pageRemove();
            main();
        });
    }

    async sendLastSeen() {

        if (this.loading)
            return;

        this.loading = true;

        try {
            //Enviar data e hora a cada 30 segundos
            this.sendTimeInterval = setInterval(async () => {
                let time = await this.myTrainerServer.sendLastSeen(this.data.id, this.data.tipo);
                if (!time) throw new Error("Erro no envio dos seu status!");
                console.log("Send timed");
            }, 30000);

            //Enviar posição, data e hora a cada vez que o úsuario mude de posição
            this.idWatchPosition = navigator.geolocation.watchPosition(async position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                console.log("Latitude => " + latitude + "\nLongitude => " + longitude);

                let log = await this.myTrainerServer.sendLastSeen(
                    this.data.id,
                    this.data.tipo,
                    {
                        latitude,
                        longitude
                    }
                );

                if (!log.status || log.status === 500 || log.status === 502)
                    throw new Error("Erro no envio da sua localização!");
            }, err => {
                console.log(err);
                throw new Error("Erro no envio da sua localização!")
            });

            return this.loading = false;
        } catch (e) {
            console.log(e);
            return this.loading = false;
        }
    }

    stopLastSeen() {
        clearInterval(this.sendTimeInterval);
        navigator.geolocation.clearWatch(this.idWatchPosition);
    }

    pageStart(id, type) {
        this.myTrainerServer.geocoding(this.myTrainings[id].body.local)
            .then(e => {
                this.pageDetail.start(
                    e.features[0].center,
                    this.myTrainings[id],
                    type,
                    'personal.pageRemove()');
            });
    }

    pageRemove() {
        this.pageDetail.remove();
    }
}