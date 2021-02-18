//funcion para transformar los datos geojson a json (tendriamos que ver como serian los datos que nos darian y ver la estructura json que vamos a crear (por ejemplo usando geojson.io))
function terremotosGeonamesToGeoJSON(respuestaGeonames) {

    var geoJSON = { //Crea la estructura básica de cualquier geojson
        "type": "FeatureCollection",
        "features": [] // array vacio
    };

    for (var i = 0; i < respuestaGeonames.earthquakes.length; i++) { //bucle que recorra todos los datos y los vaya transformando con la siguiente estructura

        geoJSON.features.push( //push sirve para ir añadiendo cosas al listado 
            {
                "type": "Feature",
                "properties": {
                    "magnitude": respuestaGeonames.earthquakes[i].magnitude,
                    "datetime": respuestaGeonames.earthquakes[i].datetime
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        respuestaGeonames.earthquakes[i].lng,
                        respuestaGeonames.earthquakes[i].lat
                    ]
                }
            }
        ); //fin push

    } //fin loop

    return geoJSON;

} //fin funcion 


function generarPeticionTerremotos() {

    var peticion = 'https://secure.geonames.org/earthquakesJSON?' +
        'north=' + map.getBounds()._ne.lat + '&' +
        'south=' + map.getBounds()._sw.lat + '&' +
        'east=' + map.getBounds()._ne.lng + '&' +
        'west=' + map.getBounds()._sw.lng + '&' +
        'maxRows=50&' +
        'minMagnitude=5&' +
        'username=masterupc&';
    //date : 'yyyy-MM-d

    enviarPeticion(peticion).then(function (respuestaGeonames) { //Hace la peticion y se espera a recibir los datos y entonces ejecuta el siguiente codigo

        var geoJSON = terremotosGeonamesToGeoJSON(respuestaGeonames); //Amb la resposta obtinguda lcrida la funcio per convertirho a geojson i encapsular el resultat en una nova variable 

        //Si no troba el source "terremotos-source" (primer cop que es arrega la pàgina):
        if (!map.getSource("terremotos_source")) { // ! = negar

            map.addSource("terremotos_source", { //Afegeix les dades //https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson
                type: "geojson",
                data: geoJSON
            });

            map.addLayer({
                'id': 'terremotos',
                'type': 'circle', //https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#circle
                'source': 'terremotos_source',
                'paint': {
                    'circle-color': [
                        'interpolate', //https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#interpolate-hcl
                        ['linear'],
                        ['get', 'magnitude'], //'get' serveix per agafar el valor d'un camp. En aquest cas del camp 'magnitude' com a referencia per determinar el color de cada punt.
                        3, '#ebe709',
                        5, '#eb1809',
                        7, '#ef4bf2',
                    ],
                    'circle-opacity': 0.75,
                    'circle-radius': [
                        'interpolate', //https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#interpolate
                        ['linear'], ['get', 'magnitude'],
                        3, 8,
                        5, 16,
                        8, 32
                    ]
                }
            });

            map.addLayer({
                'id': 'terremotos-textos',
                'type': 'symbol', //https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol
                'source': 'terremotos_source',
                'layout': {
                    'text-field': [
                        'format', ['get', 'magnitude'], //'format' canvia el format per a que el que es retorna sigui una adena de text, crec
                    ],
                    'text-size': 10
                },
                'paint': {
                    'text-color': 'rgba(255,255,255,1)'
                }
            });

        //Si troba el source (vol dir que la finestra ja estava cargada i simplement s'ha executat la funció perquè s'ha mogut el mapa o el zoom)
        } else { //canvia les dades per les noves

            map.getSource("terremotos_source").setData(geoJSON);

        }

    });

} // fin funcion

