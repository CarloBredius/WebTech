// JavaScript source code

// Graph using Flot

$(function () {
    // Difference between bars
    var diff = 0.125;
    
    var dataset = {
        "average": {
            label: "Average",
            data: [[2016, 1.2], [2017, 2.1], [2018, 4.03], [2019, 7.6], [2020, 13.5]],
            color: "black",
            lines: {
                show: true,
                lineWidth: 1
            }
        },
        "mobile": {
            label: "Mobile",
            data: [[2016 - diff, 0.8], [2017 - diff, 2.0], [2018 - diff, 3.0], [2019 - diff, 5.8], [2020 - diff, 8.5]],
            color: "red",
            bars: {
                show: true,
                align: "center",
                barWidth: 0.1,
                lineWidth: 1
            }
        },
        "console": {
            label: "Console",
            data: [[2016, 1.2], [2017, 1.8], [2018, 4.5], [2019, 8.3], [2020, 15.6]],
            color: "blue",
            bars: {
                show: true,
                align: "center",
                barWidth: 0.1,
                lineWidth: 1
            }
        },
        "pc": {
            label: "PC",
            data: [[2016 + diff, 1.6], [2017 + diff, 2.6], [2018 + diff, 4.6], [2019 + diff, 8.6], [2020 + diff, 16.3]],
            color: "green",
            bars: {
                show: true,
                align: "center",
                barWidth: 0.1,
                lineWidth: 1
            }
        }
    };

    var options = {
        yaxis: {
            min: 0
        },
        xaxis: {
            min: 2015.7,
            max: 2020.3,
            mode: "categories",
            tickDecimals: 0
        },
        grid: {
            hoverable: true,
            borderWidth: 2,
            backgroundColor: { colors: ["white", "lightblue"] }
        },
        legend: {
            noColumns: 1,
            position: "nw"
        }
    }

    // Write code for checkboxes for each dataset
    var choiceBoxes = $("#choiceboxes");
    $.each(dataset, function (key, val) {
        choiceBoxes.append("<br/><input type='checkbox' name='" + key +
            "' checked='checked' id='id" + key + "'></input>" +
            "<label for='id" + key + "'>"
            + val.label + "</label>");
    });

    choiceBoxes.find("input").click(plotChoices);

    var prevPoint = null, prevLabel = null;
    $.fn.UseTooltip = function () {
        $(this).bind("plothover", function (event, pos, item) {
            if (item) {
                if ((prevLabel != item.series.label) || (prevPoint != item.dataIndex)) {
                    prevPoint = item.dataIndex;
                    prevLabel = item.series.label;
                    $("#tooltip").remove();

                    var x = item.datapoint[0];
                    var y = item.datapoint[1];

                    var color = item.series.color;

                    console.log(item);

                    showTooltip(item.pageX, item.pageY, color,
                        "<strong>" + item.series.label + "</strong><br>" +
                        " : <strong> $" + y + "</strong> " + "Billion");
                }
            } else {
                $("#tooltip").remove();
                prevPoint = null;
            }
        });
    };

    function plotChoices() {

        var data = [];
        // Add each checked box to the dataset
        choiceBoxes.find("input:checked").each(function () {
            var key = $(this).attr("name");
            // If data not already in the dataset
            if (key && dataset[key]) {
                data.push(dataset[key]);
            }
        });

        if (data.length > 0) {
            $.plot($("#vrusers"), data, options);
            $("#vrusers").UseTooltip();
        }
    }
    
    plotChoices();

    function showTooltip(x, y, color, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            position: 'absolute',
            display: 'none',
            top: y - 30,
            left: x + 10,
            border: '2px solid ' + color,
            padding: '3px',
            'font-size': '9px',
            'border-radius': '5px',
            'background-color': '#fff',
            'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
            opacity: 0.9
        }).appendTo("body").fadeIn(200);
    }
});

// bron: https://infographic.statista.com/normal/chartoftheday_6677_the_worldwide_virtual_reality_market_is_set_to_be_huge_n.jpg
// flot: http://www.jqueryflottutorial.com/how-to-make-jquery-flot-bar-chart.html
function onTestClick(clr) {
    var text = document.getElementById("clickText").style.color = clr;
}



