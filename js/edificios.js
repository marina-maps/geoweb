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

} //fin funcion