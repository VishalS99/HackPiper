module.exports = {
  isAuth: (req, res, next) => {
    if (req.cookies) return next();
    res.redirect("/login");
  },
};
