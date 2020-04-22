async function sourcePersonals(map, geojson) {
    return map.addSource('pointsSources', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": geojson
        }
    })
}
