
const urlbase = 'http://localhost:8080/'
const q2 = urlbase + 'api/q2';

var datosT= [];

function dibujar() {
	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end
	// Create chart instance
	var chart = am4core.create("chartdiv", am4charts.XYChart);
	// Add data
	//	
	chart.data = datosT
	// Create axes

	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.dataFields.category = "tipo";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.minGridDistance = 30;

	categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
	  if (target.dataItem && target.dataItem.index & 2 == 2) {
	    return dy + 25;
	  }
	  return dy;
	});

	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

	// Create series
	var series = chart.series.push(new am4charts.ColumnSeries());
	series.dataFields.valueY = "cantidad";
	series.dataFields.categoryX = "tipo";
	series.name = "cantidad";
	series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
	series.columns.template.fillOpacity = .8;

	var columnTemplate = series.columns.template;
	columnTemplate.strokeWidth = 2;
	columnTemplate.strokeOpacity = 1;

	}

$(document).ready(function(){

	var screen = $('#loading-screen');
	configureLoadingScreen(screen);
	//tabla_publicaciones = document.getElementById("tabla_publicaciones");
	q_2();
	//dibujar();
	
	
	
});


function q_2(){
	fetch(q2)
    .then(res => res.json())
    .then((datos) => {
		for(let valor of datos){
			datosT.push({
				"tipo": valor.tipo,
				"cantidad": Number(valor.cantidad)
			});
			console.log(datosT)
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


