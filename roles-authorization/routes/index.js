const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const loginCheck = () => {
  return (req, res, next) => {
    // with basic-auth: req.session.user
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  }
}

router.get('/profile', loginCheck(), (req, res, next) => {
  // with basic-auth: req.session.user
  const loggedInUser = req.user
  res.render('profile', { user: loggedInUser })
});


module.exports = router;
