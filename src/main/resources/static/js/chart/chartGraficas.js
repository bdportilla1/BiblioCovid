//chartGraficas
/**
 * Created by diepinto30 and bdportilla1 on 13/07/2020.
 * Download data  http://localhost:7200/repositories/sbc-2/statements
 */

$(document).ready(function(){

    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    // para tranformar parametros de una lista
    var datosT= [];
    var textCadena;
    var text2 = "";
    var text = "";
    var chart2 = "";

    var urlData = 'http://localhost:8080/api/q2';
    var i = 0;
    console.log('cardando URL')
    $.ajax({
        url: urlData,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (data, textStatus, xhr) {

            $.each(data, function (ids, item) {

                i++;

            });//end each ids

        },
        error: function (data) {
            alert('Error');
        }
    });//end ajax


});

function cambiatType(){

    var selectId = document.getElementById("Select1").value;
    console.log(selectId)

    if(selectId == "1"){
        grafica1();
        $("#grafica1").show();
        $("#grafica2").hide();
        $("#grafica3").hide();
        $("#grafica4").hide();

    };
    if(selectId == "2"){
        grafica2();
        $("#grafica1").hide();
        $("#grafica2").show();
        $("#grafica3").hide();
        $("#grafica4").hide();
    };
    if(selectId == "3"){
        grafica3();
        $("#grafica1").hide();
        $("#grafica2").hide();
        $("#grafica3").show();
        $("#grafica4").hide();
    };
    if(selectId == "4"){
        grafica4();
        $("#grafica1").hide();
        $("#grafica2").hide();
        $("#grafica3").hide();
        $("#grafica4").show();
    }

}

function grafica1() {
    am4core.useTheme(am4themes_animated);
    // Themes end
    // Create chart
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    // para tranformar parametros de una lista
    var datosT= [];
    var textCadena;
    var text2 = "";
    var text = "";
    var chart2 = "";

    var urlData = 'http://localhost:8080/api/q2';
    var i = 0;
    console.log('cardando URL')
    $.ajax({
        url: urlData,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (data, textStatus, xhr) {
            console.log('SDG' )
            console.log(data)
            var descriptionData = '';
            var title = '';
            var div = "";
            var div2 = "";
            var codeODS = '';
            $.each(data, function (ids, item) {

                console.log("data");
                text2 = text2 + data[i].tipo ;
                var languaje = "";
                languaje1 = data[i].tipo;

                // para la lista de los datos chart
                datosT.push({
                    "country": data[i].tipo,
                    "value": data[i].cantidad
                });



                i++;

            });//end each ids
            console.log(datosT)

            chart.data = datosT;

            chart.radius = am4core.percent(70);
            chart.innerRadius = am4core.percent(40);
            chart.startAngle = 180;
            chart.endAngle = 360;

            var series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "country";

            series.slices.template.cornerRadius = 10;
            series.slices.template.innerCornerRadius = 7;
            series.slices.template.draggable = true;
            series.slices.template.inert = true;
            series.alignLabels = false;

            series.hiddenState.properties.startAngle = 90;
            series.hiddenState.properties.endAngle = 90;

            chart.legend = new am4charts.Legend();


        },
        error: function (data) {
            alert('Error');
        }
    });//end ajax

}

