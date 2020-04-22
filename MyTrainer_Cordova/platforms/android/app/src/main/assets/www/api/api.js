async function validate(email, collection){
    return await db.collection(collection).where("email","==",email).get()
    .then(snapshot => {
        if(snapshot.empty){
            return false
        }
        var disponiveis;
        snapshot.forEach((doc) => {
            disponiveis = [doc.id, doc.data()];
        })
        return disponiveis;
    });
}

async function Personals() {
    let httpHeaders = { 'Content-Type' : 'application/json', 'Accept-Charset' : 'utf-8' };
    let myHeaders = new Headers(httpHeaders);

    data = new Date;
    let visto_por_ultimo = [
        {
            dia: data.getDate(),
            mes: data.getMonth() + 1,
            ano: data.getFullYear()
        },
        {
            hora: data.getHours(),
            min: data.getMinutes(),
        }
    ];

    let personals = await fetch('https://us-central1-pw3-pam2-bd3-01.cloudfunctions.net/fetch_personals', {
        method: 'POST',
        body: JSON.stringify({ 
            id: cliente[0],
            ultimo_acesso: visto_por_ultimo
        }),
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    }).then(response => {
        return response.json();
    }).then(response => {
        console.log(response);
        return response;
    })

    return personals;
}

function Geojson(coords) {
    coordenada = [];
    console.log("coords => "+coords)
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