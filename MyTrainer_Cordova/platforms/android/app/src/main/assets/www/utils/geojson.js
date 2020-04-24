function Geojson(coords) {
    coordenada = [];
    console.log("coords => " + coords)
    coords.forEach(array => {
        coordenada = [
            ...coordenada,
            {
                'type': 'Feature',
                'properties': {
                    'avatar': array[1]['foto'],
                    'nome': array[1]['nome'],
                    'idade': '18',
                    'tipo_de_treino': 'musculação',
                    'bio': 'Professor de Educação Física, com pós-graduação em condicionamento físico para grupos especiais e reabilitação cardíaca. ... Depois de formado e com especialização em condicionamento físico para grupos especiais e reabilitação cardíaca, em 2008 trabalhou com aulas particulares e projetos específicos.',
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [array[1].coords.Longitude, array[1].coords.Latitude]
                }
            },
        ]
    });
    // console.log(coordenada)
    return coordenada;
}