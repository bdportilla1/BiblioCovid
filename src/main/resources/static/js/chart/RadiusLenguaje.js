//RadiusLenguaje
/**
 * Created by diepinto30 and bdportilla1 on 13/07/2020.
 * Download data  http://localhost:7200/repositories/sbc-2/statements
 */

/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

$(document).ready(function(){
    // Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    var textCadena;
    var text2 = "";


    var urlData = 'http://localhost:8080/api/q3';
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
                text2 = text2 + data[i].language ;

                i++;
            });//end each ids
            chart.data = [
                {
                    country: "Lithuania",
                    value: 260
                },
                {
                    country: "Czechia",
                    value: 230
                },
                {
                    country: "Ireland",
                    value: 200
                },
                {
                    country: "Germany",
                    value: 165
                },
                {
                    country: "Australia",
                    value: 139
                },
                {
                    country: "Austria",
                    value: 128
                }
            ];

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

