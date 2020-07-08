class Layers {
    layers;
    labelLayerId;

    addStylePoints(map) {
        map.addLayer({
            id: 'points', //O id da camada
            source: 'pointsSources', //O id da fonte a ser usada
            type: 'circle', //O tipo da camada
            paint: { //O estilo
                'circle-radius': 10, //Tamanho
                'circle-color': 'black' //Cor
            }
        });
        this.layers = map.getStyle().layers;
    }

    removeStylePoints(map) {
        if (map.getLayer('points'))
            return map.removeLayer('points');
    }
    searchLabelLayerId() {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].type === 'symbol' && this.layers[i].layout['text-field']) {
                this.labelLayerId = this.layers[i].id;
                break;
            }
        }
    }
    style3D(map) {
        this.searchLabelLayerId();
        return map.addLayer({ //https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
                'fill-extrusion-color': '#ffffff',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    "interpolate", ["linear"],
                    ["zoom"],
                    15, 0,
                    15.05, ["get", "height"]
                ],
                'fill-extrusion-base': [
                    "interpolate", ["linear"],
                    ["zoom"],
                    15, 0,
                    15.05, ["get", "min_height"]
                ],
                'fill-extrusion-opacity': .6
            }
        }, this.labelLayerId);
    }
}