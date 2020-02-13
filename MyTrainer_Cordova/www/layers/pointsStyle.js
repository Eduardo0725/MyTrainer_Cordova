function pointsStyle(layers, map) {
    return map.addLayer({
        id: 'points',
        source: 'pointsSources',
        type: 'circle',
        paint: {
            'circle-radius': 20,
            'circle-color': 'black'
        }
    });
}