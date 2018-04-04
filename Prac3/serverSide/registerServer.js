// server side register
//var db = new sqlite3.Database(file);

module.exports = {
    insertUser: insertIntoUserDB
}

// insert user into database
function insertIntoUserDB(user) {

    Console.log("potato");
    // TODO: secutiry against injections
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