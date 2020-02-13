function init() {
    //Map //https://docs.mapbox.com/mapbox-gl-js/api/#map
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1YXJkb2FjNyIsImEiOiJjazNwNXRqYmMyOGw4M21vM3BmdHl3Z3NzIn0.XAq35G0W92TM-gHFt3W_Bg'; //https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken
    var map = new mapboxgl.Map({
        container: 'map', //Id da div no html
        style: 'mapbox://styles/eduardoac7/ck6iedaqh00yo1ip72es3ajl6', //Estilo do mapa //'mapbox://styles/eduardoac7/ck3s55wg10f4d1cqwpjxp1xar'(mapa escuro), //os estilos são definidos na pagina https://studio.mapbox.com/  //https://docs.mapbox.com/mapbox-gl-js/api/#accesstoken  
        center: [-46.475378, -23.522910], //latitude e longitude inicial do mapa
        zoom: 17, //Zoom inicial
        pitch: 45, //Inclinção do mapa, padrão: 0
        bearing: -17.6, //Rotação do mapa, padrão: 0
        antialias: false,
        hash: false, //Para sincronizar a posição do mapa (zoom, center latitude, center longitude, bearing, and pitch) com a URL da página
    });

    map.on('load', () => { //https://docs.mapbox.com/mapbox-gl-js/api/#map#on

        //conts
        const layers = map.getStyle().layers; //const para instanciar layers do mapbox
         //const para instanciar marker do mapbox

        //source //https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
        sourcePersonals(map) //fonte de coordenadas dos personals

        //layers //https://docs.mapbox.com/mapbox-gl-js/api/#map#addlayer
        pointsStyle(layers, map) //função para estilos dos pontos
        function3D(layers, map) //função para deixar o mapa em 3D

        //methods
        map.doubleClickZoom.disable() //Desabilita o zoom de click duplo

        selectorMarker(map)//Dois click para colocar um marcador no mapa e um click para retirá-lo

        personalMarker(map)//Adicionar um marcador personalizado com uma foto do personal numa coordenada especifica

        personalPopup(map)//Adicionar uma caixa de informações do personal ao clicar
    });
}

