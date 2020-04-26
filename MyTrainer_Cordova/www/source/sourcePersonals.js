//adiciona a fonte de coordenadas dos personals.
async function sourcePersonals(map, geojson) {
    return map.addSource('pointsSources', //O id da fonte.
    { 
        type: 'geojson', //O tipo da fonte.
        data: { //Os dados do utilizados
            "type": "FeatureCollection", //Tipo do dado utilizado
            "features": geojson //As informações dos dados, como, type, properties, geometry.
        }
    })
}
