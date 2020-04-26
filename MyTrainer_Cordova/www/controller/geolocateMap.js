//Ativa o botão de geolocalização no mapa na parte superior do lado direito.
async function geolocateMap(map){
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true, //Se "true" deixa a localização mais precisa e gasta mais energia, se "false" deixa menos precisa e economiza bateria.
        },
        trackUserLocation: true, //Se for "false" a posição se atualizará a cada clique do botão, se "true" ao clicar o botão só uma vez a posição se atualizará automaticamente toda vez que o usuario se mover.
    }));
}
