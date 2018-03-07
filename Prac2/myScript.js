// JavaScript source code
// Graph using Flot
var dif = 2.5;
var mobileData = [[0 - dif, 0.8], [10 - dif, 2.0], [20 - dif, 3.0], [30 - dif, 5.8], [40 - dif, 8.5]];
var consoleData = [[0, 1.2], [10, 1.8], [20, 4.5], [30, 8.3], [40, 15.6]];
var pcData = [[0 + dif, 1.6], [10 + dif, 2.6], [20 + dif, 4.6], [30 + dif, 8.6], [40 + dif, 16.3]];

var dataset = [
    { label: "Mobile Share", data: mobileData, color: "red" },
    { label: "Console Share", data: consoleData, color: "green" },
    { label: "PC Share", data: pcData, color: "blue"}
]
var ticks = [[0, "2016"], [10, "2017"], [20, "2018"], [30, "2019"], [40, "2020"]];
var options = {
    series: {
        bars: {
            show: true,
            order: 1,
            align: "center",
            barWidth: 2.0
        }
    }, 
    xaxis: {
        //mode: "categories",
        axisLabel: "Year",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10,
        ticks: ticks,
        autoscaleMargin: .10
    },
    yaxis: {
        axislabel: "Money in Billions",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 3
    },
    grid: {
        hoverable: true,
        borderWidth: 2,
        backgroundColor: { colors: ["white", "lightblue"] }
    },
    legend: {
        noColumns: 1,
        labelBoxBorderColor: "black",
        position: "nw"
    }
}

$(document).ready(function () {
    $.plot($("#vrusers"), dataset, options);
});

// bron: https://infographic.statista.com/normal/chartoftheday_6677_the_worldwide_virtual_reality_market_is_set_to_be_huge_n.jpg
// flot: http://www.jqueryflottutorial.com/how-to-make-jquery-flot-bar-chart.html
function onTestClick(clr) {
    var text = document.getElementById("clickText").style.color = clr;
}



