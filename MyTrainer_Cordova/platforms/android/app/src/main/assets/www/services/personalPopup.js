
//Adicionar uma caixa de informações do personal ao clicar. 
//map.on('ação','id da camada', function).
function personalPopup(map){

    //Se for clicado em um dos pontos da camada com o id "points", 
    //as informações que foi colocado nesse ponto, ou seja, o personal especifico,
    //vai ser passado para a variável "e". 
    return map.on('click', 'points', (e) => {
        // console.log(e);

        //Acessando as propriedades do ponto e colocando em variáveis.
        const avatar = e.features[0].properties.avatar
        const nome = e.features[0].properties.nome
        const idade = e.features[0].properties.idade
        const tipo_de_treino = e.features[0].properties.tipo_de_treino
        const bio = e.features[0].properties.bio
        const coordinates = e.features[0].geometry.coordinates.slice();

        //Usa a classe "mapboxgl.Popup()" para adicionar uma caixa de informações animada na sobre o mapa.
        new mapboxgl.Popup()

            //O ".setLngLat([longitude, latitude])" indica onde o popup será colocado.
            .setLngLat(coordinates)

            //O ".setHTML(string)" cria a estrutura do popup em html.
            .setHTML(
                "<div id=principal>" +
                "<header>" +
                "<img id=avatar src=" + avatar + " />" +
                "<div id=user-info>" +
                "<strong id=nome>" + nome + "</strong>" +
                "<span>" + tipo_de_treino + "</span>" +
                "</div>" +
                "</header>" +
                "<p>" + bio + "</p>" +
                "<a href='#'>Acessar Perfil</a>" +
                "</div>")
            
            //O ".addTo(map)" adiciona os recursos no mapa.
            .addTo(map);
    })
}
