var chartData;

$(function(){
  $.ajax({

    url: 'http://localhost:3300/fuelPrices',
    type: 'GET',
    success : function(data) {
      chartData = data;
      //var template = Handlebars.compile($("#tabular-template").html());
      //$("#table-location").html(template(data));

      var chartProperties = {
        "caption": "Dashboard for Petrol and Diesel price in Bangalore",
        "numberprefix": "Rs",
        "xAxisName": "Month",
        "yAxisName": "Price",
        "numberPrefix": "₹",
        "bgColor": "#ffffff",
        "showBorder": "0",
        "showCanvasBorder": "0",
        "plotBorderAlpha": "10",
        "usePlotGradientColor": "0",
        "plotFillAlpha": "50",
        "showXAxisLine": "1",
        "axisLineAlpha": "25",
        "divLineAlpha": "10",
        "showValues": "0",
        "showAlternateHGridColor": "0",
        "captionFontSize": " 14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "toolTipColor": "#ffffff",
        "toolTipBorderThickness": "0",
        "toolTipBgColor": "#000000",
        " toolTipBgAlpha": "80",
        "toolTipBorderRadius": "2",
        "toolTipPadding": "5"
      };

      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var columnChart = new FusionCharts({
        type: 'mscolumn2d',
        renderAt: 'chart-location',
        width: '1000',
        height: '600',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });
      columnChart.render();
    }
  });
});
