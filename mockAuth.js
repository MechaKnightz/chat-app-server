const Role = require('./_models/role');
const config = require('config');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const pool = mysql.createPool(config.get("dbPoolConfig"));
pool.query('SELECT 1', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

module.exports = {
    authenticate
};

function getUser(id) {
    console.log("id: " + id);
    pool.execute(
        'SELECT * FROM `users` WHERE `id` = ?',
        [id],
        function (err, results, fields) {
            return results; // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
    );
}


function authenticate(token) {
    console.log("token: " + token)
    var decodedToken = jwt.verify(token, config.get("secret"));
    console.log("secret: " + config.get("secret"));
    console.log("decoded token: " + decodedToken);
    var user = getUser(decodedToken.sub);
    console.log("user: " + user)
    return user;
}