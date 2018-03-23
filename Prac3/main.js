#!/usr/bin/env nodejs

var http = require('http');
var express = require('express');
var app = express();
app.use("/media", express.static(__dirname + "/media"));

http.createServer(function (req, res) {
    handleRequests(req, res);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello group 56.\n');
}).listen(8051, 'localhost');

function handleRequests(req, res) {
    switch (req) {
        case "GET":
            // respond met object en alle cases of dat object er is, of het mag etc.
            // hier komt een <head> en een <body>
            console.log(req.url);
            break;
        case "HEAD":
            break;
        case "POST":
            break;
        case "PUT":
            break;
        case "DELETE":
            break;
        case "CONNECT":
            break;
        case "OPTIONS":
            break;
        case "TRACE":
            break;
        default:
    }
}

function handleResources(req, res) {

}