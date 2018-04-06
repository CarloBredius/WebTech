// JavaScript source code on client side
$(document).ready(function () {
    var amountproducts = 10;

    document.getElementById("more").addEventListener("click", function () {
        alert("test");
        console.log("more clicked");
        amountproducts = 20;
        //GetProducts();
    });
    GetProducts();
});

function GetProducts() {
    $.ajax({
        method: "GET",
        data: { orderby: "name", amount: amountproducts, page: 1 },
        contentType: "application/json",
        url: "./products",
        success: function (result) {
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<article>" +
                    "<h2>" + result[i].name + "</h2>" +
                    "<img src='media/" + result[i].image + "' alt='" + result[i].name + "'><br />" +
                    result[i].description + "<br />" +
                    result[i].price + "<br />" +
                    result[i].manufacturer + "<br />" +
                    "<button>buy</button>" +
                    "</article>";
            }
            $("#showproducts").html(str);
        }
    });
}

function GetMoreProducts() {
    $.ajax({
        method: "GET",
        data: { orderby: "name", amount: 20, page: 1 },
        contentType: "application/json",
        url: "./products",
        success: function (result) {
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<article>" +
                    "<h2>" + result[i].name + "</h2>" +
                    "<img src='media/" + result[i].image + "' alt='" + result[i].name + "'><br />" +
                    result[i].description + "<br />" +
                    result[i].price + "<br />" +
                    result[i].manufacturer + "<br />" +
                    "<button>buy</button>" +
                    "</article>";
            }
            $("#showproducts").html(str);
        }
    });
}