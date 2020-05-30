const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const passport = require('passport-local');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Firedragon12',
  database: 'my_db'
})
connection.connect()
connection.query('use database piper');

	
const auth = (user, pass) => {
	connection.query('SELECT pass from piper_auth where user=\''+user + '\'', function (err, rows, fields) {
	  if (err) throw err

	  	if(rows.length == 0)
	  		return false;
	  	else if(rows[0].pass != pass)
	  		return false;
	  	else 
	  		return true;
	});

	connection.end()
}

passport.use('local-login', new LocalStrategy({
        usernameField : 'user',
        passwordField : 'pass',
    },
    function(user, pass, done) {
        connection.query("SELECT pass FROM piper_auth WHERE user = '" + user + "'", (err,rows) => {
			if (err)
                return done(err);
			if (!rows.length) {
                return done(null, false); 
            } 
			
			if (!( rows[0].password == password))
                return done(null, false); 
			
            // all is well, return successful user
            return done(null, rows[0]);			
	});
	
}));

router.post('/', 
	passport.authenticate('local', { failureRedirect: '/login' }),
 	function(req, res) {
    	res.redirect('/');
});

  //   passport.serializeUser(function(user, done) {
		// done(null, user.id);
  //   });

  //   passport.deserializeUser(function(id, done) {
		// connection.query("select * from piper_auth where user = "+ id, function(err,rows){	
		// 	done(err, rows[0]);
		// });
  //   });
	
    

  //    passport.use('local-signup', new LocalStrategy({
  //       // by default, local strategy uses username and password, we will override with email
  //       usernameField : 'user',
  //       passwordField : 'pass',
  //       passReqToCallback : true // allows us to pass back the entire request to the callback
  //   },
  //   function(req, user, pass, done) {

  //   	connection.query("select pass from piper_auth where user=" + user, (err, rows) => {
  //   		if(err)	{
  //   			return done(err);
  //   		}
  //   	});

		// connection.query("select * from users where email = '"+email+"'",function(err,rows){
		// 	console.log(rows);
		// 	console.log("above row object");
		// 	if (err)
  //               return done(err);
		// 	 if (rows.length) {
  //               return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
  //           } else {

		// 		// if there is no user with that email
  //               // create the user
  //               var newUserMysql = new Object();
				
		// 		newUserMysql.email    = email;
  //               newUserMysql.password = password; // use the generateHash function in our user model
			
		// 		var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
		// 			console.log(insertQuery);
		// 		connection.query(insertQuery,function(err,rows){
		// 		newUserMysql.id = rows.insertId;
				
		// 		return done(null, newUserMysql);
		// 		});	
  //           }	
		// });
    // }));

