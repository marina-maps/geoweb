//OJO, només podem tenir un dem activat al mapa (deixar l'altre comentat)

//añadir DEM de Mapbox (viene por defecto en Mapbox Studio > Tilesets) para que se eleven los dato. La capa es mundial!!
function add3D() {

    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });

    map.setTerrain({
        'source': 'mapbox-dem',
        'exaggeration': 1.5 //1 altura real. + de 1 exageracion.
    });


    map.addLayer({ //degradado azul de fondo para que parezca + real 
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
        }
    });

} //fin funcion add3D


//afegir el DEM de Catalunya de l'ICGC que té mes resolució que el de Mapbox (només serveix per catalunya)
function add3DICGC() {

    map.addSource('icgc-dem', {
        'type': 'raster-dem',
        "tiles": [
            "https://tilemaps.icgc.cat/tileserver/tileserver.php/terreny_icgc_2m_rgb/{z}/{x}/{y}.png"
        ],
        'tileSize': 512,
        'maxzoom': 14
    });

    map.setTerrain({
        'source': 'icgc-dem',
        'exaggeration': 1.5
    });


    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
        }
    });

} //fin funcion

//Checkbox para activar o desacctivar el 3D. (Con el DEM de Mapbox en este caso)
function ver3D(valor) {

    if (valor) {

        map.setTerrain({ //si lo de dentro esta vacio, al volver a activarlo no sabria como hacerlo
            'source': 'icgc-dem',
            'exaggeration': 1.5
        });

    } else {
        map.setTerrain(null);
    }
}//fin funcion ver3D



