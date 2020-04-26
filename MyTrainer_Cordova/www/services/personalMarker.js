//Adicionar um marcador personalizado com uma foto do personal numa coordenada especifica.
function personalMarker(map){
    return coordenada.forEach(function (marker, index) {

        var el = document.createElement('div');
        el.className = 'marker';
        el.className += 'marker' + index;
        el.style.backgroundImage = 'url(https://avatarfiles.alphacoders.com/947/94719.jpg)';
        el.style.width = '60px';
        el.style.height = '60px';
        el.style.backgroundSize = '60px';
        el.style.borderRadius = '30px';

        // add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        console.log(marker.geometry.coordinates)

    });
}