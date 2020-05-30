const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('mysql');
// const passport = require('passport-local');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'piper'
})
connection.connect()
connection.query('use  piper');

/* returns items_list = [items_ids, ...] for userId  */
router.get('/', (req, res) => {
	const uid = req.query.userId;
	const CARTIDFIND = "SELECT cartid from user where id =" + uid;
	let items_list = [];
	console.log(CARTIDFIND);

	connection.query(CARTIDFIND, (err, rows) => {
		if(err || rows==null || rows==undefined || rows.length==0)	{
			console.log(err);
			connection.end();
			res.status(500).json({error: err});
			return;
		}
		// rows[0].cartid is the id	
		console.log("userid: " + uid + " cartid: " + JSON.stringify(rows));
		const jsonStr = JSON.stringify(rows);
		const newRows = JSON.parse(jsonStr);

		console.log("firzt: ", newRows[0]);
		const ITEMS_FIND = "SELECT item from item_cart where cart = " + newRows[0].cartid;

		connection.query(ITEMS_FIND, (e, r) => {
			if(e || r.length == 0)	{
				res.status(404).json({e: e, lines: r.length});
				connection.end();
				return;
			}
			rows = JSON.parse(JSON.stringify(r));
			items_list = rows.map(i => i.item);
			// const price_list = [];
			connection.end();	
			res.status(200).json({items_list});
		});
		
		
		// return {rows, fields};
	});
	
    
});

module.exports =  {
    cartRoute: router
};