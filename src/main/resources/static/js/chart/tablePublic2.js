/**
 * Created by diepinto30 and bdportilla1 on 13/07/2020.
 * Download data  http://localhost:7200/repositories/sbc-2/statements
 */
$(document).ready(function(){

    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    var urlData = 'http://localhost:8080/api/scholary_works';

    var i = 0;
    var i2 = 0;
    var recursoTitle;
    var titleRecursoG;
    var j2 = 0;

    console.log('cardando URL')
    var i = 0;
    $.ajax({
        url: urlData,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (data, textStatus, xhr) {
            console.log('Toda los Datos registrados')
            var edadVacio = 'None';
            var edadNone = 'null';
            var div = '<h1>datos json</h1>';
            div += '';
            $("#tabla2").append(div);
            var modal = "";
            var tab = ' <script>\n' +
                'var idioma=\n' +
                '\n' +
                '    {\n' +
                '        "sProcessing":     "Procesando...",\n' +
                '        "sZeroRecords":    "No se encontraron resultados",\n' +
                '        "sEmptyTable":     "Ningún dato disponible en esta tabla",\n' +
                '        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",\n' +
                '        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",\n' +
                '        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",\n' +
                '        "sInfoPostFix":    "",\n' +
                '        "sSearch":         "Buscar:",\n' +
                '        "sUrl":            "",\n' +
                '        "sInfoThousands":  ",",\n' +
                '        "sLoadingRecords": "Cargando...",\n' +
                '        "oPaginate": {\n' +
                '            "sFirst":    "Primero",\n' +
                '            "sLast":     "Ãšltimo",\n' +
                '            "sNext":     "Siguiente",\n' +
                '            "sPrevious": "Anterior"\n' +
                '        },\n' +
                '        "oAria": {\n' +
                '            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",\n' +
                '            "sSortDescending": ": Activar para ordenar la columna de manera descendente"\n' +
                '        },\n' +
                '        "buttons": {\n' +
                '            "copyTitle": \'Informacion copiada\',\n' +
                '            "copyKeys": \'Use your keyboard or menu to select the copy command\',\n' +
                '            "copySuccess": {\n' +
                '                "_": \'%d filas copiadas al portapapeles\',\n' +
                '                "1": \'1 fila copiada al portapapeles\'\n' +
                '            },\n' +
                '\n' +
                '            "pageLength": {\n' +
                '            "_": "Mostrar %d filas",\n' +
                '            "-1": "Mostrar Todo"\n' +
                '            }\n' +
                '        }\n' +
                '    };\n' +
                '\n' +
                '$(document).ready(function() {\n' +
                '    $(\'#example\').DataTable( {\n' +
                '        "ordering": true,\n' +
                '        "scrollX": true,\n' +
                '        deferRender:    true,\n' +
                '        "autoWidth": true,\n' +
                '        "language": idioma,\n' +
                '        dom: \'Bfrtip\',\n' +
                '        buttons: [\n' +
                '            \'copy\',\'pdf\', \'print\'\n' +
                '\n' +
                '        ],\n' +
                '        initComplete: function () {\n' +
                '            this.api().columns(\'.select-filter\').every( function () {\n' +
                '                var column = this;\n' +
                '                var select = $(\'<select><option value=""></option></select>\')\n' +
                '                        .appendTo( $(column.footer()).empty() )\n' +
                '                        .on( \'change\', function () {\n' +
                '                            var val = $.fn.dataTable.util.escapeRegex(\n' +
                '                                    $(this).val()\n' +
                '                            );\n' +
                '\n' +
                '                            column\n' +
                '                                    .search( val ? \'^\'+val+\'$\' : \'\', true, false )\n' +
                '                                    .draw();\n' +
                '                        } );\n' +
                '\n' +
                '                column.data().unique().sort().each( function ( d, j ) {\n' +
                '                    select.append( \'<option value="\'+d+\'">\'+d+\'</option>\' )\n' +
                '                } );\n' +
                '            } );\n' +
                '        }\n' +
                '    } );\n' +
                '} );\n' +
                '</script>';
            tab += '<table id="example" class="display nowrap" style="width:100%">';

            tab += '<thead>\n' +
                '    <tr>\n' +
                '        <th scope="col" >#</th>\n' +
                '        <th scope="col" >Recurso</th>\n' +
                '        <th scope="col" class="select-filter">tipo</th>\n' +
                '        <th scope="col" class="select-filter">lenguaje</th>\n' +
                '        <th scope="col" >Mas info</th>\n' +
                '\n' +
                '    </tr>\n' +
                '    </thead>';

            $.each(data, function (ids, item) {
                i2 = i2 +1;
                recursoTitle = data[i].recurso;
                var idTitle = data[i].recurso;
                titleRecursoG = data[i].titulo;
                var idrecursoTxt = "";
                idrecursoTxt = data[i].recurso;
                tab += '<tr>';
                tab += '<td>' + i2 + '</td>';
                tab += '<th>' + data[i].recurso + '</th>';
                tab += '<th>' + data[i].tipo + '</th>';
                tab += '<th>' + data[i].lenguaje + '</th>';
                tab += '<th ><button type="button" class="btn btn-primary more" data-toggle="modal" data-target="#exampleModalCenter'+i2+'"  id="more">Ver más </button> </th>';
                console.log("Todos los datos");

                //consulta para ver los valores en del rank y quartil de los recursos



                modal += '<!-- Modal -->\n' +
                    '<div class="modal fade" id="exampleModalCenter'+i2+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\n' +
                    '  <div class="modal-dialog modal-dialog-centered" role="document">\n' +
                    '    <div class="modal-content">\n' +
                    '      <div class="modal-header">\n' +
                    '        <h5 class="modal-title" id="exampleModalLongTitle"><strong><i>Id Recurso: </i></strong>'+idTitle+'</h5>\n' +
                    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                    '          <span aria-hidden="true">&times;</span>\n' +
                    '        </button>\n' +
                    '      </div>\n' +
                    '      <div class="modal-body">' +
                    '        <h5>Título de la publicación: </h5>' +
                    '        '+data[i].titulo +
                    '        <hr>' +
                    '        <h5>Idioma: </h5>' +
                    '        click para más <información></información>' +
                    '        <a href="http://dbpedia.org/page/'+data[i].lenguaje+'" target="_blank">'+data[i].lenguaje+'</a>' +
                    '        <hr>' +
                    '        <h5>Año de publicación: </h5>' +
                    '        '+data[i].date +
                    '        <hr>' +
                    '        <h5>Tipo de documento: </h5>' +
                    '        '+data[i].tipo +
                    '        <hr>' +
                    '        <h5>DOI: </h5>' +
                    '        '+data[i].doi +
                    '        <hr>' +
                    '        <h6><i># de Citas:</i></h6>';
                if(data[i].numCitas != ""){
                    modal +='       '+data[i].numCitas ;
                }else{
                    modal +='      No tiene citas aún ' ;
                }
                modal +='        <hr>' +
                    '           <div id="'+idTitle+'">' +
                    '           </div>' +
                    '      </div>\n' +
                    '    </div>\n' +
                    '  </div>\n' +
                    '</div>';
                i++;


            });//end each ids
            tab += '<tfoot>\n' +
                '    <tr>\n' +
                '        <th scope="col" >#</th>\n' +
                '        <th scope="col" class="select-filter">Recurso</th>\n' +
                '        <th scope="col">tipo</th>\n' +
                '        <th scope="col" class="select-filter">lenguaje</th>\n' +
                '        <th scope="col"> Mas info</th>\n' +
                '\n' +
                '    </tr>\n' +
                '    </tfoot>';
            tab += '</table>';

            $("#result").append(tab);
            $("#modal").append(modal);


        },
        error: function (data) {
            alert('Error');
        }

    });//end ajax


    $('#morebutton').on('click', function(){
        var urlDataRanks = 'http://localhost:8080/api/ranks';
        var j = 0;
        var j2 = 0;
        var modalMore = "";
        console.log('cardando URL ranks')
        $.ajax({
            url: urlDataRanks,
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function (data, textStatus, xhr) {
                console.log('Toda los Datos registrados')
                var edadVacio = 'None';
                var edadNone = 'null';
                var div = '<h1>datos json</h1>';
                div += '';
                $("#tabla2").append(div);
                var modal23 = "";
                var tab2 = ' <script>\n' +
                    'var idioma=\n' +
                    '\n' +
                    '    {\n' +
                    '        "sProcessing":     "Procesando...",\n' +
                    '        "sZeroRecords":    "No se encontraron resultados",\n' +
                    '        "sEmptyTable":     "Ningún dato disponible en esta tabla",\n' +
                    '        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",\n' +
                    '        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",\n' +
                    '        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",\n' +
                    '        "sInfoPostFix":    "",\n' +
                    '        "sSearch":         "Buscar:",\n' +
                    '        "sUrl":            "",\n' +
                    '        "sInfoThousands":  ",",\n' +
                    '        "sLoadingRecords": "Cargando...",\n' +
                    '        "oPaginate": {\n' +
                    '            "sFirst":    "Primero",\n' +
                    '            "sLast":     "Ãšltimo",\n' +
                    '            "sNext":     "Siguiente",\n' +
                    '            "sPrevious": "Anterior"\n' +
                    '        },\n' +
                    '        "oAria": {\n' +
                    '            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",\n' +
                    '            "sSortDescending": ": Activar para ordenar la columna de manera descendente"\n' +
                    '        },\n' +
                    '        "buttons": {\n' +
                    '            "copyTitle": \'Informacion copiada\',\n' +
                    '            "copyKeys": \'Use your keyboard or menu to select the copy command\',\n' +
                    '            "copySuccess": {\n' +
                    '                "_": \'%d filas copiadas al portapapeles\',\n' +
                    '                "1": \'1 fila copiada al portapapeles\'\n' +
                    '            },\n' +
                    '\n' +
                    '            "pageLength": {\n' +
                    '            "_": "Mostrar %d filas",\n' +
                    '            "-1": "Mostrar Todo"\n' +
                    '            }\n' +
                    '        }\n' +
                    '    };\n' +
                    '\n' +
                    '$(document).ready(function() {\n' +
                    '    $(\'#example2-3\').DataTable( {\n' +
                    '        "ordering": true,\n' +
                    '        "scrollX": true,\n' +
                    '        deferRender:    true,\n' +
                    '        "autoWidth": true,\n' +
                    '        "language": idioma,\n' +
                    '        dom: \'Bfrtip\',\n' +
                    '        buttons: [\n' +
                    '            \'copy\',\'pdf\', \'print\'\n' +
                    '\n' +
                    '        ],\n' +
                    '        initComplete: function () {\n' +
                    '            this.api().columns(\'.select-filter\').every( function () {\n' +
                    '                var column = this;\n' +
                    '                var select = $(\'<select><option value=""></option></select>\')\n' +
                    '                        .appendTo( $(column.footer()).empty() )\n' +
                    '                        .on( \'change\', function () {\n' +
                    '                            var val = $.fn.dataTable.util.escapeRegex(\n' +
                    '                                    $(this).val()\n' +
                    '                            );\n' +
                    '\n' +
                    '                            column\n' +
                    '                                    .search( val ? \'^\'+val+\'$\' : \'\', true, false )\n' +
                    '                                    .draw();\n' +
                    '                        } );\n' +
                    '\n' +
                    '                column.data().unique().sort().each( function ( d, j ) {\n' +
                    '                    select.append( \'<option value="\'+d+\'">\'+d+\'</option>\' )\n' +
                    '                } );\n' +
                    '            } );\n' +
                    '        }\n' +
                    '    } );\n' +
                    '} );\n' +
                    '</script>';
                tab2 += '<table id="example2-3" class="display nowrap" style="width:100%">';

                tab2 += '<thead>\n' +
                    '    <tr>\n' +
                    '        <th scope="col" >#</th>\n' +
                    '        <th scope="col" >Recurso</th>\n' +
                    '        <th scope="col" class="select-filter">Título Categoría</th>\n' +
                    '        <th scope="col" class="select-filter">Quartile</th>\n' +
                    '        <th scope="col" >Mas info</th>\n' +
                    '\n' +
                    '    </tr>\n' +
                    '    </thead>';

                $.each(data, function (ids, item) {
                    j2 = j2 +1;
                    var idTitle3 = data[j].idRecursos;
                    tab2 += '<tr>';
                    tab2 += '<td>' + j2 + '</td>';
                    tab2 += '<th>' + data[j].idRecursos + '</th>';
                    tab2 += '<th>' + data[j].titleQuartile + '</th>';
                    tab2 += '<th>' + data[j].ValueQuartile + '</th>';
                    tab2 += '<th ><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter23'+j2+'">Ver más </button> </th>';
                    console.log("Todos los datos");

                    //consulta para ver los valores en del rank y quartil de los recursos



                    modal23 += '<!-- Modal -->\n' +
                        '<div class="modal fade" id="exampleModalCenter23'+j2+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle23" aria-hidden="true">\n' +
                        '  <div class="modal-dialog modal-dialog-centered" role="document">\n' +
                        '    <div class="modal-content">\n' +
                        '      <div class="modal-header">\n' +
                        '        <h5 class="modal-title" id="exampleModalLongTitle23"><strong><i>Id Recurso: </i></strong>'+idTitle3+'</h5>\n' +
                        '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                        '          <span aria-hidden="true">&times;</span>\n' +
                        '        </button>\n' +
                        '      </div>\n' +
                        '      <div class="modal-body">' +
                        '        <h5>Título de source: </h5>' +
                        '        '+data[j].titulo +
                        '        <hr>' +
                        '        <h5>País: </h5>' +
                        '        click para más <información></información>' +
                        '        <a href="'+data[j].country+'" target="_blank">'+data[j].country+'</a>' +
                        '        <hr>' +
                        '        <h5>Nombre de la categoría: </h5>' +
                        '        '+data[j].titleQuartile +
                        '        <hr>' +
                        '        <h5>Ranks: </h5>' +
                        '        '+data[j].ValueRank +
                        '        <hr>' +
                        '        <h5>Quartile: </h5>' +
                        '        '+data[j].ValueQuartile +
                        '      </div>\n' +
                        '    </div>\n' +
                        '  </div>\n' +
                        '</div>';
                    j++;


                });//end each ids
                tab2 += '<tfoot>\n' +
                    '    <tr>\n' +
                    '        <th scope="col" >#</th>\n' +
                    '        <th scope="col" class="select-filter">Recurso</th>\n' +
                    '        <th scope="col">Título Categoría</th>\n' +
                    '        <th scope="col" class="select-filter">Quartile</th>\n' +
                    '        <th scope="col"> Mas info</th>\n' +
                    '\n' +
                    '    </tr>\n' +
                    '    </tfoot>';
                tab2 += '</table>';

                $("#result2").append(tab2);
                $("#modal23").append(modal23);


            },
            error: function (data) {
                alert('Error');
            }
        });//end ajax
    });


});

// function FunctionMore(numero, string) {
//     $(document)
//     console.log(numero, string);
//
//
//
// };


function configureLoadingScreen(screen){
    $(document)
        .ajaxStart(function () {
            screen.fadeIn();
        })
        .ajaxStop(function () {
            screen.fadeOut();
        });
};





