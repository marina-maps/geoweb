function addIncendis() {

    map.addSource("incendis_source", {
        "type": "vector",
        "url": "mapbox://marina-maps.4kzu1pqu"  // Nuestor ID Tileset

    }
    ); //fin map source


    map.addLayer({
        "id": "incendis",
        "type": "fill",
        "source": "incendis_source",
        "source-layer": "merge_project-8izj0o", // Nuestro nombre Tileset
        "maxzoom": 21,
        "minzoom": 6,
        "paint": {"fill-color": "#FF3934"},
    }
    );//fin addLayer
        

} //fin funcion addEdificioscapa

function filtrarEdificios(valor) {
    map.setFilter("incendis", ["==",["get", "ANY"], parseInt(valor)]); //parseInt fuerza a la variable a que se numerica sin decimales
    document.getElementById("any").innerHTML = "<p> Any " + valor + "</p> "; //inner.HTML sirve para cambiar o actualizar codigo HTML
}//fin funcion filtrarEdificios 


function addPopupToIncendis(nombreCapa){
    map.on('click', nombreCapa, function (e) {

        var text = "";
        //console.info(e);
        for (key in e.features[0].properties) {

            text += "<b>Numero de plantas</b>:" + e.features[0].properties[key] + "<br>";
            
            
        }
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(text)
            .addTo(map);

    });

    //Para que el usuario intuya que se puede hacer click
    map.on('mouseenter', nombreCapa, function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', nombreCapa, function () {
        map.getCanvas().style.cursor = '';
    });

}  // fin funcion addPopupToMapEdificios


function add3D() {

    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14,
    });

    map.setTerrain({
        'source': 'mapbox-dem',
        'exaggeration': 1.5 //1 altura real. + de 1 exageracion.
    });

    //degradado azul de fondo para que parezca + real 
    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
        }
    });

}
