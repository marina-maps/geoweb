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

// Animacion para hacer rotar el mapa 
//
var animacion; //creada fuera para poder usarla en funciones diferentes 
function rotarCamara(timestamp) { //si solo pongo esta funcion, seguiria rotando eternamente hasta que cierre la ventana, si hago algo con el mouse no haria nada y seguiria rotando. (hace falta cancel)

    rotacion = timestamp / 100 == 360 ? 0 : timestamp / 100; //timestamp (milisegundos) entre cien, y cuando llegue a 360 se pone a 0 otra vez
    map.rotateTo(rotacion, { duration: 0 }); //rotacion (angulo creo)

    animacion = requestAnimationFrame(rotarCamara);//se esta llamando a el mismo, hace un bucle 
}


function finalRotarCamara() { //para cuando el usuario interactue con la web de alguna forma, la pagina dejara de rotar ara poder hacer otras cosas (zoom, arrastrar...)

    cancelAnimationFrame(animacion);
}   