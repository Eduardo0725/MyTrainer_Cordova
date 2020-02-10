function Personal(){
    return coordenada = [
    {"type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Point",
        "coordinates": [
            -46.475257873535156,
            -23.52296226550107
        ]
    }},
    {"type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Point",
        "coordinates": [
            -46.4630012,
            -23.5220342
        ]
    }},
    ]}

//esse é um teste de comunicação
async function testeFuncao(){
    teste = await axios.get('https://api.github.com/users/Eduardo0725')
    console.log(teste);
    return teste;
}
