var propertyToAggregate = "total_aptos" //Propriedade a ser utilizada para gerar os pontos a serem clusterizados em nosso aquivo GeoJSON. Precisa ser uma variável do tipo NUMÉRICO.
let data_url = "https://gist.githubusercontent.com/harllos/022379b54666103b8f842a18f71bb88a/raw/7442f4648c9f8f9371f21a79593265f9503279a6/locais_2018_mp_clean.geojson";

function init() {
    
    testeFuncao();


    //console.log(teste);

    mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1YXJkb2FjNyIsImEiOiJjazNwNXRqYmMyOGw4M21vM3BmdHl3Z3NzIn0.XAq35G0W92TM-gHFt3W_Bg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/eduardoac7/ck3s55wg10f4d1cqwpjxp1xar', //os estilos são definidos na pagina https://studio.mapbox.com/ é só copiar o link do estilo que vc criou lá      
        center: [-46.475378, -23.522910], //escolha uma latitude/longitude inicial para seu mapa //coloquei o endereço da Aguia de Haia (-23.522910, -46.475378), mas caiu no meio do nada, então inverti os numeros
        zoom: 17, //escolha um zoom inicial
        pitch: 45,
        bearing: -17.6,
        antialias: true,
        hash: true, //https://pt.wikipedia.org/wiki/SHA-2
    });
    
    map.on('load', () => { //https://docs.mapbox.com/mapbox-gl-js/api/#map#on
        //
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }
        //
        map.addSource('pointsSources', { //https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
            type: 'geojson',
            data: {
                "type": "FeatureCollection",
                "features": 
                    Personal(),
                
            }
        })
console.log(Personal());
        map.addLayer({ //função para estilos dos pontos //https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer
            id: 'points',
            source: 'pointsSources',
            type: 'circle',
            paint: {
                'circle-radius': 10,
                'circle-color': 'white'

            }

        });
        map.addLayer({ //função para deixar o mapa em 3D //https://docs.mapbox.com/mapbox-gl-js/example/3d-buildings/
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
        }, labelLayerId);


    });
}

