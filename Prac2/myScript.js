// JavaScript source code

function contextMenu() {
    document.getElementById("dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.contexbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
// Context menu options
function Colorize() {
    document.getElementById("changetext").style.color = "red";
    document.getElementById("changetext").style.backgroundColor = "lightgreen";
}

function bold() {
    document.getElementById("changetext").style.fontWeight = "bold";
}
function underline() {
    document.getElementById("changetext").style.textDecoration = "underline";
}

function reset() {
    document.getElementById("changetext").removeAttribute('style');
}

// Boolean to toggel bubbling up or bubbling down

function onClick () {
    alert(this.getAttribute("id") + " click event handled");
}

// Event propagation
$(document).ready(function () {
    document.querySelector(".propagatelist").addEventListener("click", function (e) {
        e.target.classList.toggle("bluetext");
    });
    document.getElementById("item2").addEventListener('click', function (e) {
        e.target.classList.toggle('largerfont');
    });
    document.getElementById("item3").addEventListener('click', function (e) {
        e.target.classList.toggle('largerfont');
        e.stopPropagation();
    });

    // Values before a button is clicked
    let bubbleUp = false;
    var layers = document.getElementById("alerts").getElementsByTagName("div");
    for (var i = 0; i < layers.length; i++) {
        layers[i].addEventListener("click", onClick, false);
    }
    // When button is clicked
    document.querySelector('#propButton').addEventListener('click', function (ev) {
        bubbleUp = !bubbleUp;
        let t = ev.target;
        if (bubbleUp) {
            t.innerHTML = "Capturing";
            for (var i = 0; i < layers.length; i++) {
                layers[i].removeEventListener("click", onClick, false);
                layers[i].addEventListener("click", onClick, true);
            }
        }
        else {
            t.innerHTML = "Bubbling";
            for (var i = 0; i < layers.length; i++) {
                layers[i].removeEventListener("click", onClick, true);
                layers[i].addEventListener("click", onClick, false);
            }
        }
    });




});

// Graph using Flot
$(function () {
    // Distance between bars
    var diff = 0.125;
    // Data
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
    // Plot options
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
    // Tooltip configuration
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
                        "$" + y + " Billion");
                }
            } else {
                $("#tooltip").remove();
                prevPoint = null;
            }
        });
    };
    // Checkboxes for plot
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
    // Fire the function
    plotChoices();
    // Generate style for tooltip
    function showTooltip(x, y, color, contents) {
        $('<div id="tooltip">' + contents + '</div>').css({
            position: 'absolute',
            top: y - 30,
            left: x + 10,
            border: '2px solid ' + color,
            padding: '2px',
            'font-size': '12px',
            'border-radius': '5px',
            'background-color': 'white',
            'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
            opacity: 0.8
        }).appendTo("body").fadeIn(200);
    }
});
// bron: https://infographic.statista.com/normal/chartoftheday_6677_the_worldwide_virtual_reality_market_is_set_to_be_huge_n.jpg



