class Source {
    parseGeojson(coords) {
        console.dir(coords);
        let dataGeojson = [];

        if (!coords) return [
            {
                'type': 'Feature',
                'properties': {
                    'id': 'FSExSSuNSSuyMQuSEn6f',
                    'avatar': 'https://avatars2.githubusercontent.com/u/55118089?s=400&u=0d40d3d53ca2f77750eda9926625f9e2b8a72df3&v=4',
                    'nome': `Eduardo Andrade Carvalho`,
                    'idade': 25,
                    'tipo_de_treino': 'musculação',
                    'celular': '980793780',
                    'bio': 'Formado em Educação Física em Jun/2019 na Etec da zona Leste',
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-46.475378, -23.522910]
                }
            }
        ];

        coords.forEach(array => {

            let dateToBirth = this.convertDateBrazilToAmerican(array.doc.dateToBirth);
            dateToBirth = calculateAge(dateToBirth);

            dataGeojson = [
                ...dataGeojson,
                {
                    'type': 'Feature',
                    'properties': {
                        'id': array.id,
                        'avatar': array.doc.imageProfile,
                        'nome': `${array.doc.name} ${array.doc.surname}`,
                        'idade': dateToBirth,
                        'tipo_de_treino': 'musculação',
                        'celular': (array.doc.phone) ? array.doc.phone : "Sem número de contato",
                        'bio': (array.doc.bio) ? array.doc.bio : " ",
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [array.doc.coords.longitude, array.doc.coords.latitude]
                    }
                },
            ]
        });

        return dataGeojson;
    }

    convertDateBrazilToAmerican(dateToBirth){
        let format = dateToBirth.indexOf('/');
        format = dateToBirth.slice(format+1,format+3) + '/' + (dateToBirth.slice(0,format) + '/' + dateToBirth.slice(format+4));
        return format;
    }

    addSource(map, coords) {
        let coordsFormat = this.parseGeojson(coords);
        console.log(coordsFormat);
        return map.addSource('pointsSources', //O id da fonte.
            {
                type: 'geojson', //O tipo da fonte.
                data: { //Os dados do utilizados
                    "type": "FeatureCollection", //Tipo do dado utilizado
                    "features": coordsFormat //As informações dos dados, como, type, properties, geometry.
                }
            })
    }

    removeSource(map) {
        if (map.getSource('pointsSources'))
            return map.removeSource('pointsSources');
    }
}