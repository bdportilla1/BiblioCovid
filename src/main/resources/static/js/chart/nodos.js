//RadiusLenguaje
/**
 * Created by diepinto30 and bdportilla1 on 13/07/2020.
 * Download data  http://localhost:7200/repositories/sbc-2/statements
 */


$(document).ready(function(){

    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
    chart.legend = new am4charts.Legend();

    var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    // para tranformar parametros de una lista
    var datosT= [];
    var datosT2= [];
    var textCadena;
    var text2 = "";
    var text = "";
    var chart2 = "";

    var urlData = 'http://localhost:8080/api/scholary_works';
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
                text2 = text2 + data[i].lenguaje ;
                var languaje = "";
                languaje1 = data[i].lenguaje;
                datosT2.push({
                    "name": data[i].nameCreador,
                    "value":1
                });

                // para la lista de los datos chart
                datosT.push({
                    "name": data[i].tipo,
                    "children":datosT2
                });







                i++;

            });//end each ids
            console.log(datosT)

            networkSeries.data = datosT;

            networkSeries.dataFields.linkWith = "linkWith";
            networkSeries.dataFields.name = "name";
            networkSeries.dataFields.id = "name";
            networkSeries.dataFields.value = "value";
            networkSeries.dataFields.children = "children";

            networkSeries.nodes.template.tooltipText = "{name}";
            networkSeries.nodes.template.fillOpacity = 1;

            networkSeries.nodes.template.label.text = "{name}"
            networkSeries.fontSize = 8;
            networkSeries.maxLevels = 2;
            networkSeries.maxRadius = am4core.percent(6);
            networkSeries.manyBodyStrength = -16;
            networkSeries.nodes.template.label.hideOversized = true;
            networkSeries.nodes.template.label.truncate = true;


        },
        error: function (data) {
            alert('Error');
        }
    });//end ajax
});


function configureLoadingScreen(screen){
    $(document)
        .ajaxStart(function () {
            screen.fadeIn();
        })
        .ajaxStop(function () {
            screen.fadeOut();
        });
}