function grafica2() {
    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    var textCadena;
    var text2 = "";


    var urlData = 'http://localhost:8080/api/sourceConteo';
    var i = 0;
    var i2 = 0;
    console.log('cardando URL')
    var i = 0;
    $.ajax({
        //url: 'http://127.0.0.1:8000/app/api/',
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
                '        <th scope="col" class="select-filter">Source</th>\n' +
                '        <th scope="col" class="select-filter">Cantidad</th>\n' +
                '\n' +
                '    </tr>\n' +
                '    </thead>';

            $.each(data, function (ids, item) {
                i2 = i2 +1;
                tab += '<tr>';
                tab += "<td>" + i2 + "</td>";
                tab += "<th>" + data[i].source + "</th>";
                tab += "<th>" + data[i].cantidad + "</th>";
                console.log("Todos los datos");

                i++;

            });//end each ids
            tab += '<tfoot>\n' +
                '    <tr>\n' +
                '        <th scope="col" >#</th>\n' +
                '        <th scope="col" class="select-filter">Source</th>\n' +
                '        <th scope="col" class="select-filter">Cantidad</th>\n' +
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

}

function grafica3() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end

    var chart = am4core.create("chartdiv3", am4charts.RadarChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    var label = chart.createChild(am4core.Label);
    label.text = "Drag slider to change radius";
    label.exportable = false;

    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    // para tranformar parametros de una lista
    var datosT= [];
    var textCadena;
    var text2 = "";
    var text = "";
    var chart2 = "";

    var urlData = 'http://localhost:8080/api/sourceConteoCountry';
    var i = 0;
    console.log('cardando URL')
    $.ajax({
        url: urlData,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (data, textStatus, xhr) {

            $.each(data, function (ids, item) {
                console.log("data");

                // para la lista de los datos chart
                datosT.push({
                    "category": data[i].country,
                    "value1": data[i].cantidad
                });



                i++;

            });//end each ids
            console.log(datosT)

            chart.data = datosT;

            chart.radius = am4core.percent(95);
            chart.startAngle = 270 - 180;
            chart.endAngle = 270 + 180;
            chart.innerRadius = am4core.percent(60);

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.labels.template.location = 0.5;
            categoryAxis.renderer.grid.template.strokeOpacity = 0.1;
            categoryAxis.renderer.axisFills.template.disabled = true;
            categoryAxis.mouseEnabled = false;

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.grid.template.strokeOpacity = 0.05;
            valueAxis.renderer.axisFills.template.disabled = true;
            valueAxis.renderer.axisAngle = 260;
            valueAxis.renderer.labels.template.horizontalCenter = "right";
            valueAxis.min = 0;

            var series1 = chart.series.push(new am4charts.RadarColumnSeries());
            series1.columns.template.radarColumn.strokeOpacity = 1;
            series1.name = "Cantidad";
            series1.dataFields.categoryX = "category";
            series1.columns.template.tooltipText = "{name}: {valueY.value}";
            series1.dataFields.valueY = "value1";
            series1.stacked = true;

            chart.seriesContainer.zIndex = -1;

            var slider = chart.createChild(am4core.Slider);
            slider.start = 0.5;
            slider.exportable = false;
            slider.events.on("rangechanged", function() {
                var start = slider.start;

                chart.startAngle = 270 - start * 179 - 1;
                chart.endAngle = 270 + start * 179 + 1;

                valueAxis.renderer.axisAngle = chart.startAngle;
            });


        },
        error: function (data) {
            alert('Error');
        }
    });//end ajax

}

function grafica4() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart
    var chart = am4core.create("chartdiv2", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    // para tranformar parametros de una lista
    var datosT= [];

    var urlData = 'http://localhost:8080/api/lenguages';
    var i = 0;
    console.log('cardando URL')
    $.ajax({
        url: urlData,
        type: 'GET',
        dataType: 'json',
        data: {},
        success: function (data, textStatus, xhr) {
            console.log('Lenguaje' )
            console.log(data)
            $.each(data, function (ids, item) {

                console.log("data");

                // para la lista de los datos chart
                datosT.push({
                    "country": data[i].lenguaje,
                    "value": data[i].cantidad
                });

                i++;

            });//end each ids

            chart.data = datosT;
            var series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "value";
            series.dataFields.radiusValue = "value";
            series.dataFields.category = "country";
            series.slices.template.cornerRadius = 6;
            series.colors.step = 3;

            series.hiddenState.properties.endAngle = -90;

            chart.legend = new am4charts.Legend();

        },
        error: function (data) {
            alert('Error');
        }
    });//end ajax

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

