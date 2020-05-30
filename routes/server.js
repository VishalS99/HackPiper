const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { shopRoute } = require('./shopRoute');
const { cartRoute } = require('./cartRoute');
// const { buyRoute } = require('./buyRoute');
// const { loginRoute } = require('./loginRoute');
// const { billingRoute } = require('./billingRoute');
// const { devStatusRoute } = require('./devStatusRoute');
// const { signupRoute } = require('./signupRoute');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
// const passport = require('passport');
// const LocalStrategy   = require('passport-local').Strategy;
const app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// app.use("/api/shop", shopRoute);
app.use("/api/cart", cartRoute);
// app.use("/api/buy", buyRoute);
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
