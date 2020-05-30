var mysql = require("mysql");
var cookieParser = require("cookie-parser");

var connection = mysql.createConnection({
  host: "localhost",
  user: "vishal",
  password: "vishal1999",
  database: "piedpiper",
});

var express = require("express");
var app = express();
var session = require("express-session");
var router = express.Router();
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", (req, res) => {
  var username = req.body.user;
  var password = req.body.password;
  console.log(username);
  // var name = req.body.name;
  if (username && password) {
    connection.query(
      "SELECT * FROM users WHERE user = ?",
      [username],
      (err, user) => {
        if (user.ID) {
          res.send("User already exists");
        } else {
          let UUID = Math.floor(Math.random() * 100);
          connection.query(
            "INSERT INTO users VALUES(?,?,?)",
            [UUID, username, password],
            (err, user) => {
              if (err) throw err;
              // console.log(req);
              // console.log(user);
              res.cookie("user", user);
              res.send({
                code: 200,
                success: "Signed in!",
              });
            }
          );
        }
      }
    );
  }
});

router.post("/login", function (req, res) {
  var username = req.body.user;
  var password = req.body.pass;
  console.log(username, password);
  if (username && password) {
    connection.query(
      "SELECT * FROM users WHERE user = ? AND pass = ?",
      [username, password],
      function (error, results, fields) {
        if (results.length > 0) {
          // sess.loggedin = true;
          // console.log(req.session);
          // sess.user = username;
          res.cookie("user", results);
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
