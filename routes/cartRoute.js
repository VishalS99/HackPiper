const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const { connection } = require('./sqlConfig');

const findCart = uid => {
	return new Promise((resolve, reject) => {
		const CARTIDFIND = "SELECT cartid from user where id =" + uid;
		let cartId;
		connection.query(CARTIDFIND, (err, rows) => {
			if(err || rows==null || rows==undefined || rows.length==0)	{
				console.log(err);
				console.log("yay");
				reject(err);
			}
			const r = JSON.parse(JSON.stringify(rows));
			console.log("yo");
			resolve(r[0].cartid);
		});
	});
}

const findItems = cartid => {
	return new Promise((resolve, reject) => {
		console.log("lol",cartid);
		const ITEMS_FIND = "SELECT item from item_cart where cart = " + cartid;
		connection.query(ITEMS_FIND, (e, r) => {
			if(e || r.length == 0)	{
				reject(err);
			}
			rows = JSON.parse(JSON.stringify(r));
			items_list = rows.map(i => i.item);
			resolve(items_list);
		});
		
	});
};

const findOneItem = item => {
	return new Promise((resolve, reject) => {
		const FIND_QUERY = "SELECT id, name, price, stocks FROM items where id = " + item;
		connection.query(FIND_QUERY, (e, r) => {
			if(e || r.length==0)	{
				console.log("find error:  ", e);
				reject(e);
			}
			const row = JSON.parse(JSON.stringify(r[0]));
			resolve(row);
		});
	});
};

const getNamePriceList = items_list => {
	return new Promise((resolve, reject) => {
		Promise.all(items_list.map(i => findOneItem(i)))
		.then(result => {
			resolve(result);
		})
		.catch(err => {
			reject(err);
		})
	});
}

router.get('/', (req, res) => {
	const uid = req.query.userId;

	console.log("hey");
	findCart(uid)
	.then(findItems)
	.then(getNamePriceList)
	.then(results => {
		console.log("res", results);
		res.status(200).json({items: results});
	})
	.catch(err => {
		res.status(404).json({err: err});
	})
});


module.exports =  {
    cartRoute: router
};
