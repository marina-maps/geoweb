function buscarMapas() {

    var options = document.getElementsByName("optionsRadios"); //Busca los elementos deldocumento hmtl que tengan name = "optionsRadios" 
    var url_servidor;
    for (var i = 0; i < options.length; i++) {//recorre todos los elementos que ha encontrado 
        if (options[i].checked) { //el que esté checked
            url_servidor = options[i].value; //recogerá su valor (el link) en la variable url_servidor 
        }
    }
    var textoBuscar = document.getElementById("text_filter_socrata").value; //encodeURI()
    var limiteResultados = document.getElementById("num_results_socrata").value;
    var peticion1 = url_servidor + "q=" + textoBuscar + "&limit=" + limiteResultados + "&only=map";
    // console.log(peticion1);

    enviarPeticion(peticion1).then(function (respuestaSocrata) {//viene del fichero utils //Then le digo que se espere

        if (respuestaSocrata) {
            // console.info(respuestaSocrata);
            document.getElementById("results").innerHTML = "Resultados encontrados:<b>" + respuestaSocrata.resultSetSize + "</b>";
            //$('#mygrid').html('');

            var resultadosHTML;

            if (respuestaSocrata.resultSetSize >= 1) {//resultSetSize numero de resultados (variable que viene en la respuesta)
                //Si encuentra mas de 1 resultado, haz lo siguiente:
                resultadosHTML = "<ul>";
                for (var i = 0; i < respuestaSocrata.results.length; i++) {

                    resultadosHTML = resultadosHTML + '<li class="li"><b>' + respuestaSocrata.results[i].resource.name + ': <b>' +
                        '<a target="_blank" title="' + respuestaSocrata.results[i].resource.attribution + '" href="' + respuestaSocrata.results[i].link + '"> Link </a> ' +
                        '<a class="btn btn-success btn-xs" onClick="obtenerGeoJson(this.id)" title="' + respuestaSocrata.results[i].resource.attribution + '" href="#" id="' + respuestaSocrata.results[i].resource.id + '#' + respuestaSocrata.results[i].metadata.domain + '">Ver mapa</a>';

                }
                resultadosHTML = resultadosHTML + "</ul>";
                document.getElementById("mygrid").innerHTML = resultadosHTML;


            } else {

                document.getElementById("results").innerHTML = "No hay resultados";
            }
        }
    });//fin peticion



} // fin funcion