class MapBox {
    map;
    controller;
    source;
    layers;
    marker;
    status;
    updateInterval;
    constructor(container, center = [-46.475378, -23.522910]) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1YXJkb2FjNyIsImEiOiJjazNwNXRqYmMyOGw4M21vM3BmdHl3Z3NzIn0.XAq35G0W92TM-gHFt3W_Bg'; //https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken
        this.map = new mapboxgl.Map({
            container: container,
            style: 'mapbox://styles/eduardoac7/ck6iedaqh00yo1ip72es3ajl6', //'mapbox://styles/eduardoac7/ck3s55wg10f4d1cqwpjxp1xar'(mapa escuro)
            center,
            zoom: 17,
            pitch: 45, //Inclinção do mapa, padrão: 0.
            bearing: -17.6, //Rotação do mapa, padrão: 0.
            antialias: false,
            hash: false, //Para sincronizar a posição do mapa (zoom, center latitude, center longitude, bearing, and pitch) com a URL da página
        });

        this.controller = new Controller;
        this.source = new Source;
        this.layers = new Layers;
        this.marker = new Marker;
        this.status = false;
    }

    async start(coords = []) {
        try {
            this.map.on('load', () => {
                this.controller.geolocateMap(this.map);
                this.controller.navigatorMap(this.map);

                this.source.addSource(this.map, coords.docs);

                this.layers.addStylePoints(this.map);

                this.marker.selectorMarker(this.map);

                this.map.doubleClickZoom.disable();

                // this.setIntervalUpdate();
            });

            return this.status = true;
        } catch (e) {
            console.log(e);
            return this.status = false;
        }

    }

    update(coords = false) {
        //remove
        this.layers.removeStylePoints(this.map);
        this.source.removeSource(this.map);

        //add
        this.source.addSource(this.map, coords);
        this.layers.addStylePoints(this.map);
    }

    // setIntervalUpdate(interval = 10000) {
    //     let i = 0;
    //     this.updateInterval = setInterval(async () => {
    //         let myTrainerServer = new MyTrainerServer;
    //         let coordsUpdate = await myTrainerServer.searchPersonals();
    //         console.dir(coordsUpdate);
    //         this.update(coordsUpdate.docs);

    //         console.log(i += 1);
    //     }, interval);
    // }

    // stop() {
    //     try {
    //         clearInterval(this.updateInterval);
    //         this.status = false;
    //         return true;
    //     } catch (e) {
    //         console.log(e);
    //         this.status = true;
    //         return false;
    //     }
    // }

    flyTo([lng, lat]){
        this.map.flyTo({
            center: [lng, lat],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    }
}