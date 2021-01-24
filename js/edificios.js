function addEdificiosCapa() {

    map.addSource("edificios_source", {
        "type": "vector",
        "url": "mapbox://marina-maps.d0a8esxl"  // Nuestor ID Tileset

    }); //fin map source


    map.addLayer({
        "id": "edificios",
        "type": "fill-extrusion",
        "source": "edificios_source",
        "source-layer": "construcciones-9esw67", // Nuestro nombre Tileset
        "maxzoom": 21,
        "minzoom": 15,
        "filter": [">", "numberOfFl", 0], //filtro para que no se vean los edificios de 0 alturas, ue se ven de color blaco
        "paint": {
            "fill-extrusion-color": [
                "interpolate", ["linear"], ["number", ["get", "numberOfFl"]],
                0, "#FFFFFF",
                1, "#e6b03d",
                3, "#e6b03d",
                6, "#3de66d",
                9, "#3de6b1",
                12, "#22ecf0",
                15, "#14b1fd",
                20, "#3d73e6",
                40, "#123a8f",
                60, "#ce2f7e",
                106, "#ff4d4d"

            ],
            "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                8, 0,
                12.5, 0,
                14, ["*", 1, ["to-number", ["get", "numberOfFl"]]],
                16, ["*", 1.5, ["to-number", ["get", "numberOfFl"]]],
                20, ["*", 2, ["to-number", ["get", "numberOfFl"]]]
            ],
            "fill-extrusion-opacity": 0.9
        }
    }
        ,"road-label" //para que los textos aparezcan por encima de todo (depende del nombre que tengan los nombres de las carreteras en el estilo)
    );

} //fin funcion addEdificioscapa




//Slider filtro segun el nºplantas:
function filtrarEdificios(valor) {
    map.setFilter("edificios", [">", "numberOfFl", parseInt(valor)]); //parseInt fuerza a la variable a que se numeriva sin decimales

    document.getElementById("altura").innerHTML = "Más de  <b>" + valor + "</b> pisos"; //inner.HTML sirve para cambiar o actualizar codigo HTML

}//fin funcion filtrarEdificios 



//Checkbox para activar o desactivar la capa de "labels". En html le hemos dicho que por defecto estara cheked. 
//Cuando cheked pase a none, se activará la siguiente funcion:
function verTextos(valor){ //la variable valor será cheked (ver html)

    var estado = "visible"; 

    if(valor){
        estado = "visible";
    } else { //no cheked (none)
        estado = "none";
    }

    //lo siguiente es un bucle para activar o desactivar x capas. 
    for (var i=0; i < map.getStyle().layers.length;i++){

        if(map.getStyle().layers[i].id.indexOf("label")!=-1){

            map.setLayoutProperty(map.getStyle().layers[i].id, "visibility", estado); //va recorriendo todas las capas, y en aquellas donde encuentra la capa label, le asigna la propiedad visibility en funcion del valor que toma la variable estado.
        }

    }

}// fin funcion varTextos



function addPopupToMapEdificios(nombreCapa) {

    map.on('click', nombreCapa, function (e) {

        var text = "";
        //console.info(e);
        for (key in e.features[0].properties) {

            if (key == "numberOfFl") {
                text += "<b>Numero de plantas</b>:" + e.features[0].properties[key] + "<br>";
            }
            if (key == "localId") {
                //localId 0004702DF3800C_part1
                //http://ovc.catastro.meh.es/OVCServWeb/OVCWcfLibres/OVCFotoFachada.svc/RecuperarFotoFachadaGet?ReferenciaCatastral=0004701DF3800C
                //https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCListaBienes.aspx?rc1=0004701&rc2=DF3800C

                var localId = e.features[0].properties[key];

                var localIdSplit = localId.split("_"); // 0004702DF3800C  part1
                var parte1 = localIdSplit[0].substring(0, 7);
                var parte2 = localIdSplit[0].substring(7, localIdSplit[0].length);
                text += "<img width=200 src=https://ovc.catastro.meh.es/OVCServWeb/OVCWcfLibres/OVCFotoFachada.svc/RecuperarFotoFachadaGet?ReferenciaCatastral=" + localId + "><br>";
                text += "<a target=blank href=https://www1.sedecatastro.gob.es/CYCBienInmueble/OVCListaBienes.aspx?rc1=" + parte1 + "&rc2=" + parte2 + ">Ficha</a><br>";

            }


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