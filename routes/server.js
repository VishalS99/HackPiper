const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { shopRoute } = require('./shopRoute');
const { cartRoute } = require('./cartRoute');
const { buyRoute } = require('./buyRoute');
// const { loginRoute } = require('./loginRoute');
// const { billingRoute } = require('./billingRoute');
// const { devStatusRoute } = require('./devStatusRoute');
// const { signupRoute } = require('./signupRoute');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
// const passport = require('passport');
// const LocalStrategy   = require('passport-local').Strategy;
const app = express();


// app.set('view engine', 'ejs');
// app.use(cors());
// app.use(bodyParser.json());
// app.use(cookieParser());

// app.use("/api/shop", shopRoute);
app.use("/api/cart", cartRoute);
app.use("/api/buy", buyRoute);
// app.use("/api/login", loginRoute);
// app.use("/api/signup", signupRoute);
// app.use("/api/dev/status", devStatusRoute);
// app.use("/api/billing", billingRoute);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'piper'
})
connection.connect()
// connection.query('use piper');

	
app.listen(8000, () => {
    console.log(`Server listening on port 8000`);
});
// // app.use("/api/shop", shopRoute);
// // app.use("/api/cart", cartRoute);
// // app.use("/api/buy", buyRoute);
// // app.use("/api/login", loginRoute);
// // app.use("/api/signup", signupRoute);
// // app.use("/api/dev/status", devStatusRoute);
// // app.use("/api/billing", billingRoute);

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'piper'
// })
// connection.connect()
// connection.query('use piper');

// passport.use(new LocalStrategy({
//         usernameField : 'user',
//         passwordField : 'pass',
//     },
//     function(user, pass, done) {
//         connection.query("SELECT pass FROM piper_auth WHERE user = '" + user + "'", (err,rows) => {
// 			if (err)	{
// 				console.log("errrr");
//                 return done(err);
// 			}
// 			if (!rows.length) {
// 				console.log("len 0");
//                 return done(null, false);
//             }

// 			if (!( rows[0].password == password))
// 				console.log("wrong pass");
//                 return done(null, false);
// 			console.log("hey");
//             // all is well, return successful user
//             return done(null, rows[0]);
// 	});

// }));

// app.get("/", (req, res) => {
// 	console.log("hello");
// 	res.cookie('name', 'express').send('cookie set');
// 	connection.query("SELECT * FROM piper_auth WHERE name = \"hariom\" ", (err,rows) => {
// 		console.log(err, rows)
// 			if (err)	{
// 				console.log("errrr");
// 				// res.send("lamo");
//                 // return done(err);
// 			}
// 			else if (rows.length === 0) {
// 				console.log("len 0");
// 				// res.send("lamo");
//             }

// 			else (!( rows[0].pass == pass))
// 				console.log("wrong pass");
// 			console.log("hey");
// 		});
// });

// app.post('/login',
// 	passport.authenticate('local', { failureRedirect: '/login' }),
//  	function(req, res) {
// 		console.log("hellooooo");
//     	res.redirect('/');
// 	}
// );

// app.get('/login', (req, res) => {
// 	console.log("ouch");
// 	return res.status(200).json({hey: "hey"});
// })

// app.listen(8000, () => {
//     console.log(`Server listening on port 8000`);
// });
