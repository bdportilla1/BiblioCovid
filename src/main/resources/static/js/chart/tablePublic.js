/**
 * Created by diepinto30 and bdportilla1 on 13/07/2020.
 * Download data  http://localhost:7200/repositories/sbc-2/statements
 */

const urlbase = 'http://localhost:8080/'
const q1 = urlbase + 'api/qP';


$(document).ready(function(){
    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    tabla_publicaciones = document.getElementById("tabla_publicaciones");




});

function q_1(){
    fetch(q1)
        .then(res => res.json())
        .then((datos) => {
            console.log(datos);
            cont =0;
            tabla_publicaciones.innerHTML='';
            var tipo = document.getElementById('tipo').value;
            for(let valor of datos){
                if(valor.tipo == tipo){
                    cont = cont+1;
                    tabla_publicaciones.innerHTML += `
		            <tr>
		                <th scope="row">`+ cont +` </th>
		                <td>${valor.recurso}</td>
		                <td>${valor.tipo}</td>
		                <td>${valor.titulo}</td>
		               
		            </tr>
		            `

                }
            }
        }).catch(err => console.error(err));
}



function configureLoadingScreen(screen){
    $(document)
        .ajaxStart(function () {
            screen.fadeIn();
        })
        .ajaxStop(function () {
            screen.fadeOut();
        });
}

