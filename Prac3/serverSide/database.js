// JavaScript code for checking/inserting users into the database on the server side

module.exports = {
    insertUser: insertIntoUserDB,
    checkUser: checkUserInDB
}
// check if user exists is in database
function checkUserInDB(db, name, pass) {
    var sql = "SELECT * FROM users WHERE user = '" + name + "' AND pass = '" + pass + "'";

    connection.query(sql, function (err, results) {
        console.log(results);
        console.log(err);
    });
}
// insert user into database
function insertIntoUserDB(db, user) {
    // TODO: security against injections
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