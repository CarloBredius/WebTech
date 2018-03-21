#!/usr/bin/env nodejs

var http = require('http');
var filesystem = require('fs');

http.createServer(function (req, res) {
    handleRequests(req, res);

    var filePath = path.join("media", 'Hololens.png');
    var stat = fileSystem.statSync(filePath);

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end('Hello group 56.\n');

}).listen(8051, 'localhost');

function handleRequests(req, res) {
    console.log(req);

    switch (req) {
        case "GET":
            // respond met object en alle cases of dat object er is, of het mag etc.
            // hier komt een <head> en een <body>
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