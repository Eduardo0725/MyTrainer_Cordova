function sourcePersonals(map) {
    return map.addSource('pointsSources', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features":
                Personal(),
        }
    })
}