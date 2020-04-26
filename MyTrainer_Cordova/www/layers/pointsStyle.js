function pointsStyle(layers, map) {
    return map.addLayer({
        id: 'points', //O id da camada
        source: 'pointsSources', //O id da fonte a ser usada
        type: 'circle', //O tipo da camada
        paint: { //O estilo
            'circle-radius': 10, //Tamanho
            'circle-color': 'black' //Cor
        }
    });
}