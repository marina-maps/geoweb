function addRutas() {

    var url = 'datos/rutas.geojson';
    map.addSource('rutas', { type: 'geojson', data: url });

    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'rutas',
        'layout': {
            'line-join': 'round', //hace lineas un poco mas suaves 
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#ff0000',
            'line-width': 3
        }
    });

} //fin funcion


function zoomToRutas(valores) {

    var coord = valores.split("/"); //SPlit: los valores que vienen los vas a cortar por "este" caracter, 
    //y mes vas a generar un Array. En este caso tendremos: posicion 0: zoom, posicion 1: LAT, posicion 2: long

    map.flyTo({ //mueve el mapa al sitio donde nosotros les indiquemos 
            center: [coord[2], coord[1]],
            zoom: coord[0]
        });

    } //fin funcion