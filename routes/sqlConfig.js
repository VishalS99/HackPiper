const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "vishal",
  password: "vishal1999",
  database: "piedpiper",
});

module.exports = {
  connection,
};
