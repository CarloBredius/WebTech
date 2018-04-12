var onHeaders = require('on-headers');
var onFinished = require('on-finished');
var fs = require('fs');
var path = require('path');
var options = {
        dir: 'http_logger',
        file: 'http_logger.log',
        dateWise: false
    },
    fomart, todayDate = String(),
    currentDate,
    monthsName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

module.exports = app;

/**
 * [app middleware]
 * @return {function} [middleware]
 */
function app() {
    if (arguments.length > 0) {
        if (typeof arguments[0] !== 'object') {
            throw new TypeError('Argument format must be a object');
        }
        //Validate options provided
        validateOptions(arguments[0]);
    }

    return function(req, res, done) {
        //0. Check directory exists
        checkFolderExists(options.dir);

        currentDate = new Date();

        function logRequest() {

            fomart = ':method :statusCode :url :date :response-time\n';
            fomart = fomart.replace(':method', req.method);
            fomart = fomart.replace(':url', formatUrl(req));
            fomart = fomart.replace(':statusCode', res.statusCode);
            fomart = fomart.replace(':date', formatDate(new Date()));
            fomart = fomart.replace(':response-time', responseTime(res));
            fs.appendFile(path.join(options.dir, options.file), fomart, 'utf8', function(err) {
                if (err) throw err;
            });
        }

        //1. Log Response Start
        onHeaders(res, logTime);


        //2. log when response finished
        onFinished(res, logRequest);

        done();
    }
}
/**
 * [validateOptions purify options if provided]
 * @param  {Object} opt [options provided]
 * @return {Object}     [filtered options]
 */
function validateOptions(opt) {
    if (opt) {
        if (opt.hasOwnProperty('dir')) {
            if (opt.dir.length < 1 || typeof opt.dir !== 'string') {
                throw new TypeError('dir value must be a valid string');
            }
            if (!isValidString(opt.dir)) {
                throw new TypeError('only underscore is allowed in dir name');
            }
            options.dir = opt.dir || options.dir;
        }


        if (opt.hasOwnProperty('file')) {
            if ((opt.file.length < 1 || typeof opt.file !== 'string')) {
                throw new TypeError('file value must be a valid string');
            }
            if (!isValidString(opt.file)) {
                throw new TypeError('only underscore is allowed in file name');
            }
            options.file = opt.file || options.file;
        }

        if (opt.hasOwnProperty('dateWise')) {
            if (typeof opt.dateWise !== 'boolean') {
                throw new TypeError('dateWise must be a boolean');
            }
            options.dateWise = opt.dateWise || options.dateWise;
        }
    }
    if (options.dateWise === true) {
        todayDate = todayDate.concat(new Date().getDate(), '_', monthsName[new Date().getMonth()], '_', new Date().getFullYear());
        if (options.file.indexOf('.log') === -1) {
            options.file = String().concat(options.file, '_', todayDate, '.log');
        } else {
            options.file = String().concat(options.file, '_', todayDate);
        }

    } else {
        if (options.file.indexOf('.log') === -1) {
            options.file = String().concat(options.file, '.log');
        } else {
            options.file = String().concat(options.file);
        }
    }
    return options;
}

/**
 * [logTime Log the time in miliseconds]
 * @return {function} []
 */
function logTime() {
    if (typeof this.setHeader === 'function') {
        return this.setHeader('X-Response-Time', new Date - currentDate + ' ms');
    }
}
/**
 * [checkFolderExists Check if log folder is present, if not create new one]
 * @param  {String} folder [foldername]
 * @return {function}       []
 */
function checkFolderExists(folder) {
    if (!fs.existsSync(folder)) {
        return fs.mkdirSync(folder);
    }
}

function isValidString(str) {
    return !/[~`.!#$%\^&*+=\-\[\]\\';,/{}|\s\\":<>\?]/g.test(str);

}

function formatDate(d) {
    var date = d.getDate();
    var hour = d.getUTCHours();
    var mins = d.getUTCMinutes();
    var secs = d.getUTCSeconds();
    var year = d.getUTCFullYear();
    var month = monthsName[d.getUTCMonth()];
    return pad(date, 1) + '-' + month + '-' + year + 'T' + pad(hour, 1) + ':' + pad(mins, 1) + ':' + pad(secs, 1) + ' +0000';
}

function responseTime(res) {
    if (typeof res.getHeader === 'function') {
        return res.getHeader('X-Response-Time');
    }
    return undefined;
}

function formatUrl(req) {
    var format;

    if (req.protocol && req.headers.host) {
        format = req.protocol + '://' + req.headers.host;
    }

    if (req.url || req.originalUrl) {
        format += req.url || req.originalUrl;
    }
    return format;
}


function pad(num, step) {
    num = String(num);
    if (num.length !== 1) {
        return num;
    }
    var zeroes = '';
    for (var i = step - 1; i >= 0; i--) {
        zeroes = zeroes + '0';
    }
    return zeroes + num;

}

