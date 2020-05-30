const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const mysql = require("mysql");
const isAuth = require("./middleware/middleware");

const connection = mysql.createConnection({
  host: "localhost",
  user: "vishal",
  password: "vishal1999",
  database: "piedpiper",
});

router.post("/", isAuth, (req, res) => {
  const itemId = req.query.itemId;
  const uid = req.cookies["user"].ID;
  connection.connect();

  const CARTIDFIND = "SELECT cartid from user where id =" + uid;
  let cartId;
  connection.query(CARTIDFIND, (err, rows) => {
    if (err || rows == null || rows == undefined || rows.length == 0) {
      console.log(err);
      connection.end();
      res.status(500).json({ error: err });
      return;
    }
    const r = JSON.parse(JSON.stringify(rows));
    const insert_query =
      "INSERT INTO item_cart values (" + itemId + "," + r[0].cartid + ")";

    connection.query(insert_query, (err, result) => {
      if (err) {
        res.status(500).json({ err: err });
        connection.end();
        return;
      }
      console.log("result added");
      connection.end();
      res.status(203).json({ err: null });
    });
  });
});

module.exports = {
  buyRoute: router,
};
