const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const { connection } = require('./sqlConfig');

router.post('/', (req, res) => {
	const itemId = req.query.itemId;
	const uid = req.query.userId;

	const CARTIDFIND = "SELECT cartid from user where id =" + uid;
	let cartId;
	connection.query(CARTIDFIND, (err, rows) => {
		if(err || rows==null || rows==undefined || rows.length==0)	{
			console.log(err);
			res.status(500).json({error: err});
			return;
		}
		const r = JSON.parse(JSON.stringify(rows));
		const insert_query = "INSERT INTO item_cart values (" + itemId + "," + r[0].cartid + ")";	
	
		connection.query(insert_query, (err, result) => {
			if(err)	{
				res.status(500).json({err: err});
				return;
			}	
			console.log("result added");
			res.status(203).json({err: null});
		});
	});
});

module.exports =  {
    buyRoute: router
};