module.exports = (req, res, next) => {
  if (!req.user) {
    console.log(req);
    // res.redirect('/');
    return;
  }
  console.log(req);
  next();
};
