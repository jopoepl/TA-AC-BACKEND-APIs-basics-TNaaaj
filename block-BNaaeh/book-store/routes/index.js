var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(202).json({title: "Welcome to API USERS"});
});

module.exports = router;
