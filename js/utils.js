 //funcion para pedir algo a un servidor (no entiendo nada) 
 //Es una función asincrona: se espera a que haya una respuesta por parte del servidor (async function)
 //API fetch = AJAX. Enviar petiiones http y capturar las respuestas de estas peticiones. 
 //Esta función la podemos reaprovechar siempre que tengamos que enviar una petición a un servidor GET que retorne .json

 async function enviarPeticion(url) { //url: petición completa 

  return fetch(url)
      .then(function (response) {
          return response.json()
      })
      .then(function (data) {
          //console.log('Respuesta', data);
          return data; //Aqui retorna el .json con los datos obtenidos 
      }).catch(function (error) {//esto es lo que pasa si da error
          console.log('Error', error);
          alert("Error peticion"); //Salta un alert de error
          return null;
      });

}


//Crear un popup al pasar el ratón por encima de cada punto
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });

function addPopupToMap(nombreCapa) {

    map.on('mousemove', nombreCapa, function (e) {

      var text = "";
      //console.info(e);
      for (key in e.features[0].properties) {

        text += "<b>" + key + "</b>:" + e.features[0].properties[key] + "<br>";
      }

      popup.setLngLat(e.lngLat)
        .setHTML(text)
        .addTo(map);

    });

    map.on('mouseenter', nombreCapa, function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', nombreCapa, function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

  }// fin funcion