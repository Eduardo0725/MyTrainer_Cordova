//Faz a formatação do geojson.
function Geojson(coords) {
    
    //A variável "dataGeojson" vai pegar as informações formatadas.
    dataGeojson = [];
    console.log("coords => " + coords)
    
    coords.forEach(array => {
        dataGeojson = [
            ...dataGeojson,
            {
                'type': 'Feature',
                'properties': {
                    'avatar': array[1]['foto'],
                    'nome': `${array[1]['nome']} ${array[1]['sobrenome']}`,
                    'idade': '18',
                    'tipo_de_treino': 'musculação',
                    'bio': (array[1]['bio']) ? array[1]['bio'] : " ",
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [array[1].coords.Longitude, array[1].coords.Latitude]
                }
            },
        ]
    });
    // console.log(dataGeojson)
    return dataGeojson;
}