//Adiciona o marcador no mapa.
function selectorMarker(map) {
    const marker = new mapboxgl.Marker();
    return (

        //Dois click para colocar um marcador no mapa.
        map.on('dblclick', (ev) => { //As informações de onde o dedo clicou é passado para a variável "ev".
            
            //A variável "c" recebe a longitude e a latitude de onde foi clicado
            var c = ev.lngLat;
            console.log(c);

            //Adiciona o marcador no mapa.
            marker.setLngLat([c.lng, c.lat]).addTo(map);
        }),

        //Um clique para tirar o marcador do mapa
        map.on('click', () => {
            marker.remove(map)
        })

    );
}