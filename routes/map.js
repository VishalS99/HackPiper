const { connection } = require("./sqlConfig");

const getAddress = (u) => {
  return new Promise((resolve, reject) => {
    const q = "SELECT billing_address from user where id=" + u;
    connection.query(q, (err, results) => {
      if (err || results.length == 0) {
        reject(err);
      }
      const r = JSON.parse(JSON.stringify(results));
      resolve(r[0].billing_address);
    });
  });
};

const findAddresses = (users) => {
  return Promise.all(users.map((u) => getAddress(u.id)));
};

const doMapping = () => {
  return new Promise((resolve, reject) => {
    const ORDER_QUERY = "SELECT id, cart from orders";
    connection.query(ORDER_QUERY, (err, rows) => {
      const r = JSON.parse(JSON.stringify(rows));
      findAddresses([r[0], r[1], r[2]])
        .then((addresses) => {
          resolve(addresses);
        })
        .catch((e) => reject(e));
    });
  });
};
doMapping()
  .then((addresses) => {
    console.log("hey: " + addresses);
    return true;
  })
  .catch((e) => console.log(e));
