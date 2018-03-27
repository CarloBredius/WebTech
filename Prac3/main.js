#!/usr/bin/env nodejs

var http = require('http');
var express = require('express');
var session = require('client-sessions');
var app = express();

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

// Onderaan houden
http.createServer(app).listen(8051, 'localhost');
