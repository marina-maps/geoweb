//funcion para transformar los datos geojson a json (tendriamos que ver como serian los datos que nos darian y ver la estructura json que vamos a crear (por ejemplo usando geojson.io))
function terremotosGeonamesToGeoJSON(respuestaGeonames){

    var geoJSON ={
        "type": "FeatureCollection",
        "features": [] // array vacio
    };

    for (var i =0; i < respuestaGeonames.earthquakes.length; i++){ //bucle que recorra todos los datos y los vaya transformando con la siguiente estructura

        geoJSON.features.push( //push sirve para ir añadiendo cosas al listado 
            {
                "type": "Feature",
                "properties": {"magnitude":respuestaGeonames.earthquakes[i].magnitude, 
                                "datetime":respuestaGeonames.earthquakes[i].datetime },
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    respuestaGeonames.earthquakes[i].lng,
                    respuestaGeonames.earthquakes[i].lat
                  ]
                }
              }
        );

    } //fin loop

    return geoJSON;

    } //fin funcion