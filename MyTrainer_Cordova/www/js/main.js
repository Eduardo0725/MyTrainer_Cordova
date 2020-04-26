async function init() {

    //Verifica se os dados do usuario estão armazenados no dispositivo, 
    //se tiver começa a buscar o resto das informações do usuário no banco de dados,
    //senão vai iniciar a função "sair()".
    if(localStorage.getItem("usuario_email") && localStorage.getItem("usuario_id")){
        id = localStorage.getItem("usuario_id");
        let email = localStorage.getItem("usuario_email");
        console.log("id => " + id + "\nemail => " + email);
        
        //Busca o cliente no banco de dados, se não achar ativa a função "sair()".
        cliente = await findData("cliente", id);
        console.log(cliente);
        
        if(!cliente){
            sair();
        }

    }else{
        sair();
    }
        
    //Busca os personals.
    personals = await Personals();
    
    //Faz a formatação do geojson.
    geojson = await Geojson(personals);

    //Map //https://docs.mapbox.com/mapbox-gl-js/api/#map
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1YXJkb2FjNyIsImEiOiJjazNwNXRqYmMyOGw4M21vM3BmdHl3Z3NzIn0.XAq35G0W92TM-gHFt3W_Bg'; //https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken
    var map = new mapboxgl.Map({
        container: 'map', //Id da div no html.
        style: 'mapbox://styles/eduardoac7/ck6iedaqh00yo1ip72es3ajl6', //Estilo do mapa. //'mapbox://styles/eduardoac7/ck3s55wg10f4d1cqwpjxp1xar'(mapa escuro), //os estilos são definidos na pagina https://studio.mapbox.com/  //https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken  
        center: [-46.475378, -23.522910], //latitude e longitude inicial do mapa.
        zoom: 17, //Zoom inicial.
        pitch: 45, //Inclinção do mapa, padrão: 0.
        bearing: -17.6, //Rotação do mapa, padrão: 0.
        antialias: false,
        hash: false, //Para sincronizar a posição do mapa (zoom, center latitude, center longitude, bearing, and pitch) com a URL da página
    });

    map.on('load', () => { //https://docs.mapbox.com/mapbox-gl-js/api/#map#on
        
        geolocateMap(map) //adiciona botão de geolocalização. //https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol
        navigatorMap(map) //adiciona botões de zoom e bússola. //https://docs.mapbox.com/mapbox-gl-js/api/#navigationcontrol

        //source //https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
        sourcePersonals(map, geojson) //adiciona a fonte de coordenadas dos personals.

        //layers //https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer
        const layers = map.getStyle().layers;
        pointsStyle(layers, map) //adiciona uma camada no mapa (função para estilos dos pontos).
        // function3D(layers, map) //função para deixar o mapa em 3D.

        //methods
        map.doubleClickZoom.disable() //Desabilita o zoom de click duplo.


        // personalMarker(map)//Adicionar um marcador personalizado com uma foto do personal numa coordenada especifica.

        selectorMarker(map)//Adiciona o marcador no mapa. Obs: Dois click para colocar um marcador no mapa e um click para retirá-lo.

        //personalPopup(map)//Adicionar uma caixa de informações do personal ao clicar.

        pageDetail(map)//Adiciona uma pagina com as informações do personal.
        
        //Atualização dos personals no mapa.
        contagem = 0;
        setInterval(()=>{
            return atualiza(map, layers);
        },15000)

    });
}

async function atualiza(map, layers){

    //Busca os personals.
    personals = await Personals();
    console.log("Personals => " + personals);

    //Faz a formatação do geojson.
    geojson = await Geojson(personals);
    console.log("Geojson => " + geojson);

    //remove a camada do mapa (Os pontos pretos).
    map.removeLayer('points');

    //Remove a fonte do mapa (as posições dos personals).
    //Obs: Se não remover a camada antes, vai dá erro, pois a camadas vai esta utilizando essa fonte.
    map.removeSource('pointsSources');

    //Adiciona uma nova fonte.
    map.addSource('pointsSources', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": geojson
        }
    })

    //Adiciona uma nova camada.
    map.addLayer({
        id: 'points',
        source: 'pointsSources',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': 'black'
        }
    });

    contagem += 1;
    console.log(contagem);
}