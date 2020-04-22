/* 
function personalPopup(map){
    return map.on('click', 'points', (e) => {
        // console.log(e);
        const avatar = e.features[0].properties.avatar
        const nome = e.features[0].properties.nome
        const idade = e.features[0].properties.idade
        const tipo_de_treino = e.features[0].properties.tipo_de_treino
        const bio = e.features[0].properties.bio
        const coordinates = e.features[0].geometry.coordinates.slice();

        new mapboxgl.Popup()
            .setLngLat(coordinates)
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
            .addTo(map);
    })
}
 */

function personalPopup(map){
    return map.on('click', 'points', (e) => {
        console.log(e.features);

        const avatar = e.features[0].properties.avatar
        const nome = e.features[0].properties.nome
        const idade = e.features[0].properties.idade
        const tipo_de_treino = e.features[0].properties.tipo_de_treino
        const bio = e.features[0].properties.bio

        document.querySelector('#principal').setAttribute('style','z-index: 2;')
        document.querySelector('#principal').innerHTML = `<div id='pagina'>
                <header> 
                <img id=avatar src=  ${avatar}   /> 
                <div id=user-info> 
                <strong>  ${nome}  </strong> 
                <span>  ${tipo_de_treino}  </span> 
                </div> 
                </header> 
                <p>  ${bio}  </p> 
                <button type='button' onclick="remove_child()">Voltar</button>
                </div>`;
    })
}

function remove_child(){
    if(document.getElementById('pagina')){
        var pagina = document.getElementById('pagina');
        var principal = document.getElementById('principal');
        principal.removeAttribute('style');
        principal.removeChild(pagina);
    }
}