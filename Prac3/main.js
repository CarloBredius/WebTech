#!/usr/bin/env nodejs

var http = require('http');
var express = require('express');
var app = express();
app.use("/", express.static(__dirname + "/html"));
app.use("/media", express.static(__dirname + "/media"));
app.use("/css", express.static(__dirname + "/css"));

// Onderaan houden
http.createServer(app).listen(8051, 'localhost');
