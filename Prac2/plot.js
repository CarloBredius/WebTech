// JavaScript code for the plot page
function onClick() {
    alert(this.getAttribute("id") + " click event handled");
}
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
        if (bubbleUp) { // when capturing (bubbling down)
            t.innerHTML = "Capturing";
            for (var i = 0; i < layers.length; i++) {
                layers[i].removeEventListener("click", onClick, false);
                layers[i].addEventListener("click", onClick, true);
            }
        }
        else { // when bubbling up
            t.innerHTML = "Bubbling";
            for (var i = 0; i < layers.length; i++) {
                layers[i].removeEventListener("click", onClick, true);
                layers[i].addEventListener("click", onClick, false);
            }
        }
    });
});