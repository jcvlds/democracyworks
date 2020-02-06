const SearchController = require('../controllers/SearchController.js')

var express = require('express');
var router = express.Router();
var us_states = require('../us_state.js');

/* GET home page - serve form. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find My Election', states: us_states });
});

/* POST search form - call search controller to serve upcoming elections. */
router.post('/search', 
  SearchController);

module.exports = router;
