//Adiciona uma pagina com as informações do personal.
//map.on('ação','id da camada', function).
function pageDetail(map){

    //Se for clicado em um dos pontos da camada com o id "points", 
    //as informações que foi colocado nesse ponto, ou seja, o personal especifico,
    //vai ser passado para a variável "e". 
    return map.on('click', 'points', (e) => {
        console.log(e.features);

        //Acessando as propriedades do ponto e colocando em variáveis.
        const avatar = e.features[0].properties.avatar
        const nome = e.features[0].properties.nome
        const idade = e.features[0].properties.idade
        const tipo_de_treino = e.features[0].properties.tipo_de_treino
        const bio = e.features[0].properties.bio

        //Adicionando o no "style" o "z-index: 2;" para sobrepor o mapa.
        document.querySelector('#principal').setAttribute('style','z-index: 2;')

        //Criando estrutura da pagina e adicionando.
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

//A função "remove_child()" remove pagina de informações do personal e tira o style.
function remove_child(){
    if(document.getElementById('pagina')){
        var pagina = document.getElementById('pagina');
        var principal = document.getElementById('principal');
        principal.removeAttribute('style');
        principal.removeChild(pagina);
    }
}