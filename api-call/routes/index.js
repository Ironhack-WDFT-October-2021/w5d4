const router = require("express").Router();
const axios = require('axios')


/* GET home page */
router.get("/", (req, res, next) => {
  axios.get('http://swapi.py4e.com/api/planets/')
    .then(response => {
      console.log(response.data.results)
      const planets = response.data.results
      res.render("index", { planets });
    })
    .catch(err => next(err))
});

module.exports = router;
