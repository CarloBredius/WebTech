#!/usr/bin/env nodejs

var http = require('http');
var express = require('express');
var session = require('client-sessions');
var app = express();

// stuff to work with database safer
var fs = require("fs");
var file = __dirname + "/" + "Database.db";
var exists = fs.existsSync(file);
if (!exists) {
    fs.openSync(file, "w");
}
//import SQLite3
var sqlite3 = require("sqlite3").verbose();

// allow usage of html pages in html folder
app.use("/", express.static(__dirname + "/html"));
// allow usage of pictures in media folder
app.use("/media", express.static(__dirname + "/media"));
// allow usage of stylesheets in css folder
app.use("/css", express.static(__dirname + "/css"));

// use session  for handling log in
// https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    // total time before cookie needcs to be set again
    duration: 30 * 60 * 1000,
    // extend duration when the use sends anotehr request
    activeDuration: 5 * 60 * 1000,
}));

class User {
    constructor(name, password, address, zipcode, email) {
        this.name = name;
        this.password = password;
        this.address = address;
        this.zipcode = zipcode;
        this.email = email;
    }
}
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
Hololens = new Product("Hololens", "Looking into the future", "$3000,-", "Virtual Reality", "Microsoft", "Hololens.png");
Carlo = new User("Carlo", "test", "address", "3571AD", "c.bredius@live.nl");

// Connect to the DB file
function connectToDB() {
    return new sqlite3.Database(file);
}

var db = connectToDB();
db.serialize(function () {
    createTables();
    insertIntoUserDB(Carlo);
    insertIntoProductDB(Hololens);
    readDB("Users");
    readDB("Products");
});
db.close();

function createTables() {
    // serialized mode
    db.serialize(function () {
        // if new DB file
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
function insertIntoUserDB(user) {

    db.serialize(function () {
        db.run("INSERT INTO Users(name, password, address, zipcode, email) " +
            "VALUES('" + user.name +
            "', '" + user.password +
            "', '" + user.address +
            "', '" + user.zipcode +
            "', '" + user.email + "')",
            function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });
    });
}
// insert user into database
function insertIntoProductDB(product) {
    db.serialize(function () {
        //TODO: if already exists
        db.run("INSERT INTO Products(name, description, price, category, manufacturer, image) " +
            "VALUES('" + product.name +
            "', '" + product.description +
            "', '" + product.price +
            "', '" + product.category +
            "', '" + product.manufacturer +
            "', '" + product.image + "')",
            function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });
    });
}

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

// Onderaan houden
http.createServer(app).listen(8051, 'localhost');
