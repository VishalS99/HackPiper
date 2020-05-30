var mysql = require("mysql");
var cookieParser = require("cookie-parser");

var connection = mysql.createConnection({
  host: "localhost",
  user: "vishal",
  password: "",
  database: "piedpiper",
});

var express = require("express");
var app = express();
var session = require("express-session");
var router = express.Router();
app.use(
  session({
    secret: "secret",
    // resave: true,
    // saveUninitialized: true,
  })
);

router.post("/auth", function (request, response) {
  var username = request.body.user;
  var password = request.body.pass;
  console.log(username, password);
  if (username && password) {
    connection.query(
      "SELECT * FROM users WHERE user = ? AND pass = ?",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          var sess = request.session;
          // sess.loggedin = true;
          console.log(request.session);
          sess.user = username;
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});
module.exports = router;
