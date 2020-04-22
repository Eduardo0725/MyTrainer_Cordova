function navigatorMap(map){
    map.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true
    }), 'top-left');
}