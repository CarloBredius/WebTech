#!/usr/bin/env nodejs

// make use of libraries
var http = require('http');
var express = require('express');
var session = require('client-sessions');
const bodyParser = require('body-parser');
//set up logger
var logger = require('http-logger');
logger({
    file: 'logFile'
});

// create the app
var app = express();

// let app use the following
app.use(logger());
app.use(bodyParser.urlencoded({ extended: true }));

// stuff to work with database safer
var fs = require("fs");
var file = __dirname + "/serverSide/Database.db";
var exists = fs.existsSync(file);
if (!exists) {
    fs.openSync(file, "w");
}
//import SQLite3
const sqlite3 = require("sqlite3").verbose();

// allow usage of html pages in html folder
app.use("/", express.static(__dirname + "/public/html"));
// allow usage of pictures in media folder
app.use("/public/media", express.static(__dirname + "/public/media"));
// allow usage of stylesheets in css folder
app.use("/css", express.static(__dirname + "/public/css"));
// allow usage of separate javascript files in javascript folder
app.use("/javascript", express.static(__dirname + "/public/javascript"));

// use session  for handling log in
// https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions
// TODO: wanneer log in, cookie appenden met username and encrypted password (zoek voor express)
app.use(session({
    cookieName: 'session',
    secret: 'mashedpotato',
    // total time before cookie needcs to be set again
    duration: 30 * 60 * 1000,
    // extend duration when the user does something
    activeDuration: 5 * 60 * 1000,
}));

//class for a product
class Product {
    constructor(name, description, price, category, manufacturer, image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.manufacturer = manufacturer;
        this.image = image;
    }
}

// Connect to the DB file
function connectToDB() {
    return new sqlite3.Database(file);
}

//function to create user and product table
function createTables() {
    db.serialize(function () {
        // if the database file exists
        if (!exists) {
            // create tables, not accepting duplicate (names)
            db.run("CREATE TABLE Users " +
                "(name TEXT NOT NULL PRIMARY KEY, " +
                "password TEXT NOT NULL, " +
                "address TEXT NOT NULL, " +
                "zipcode TEXT NOT NULL, " +
                "email TEXT NOT NULL)");
            db.run("CREATE TABLE Products " +
                "(name TEXT NOT NULL PRIMARY KEY, " +
                "description TEXT NOT NULL, " +
                "price INTEGER NOT NULL, " +
                "category TEXT NOT NULL, " +
                "manufacturer TEXT NOT NULL, " +
                "image TEXT NOT NULL)");

            console.log("Tables created \n");
        }
    });
}

// insert user into database
function insertIntoProductDB(product) {
    var sql = "INSERT INTO Products(name, description, price, category, manufacturer, image) VALUES(?, ?, ?, ?, ?, ?)"
    db.all(sql, [product.name, product.description, product.price, product.category, product.manufacturer, product.image], (err, rows) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
}
// Function to log a table to the console
function readDB(table) {
    db.each("SELECT * FROM " + table, function (error, row) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(row);
        }
        console.log("\n");
    });
}
// class for a user
class User {
    constructor(name, password, address, zipcode, email) {
        this.name = name;
        this.password = password;
        this.address = address;
        this.zipcode = zipcode;
        this.email = email;
    }
}
// Handle post request for registering a user using ajax
app.post("/register", function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var address = req.body.address;
    this.zipcode = req.body.zipcode;
    this.email = req.body.email;
    console.log("New user data: " + name + ' ' + password + ' ' + address + ' ' + zipcode + ' ' + email);
    // check if password matches the repassword
    if (password === repassword) {
        console.log("Passwords match.");
        // create user object
        newUser = new User(name, password, address, zipcode, email);

        // open database file
        var db = connectToDB();
        // insert new user into database
        var sql = "INSERT INTO Users(name, password, address, zipcode, email) VALUES(?, ?, ?, ?, ?)"
        db.all(sql, [newUser.name, newUser.password, newUser.address, newUser.zipcode, newUser.email], (err, rows) => {
            // .close inside callback to close after query has ended
            db.close();

            if (err) {
                console.log(err);
                throw err;
            }
            else {
                res.redirect(200, "index.html");
            }
        });

    }
    else { // if password and repassword don't match
        console.log("passwords do not match.");
        res.redirect(400, "register.html");
    }
});
// log in procedure
app.post("/login", function (req, res) {
    var db = connectToDB();
    var sql = "SELECT * FROM Users WHERE (name == ?) AND (password == ?)"
    var name = req.body.username;
    db.all(sql, [name, req.body.password], function (err, rows) {
        db.close();
        // check if user exists
        if (!rows.length) {
            console.log("Name or password wrong");
            res.redirect(400, "index.html");
        }
        else {
            rows.forEach(function (row) {
                console.log('Login Succes');
                req.session.username = name;
                //res.send('Welcome ' + req.session.username);
                res.sendFile('public/html/index.html', { root: __dirname })
            });
        }
    });
});
// log out procedure
app.get('/logout', function (req, res) {
    req.session.reset();
});

// Parameterizing strings in expressions don't work in sqlite3, so use whitelist
// source: https://stackoverflow.com/questions/25374386/parameterizing-limit-and-order-in-sqlite3
function whitelist(word) {
    var list = ["name", "price", "category", "description", "manufacturer"]
    return (list.indexOf(word) >= 0);
}
// Handle get request for products using the restrictions from the search options
// using ajax
app.get("/products", function (req, res) {
    // open the database
    let db = new sqlite3.Database(file);
    // check if orderby is on whitelist
    if (!whitelist(req.query.orderby)) {
        throw Error("Not on whitelist");
    }
    let sql = "SELECT * FROM Products WHERE name LIKE ? ORDER BY " + req.query.orderby + " LIMIT ?";
    // using json data
    var jsonData = {};
    db.all(sql, ["%" + req.query.lookup + "%", req.query.amount], (err, rows) => {
        db.close();

        jsonData = JSON.stringify(rows);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(jsonData);
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            //Log each row when products are fetched
            //console.log(row);
        });
    });
});

// Create the server
http.createServer(app).listen(8051, 'localhost');