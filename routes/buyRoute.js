const express = require("express");
const router = express.Router();
const { connection } = require("./sqlConfig");
const { isAuth } = require("./middleware/middleware");

router.post("/", (req, res) => {
  const itemId = req.query.itemId;
  const uid = req.cookie["user"].id;

  const CARTIDFIND = "SELECT cartid from User where id =" + uid;
  let cartId;
  connection.query(CARTIDFIND, (err, rows) => {
    if (err || rows == null || rows == undefined || rows.length == 0) {
      console.log(err);
      res.status(500).json({ error: err });
      return;
    }
    const r = JSON.parse(JSON.stringify(rows));
    const insert_query =
      "INSERT INTO item_cart values (" + itemId + "," + r[0].cartid + ")";

    connection.query(insert_query, (err, result) => {
      if (err) {
        res.status(500).json({ err: err });
        return;
      }
      console.log("result added");
      res.status(203).json({ err: null });
    });
  });
});

module.exports = {
  buyRoute: router,
};
