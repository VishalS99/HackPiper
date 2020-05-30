const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

router.get('', (req, res) => {
    // const template = fs.readFile(path.join('..', 'views', 'shop.ejs'), 'utf-8', (err ,data) => {
    //     if(err) {
    //         res.status(500).json({err: ""+err});
    //     }
       res.render(path.join('..', 'views', 'shop.ejs')); 
    // });
});

module.exports =  {
    shopRoute: router
};