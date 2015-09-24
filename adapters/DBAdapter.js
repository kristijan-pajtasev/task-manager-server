var mysql      = require('mysql');
var connection = mysql.createConnection(require("../config/dbconfig"));
 
connection.connect();

module.exports = connection;