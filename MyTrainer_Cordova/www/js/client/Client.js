class Client {
    box;
    data;
    loading;
    local;
    map1;
    map2;
    myTrainerServer;
    myTrainings;
    pageDetail;
    redirect;
    updateInterval
    constructor() {
        this.myTrainerServer = new MyTrainerServer;
        this.redirect = new Redirect;
        this.local = new LocalStorage;
        this.map1 = false;
        this.map2 = false;
        this.myTrainings = {};
    }
    
    async start(container) {
        let coords = await this.myTrainerServer.searchPersonals();
        this.pageDetail = new PageDetail;
        this.map1 = new MapBox(container);
        this.map1.start((coords.status === 200) ? coords.docs : undefined);
        document.querySelector('a#btnSearch').addEventListener('click',
            async () => await searchLocation()
        );
        this.map1.map.on('click', 'points', (e) => {
            this.startPage(e.features[0].properties);
        });
    }

    async validate() {
        let data = this.local.checkUser();
        if (!data) {
            alert("Erro nos dados, entre na conta novamente!");
            this.exit();
        }

        this.data = data;
        this.box = await this.myTrainerServer.getData(data.id, "client");
    }

    exit() {
        if (!this.local.removeUser())
            return alert("Erro ao sair");

        this.redirect.submit('index.html');
    }

    async searchLocation() {
        let value = document.querySelector('input#search').value;
        console.log(value);

        let lngLat = await this.myTrainerServer.geocoding(value).then(res => res.features[0].center);
        console.log(lngLat);

        (map2) ? map2.flyTo(lngLat) : map.flyTo(lngLat);
    }

    async createTraining(idPersonal) {
        try {
            if (this.loading) return;
            this.loading = true;

            await this.myTrainerServer.sendTraining(this.data.id, idPersonal, {
                horario: document.querySelector('input#horario').value,
                data: document.querySelector('input#data').value,
                local: document.querySelector('input#hidden').value
            }).then(res => {
                if (res.status !== 200) return;
                console.log(res);

                alert('Solicitação enviada com sucesso!');
                document.querySelector('div.bar a').click();
            });
        } finally {
            return this.loading = false;
        }
    }

    setIntervalUpdate(interval = 10000) {
        let i = 0;
        this.updateInterval = setInterval(async () => {
            let coords = await this.myTrainerServer.searchPersonals();
            this.map1.update(coords.docs);

            console.dir(coords);
            console.log(i += 1);
        }, interval);
    }

    stopMap() {
        try {
            clearInterval(this.updateInterval);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    startPage(properties) {
        this.pageDetail.start(properties, 'client.removePage()', 'client.startPageTwo');
    }

    removePage() {
        this.pageDetail.remove();
        this.setIntervalUpdate();
    }

    startPageTwo(id, clickRestore) {
        let container = 'mapMarkLocation';
        this.stopMap();
        this.pageDetail.startPageTwo(
            container,
            `client.removePageTwo('${container}', '${clickRestore}')`,
            'client.createTraining',
            id
        );

        this.map2 = new MapBox(container);

        this.map2.map.on('load', e => {
            this.map2.map.doubleClickZoom.disable();
            this.map2.controller.geolocateMap(this.map2.map);
            this.map2.controller.navigatorMap(this.map2.map);
            console.log(e);
        });

        this.map2.map.on('click', async e => {
            console.log(e.lngLat);
            let logMap = await this.myTrainerServer.geocoding([e.lngLat.lng, e.lngLat.lat]);
            console.log(logMap);
            console.log(logMap.features[0].place_name);

            new mapboxgl.Popup()
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .setHTML(`Local definido: ${logMap.features[0].place_name}`)
                .addTo(this.map2.map);

            document.querySelector('input#search').value = logMap.features[0].place_name;
            document.querySelector('input#hidden').value = logMap.features[0].place_name;
        });
    }

    removePageTwo(container, clickRestore) {
        this.pageDetail.removePageTwo(container, clickRestore);
        this.map2 = false;
    }
}