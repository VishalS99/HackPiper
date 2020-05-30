var express = require("express");
var app = express();
var session = require("express-session");
var router = express.Router();
var mysql = require("mysql");
var cookieParser = require("cookie-parser");

const { connection } = require("./sqlConfig");

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
  var name = req.body.user;
  var password = req.body.password;
  var email = req.body.email;
  var bill = req.body.billing;
  console.log(name, password, email);
  // var name = req.body.name;
  if (email && password && name) {
    console.log("dfj");
    connection.query(
      "SELECT * FROM User WHERE email = ?",
      [email],
      (err, user) => {
        console.log("djk");
        if (err) throw err;
        console.log(user);
        if (user.ID) {
          res.send("User already exists");
        } else {
          let UUID = Math.floor(Math.random() * 100);
          let CUID = Math.floor(Math.random() * 100);
          connection.query(
            "INSERT INTO carts VALUES (?)",
            [CUID],
            (err, cart) => {
              if (err) throw err;
            }
          );
          connection.query(
            "INSERT INTO User VALUES(?,?,?,?,?,?)",
            [UUID, name, email, password, CUID, bill],
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
  var email = req.body.email;
  var password = req.body.pass;
  console.log(email, password);
  if (email && password) {
    connection.query(
      "SELECT * FROM User WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        if (results.length > 0) {
          // sess.loggedin = true;
          // console.log(req.session);
          // sess.user = username;
          res.cookie("user", results);
          res.redirect("/home");
        } else {
          res.send("Incorrect Email and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Email and Password!");
    res.end();
  }
});
module.exports = router;
