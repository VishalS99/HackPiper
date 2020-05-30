const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'piper'
})
router.post('/', (req, res) => {
	const itemId = req.query.itemId;
	const uid = req.query.userId;
	const insert_query = "INSERT INTO item_cart values (" + itemId + "," + uid ")";	
	connection.connect()
	connection.query('use  piper');
	connection.query(insert_query, (err, res) => {
		if(err)	{
			res.status(500).json({err: err});
			connection.close();
			return;
		}	
		console.log("result added");
		connection.close();
		res.status(203).json({err: null});
	});
	
});