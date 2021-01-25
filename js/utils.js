 //funcion para pedir algo a un servidor (no entiendo nada)
 async function enviarPeticion(url) {

  return fetch(url)
      .then(function (response) {
          return response.json()
      })
      .then(function (data) {
          //console.log('Respuesta', data);
          return data;
      }).catch(function (error) {//esto es lo que pasa si da error
          console.log('Error', error);
          alert("Error peticion");
          return null;
      });

}