function selectorMarker(map) {
    const marker = new mapboxgl.Marker();
    return (

        map.on('dblclick', (ev) => {
            var c = ev.lngLat;
            console.log(c);
            marker.setLngLat([c.lng, c.lat]).addTo(map);
        }),

        map.on('click', () => {
            marker.remove(map)
        })

    );
}