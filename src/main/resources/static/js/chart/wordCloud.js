/**
 * Created by diepinto30 and bdportilla1 on 13/07/2020.
 * Download data  http://localhost:7200/repositories/sbc-2/statements
 */
$(document).ready(function(){
    am4core.useTheme(am4themes_animated);

    var screen = $('#loading-screen');
    configureLoadingScreen(screen);

    var textCadena;
    var text2 = "";


    var urlData = 'http://localhost:8080/api/q1';
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
                text2 = text2 + data[i].titulo ;

                i++;
            });//end each ids


            textCadena = text2;
            console.log(textCadena)

            var chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
            var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

            series.accuracy = 4;
            series.step = 15;
            series.rotationThreshold = 0.7;
            series.maxCount = 200;
            series.minWordLength = 2;
            series.labels.template.margin(4,4,4,4);
            series.maxFontSize = am4core.percent(30);

            series.text = textCadena;
            series.colors = new am4core.ColorSet();
            series.colors.passOptions = {}; // makes it loop

            //series.labelsContainer.rotation = 45;
            series.angles = [0,-90];
            series.fontWeight = "1000"

            setInterval(function () {
                series.dataItems.getIndex(Math.round(Math.random() * (series.dataItems.length - 1))).setValue("value", Math.round(Math.random() * 10));
            }, 10000000)


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





