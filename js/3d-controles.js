//OJO, només podem tenir un dem activat al mapa (deixar l'altre comentat)
var fuente;

function addICGC (){
    var fuente = 'icgc-dem';
    map.setTerrain({
        'source': fuente,
        'exaggeration': 1.5 //1 altura real. + de 1 exageracion.
    });
}

function addMB (){
    var fuente = 'mapbox-dem';
    map.setTerrain({
        'source': fuente,
        'exaggeration': 1.5 //1 altura real. + de 1 exageracion.
    });
}

function donothing (){
    map.setTerrain(null);
}

function add3D() {

    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });

    map.addSource('icgc-dem', {
        'type': 'raster-dem',
        "tiles": [
            "https://tilemaps.icgc.cat/tileserver/tileserver.php/terreny_icgc_2m_rgb/{z}/{x}/{y}.png"
        ],
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






