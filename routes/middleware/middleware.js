module.exports = {
  isAuth: (req, res, next) => {
    if (req.cookie) return next();
    res.redirect("/login");
  },
};
