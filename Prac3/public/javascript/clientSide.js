// JavaScript source code on client side
var productAmount = 10;
var ordered = "name";
var searchProduct = "";
var filter = "none";
var loggedIn = false; 

// load products and eventlisteners when the document is ready
$(document).ready(function () {
    // Fill screen with 10 products initially
    GetProducts();
    CheckLogin();

    document.getElementById("loginButton").addEventListener("click", function (evt) {
        loggedIn = true;
        CheckLogin();
    });
    document.getElementById("logoutButton").addEventListener("click", function (evt) {
        loggedIn = false;
        CheckLogin();
    });

    // check session
    // https://stackoverflow.com/questions/5968196/check-cookie-if-cookie-exists


    document.getElementById("search").addEventListener("click", function (evt) {
        searchProduct = document.getElementById("lookup").value;
        console.log(this.id + ": " + searchProduct);
        GetProducts();
    });

    // Give buttons functionality
    $("#showproducts").on("click", "button", function () {
        var productId = $(this).parent().attr('data-productId');
        var productPrice = $(this).parent().attr('data-productPrice');
        //var productPrice = $(this).parent().children("#price");
        var txt;
        var buy = confirm("Are you sure you want to buy " + productId + " for $" + productPrice + ",- ?");
        if (buy == true) {
            //TODO: get user from session
            txt = productId + " is added to " + "logged-in user" + " history.";
            // Store product in bought history
            post('/transaction', { username: 'Chantal', productname: productId });
        }
        else {
            txt = "Declined"
        }
        alert(txt);
    });

    document.getElementById("order").addEventListener("change", function (evt) {
        ordered = this.value;
        GetProducts();
    });

    document.getElementById("more").addEventListener("click", function () {
        // change if database size changes, (Could Do: get dbsize instead of hardcode with get)
        if (productAmount <= 20) {
            productAmount += 10;
        }
        GetProducts();
    });
    document.getElementById("less").addEventListener("click", function () {
        if (productAmount >= 10) {
            productAmount -= 10;
        }
        GetProducts();
    });
});
// post from client side js 
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.
    // create form to make post request
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}

function CheckLogin() {
    if (loggedIn) {
        $("#loggedInText").show();
        $("#loginform").hide();
        $("#registerText").hide();
    }
    else {
        $("#loggedInText").hide();
        $("#loginform").show();
        $("#registerText").show();
    }
}

// function to get products from the database using an ajax call fetching in json
// which products are fetched depend on the paramters filled in in the search options
// these products are then showed on the page using generated html code
function GetProducts() {
    $.ajax({
        method: "GET",
        data: { orderby: ordered, lookup: searchProduct, amount: productAmount, page: 1 },
        contentType: "application/json",
        url: "./products",
        success: function (result) {
            str = "";
            for (var i = 0; i < result.length; i++) {
                str += "<article data-productId='" + result[i].name + "' data-productPrice='" + result[i].price +"'>" +
                    "<h2>" + result[i].name + "</h2>" +
                    "<img src='public/media/" + result[i].image + "' alt='" + result[i].name + "'><br />" +
                    "Category: " + result[i].category + "<br />" +
                    "Description: " + result[i].description + "<br />" +
                    "Price: $" + result[i].price + ",-</div><br />" +
                    "Manufacturer: " + result[i].manufacturer + "<br />" +
                    "<button>Buy</button>" +
                    "</article> \n";
            }
            $("#showproducts").html(str);
        }
    });
}