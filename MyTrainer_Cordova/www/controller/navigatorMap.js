//adiciona botões de zoom e bússola.
function navigatorMap(map){
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
}