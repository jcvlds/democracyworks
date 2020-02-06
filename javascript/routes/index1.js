const ApiElections = require('../api/apiElections.js')
// const generateOCDIds = require('../routes/generateOCDIds.js')
const SearchController = require('../controllers/SearchController.js')

var express = require('express');
var router = express.Router();
var us_states = require('../us_state.js');

/* GET home page - serve form. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find My Election', states: us_states });
});

/* POST search form - serve upcoming elections. */
router.post('/search', function(req, res, next) {
  // Grab user inputs for city and state and store to local variables
  let divisions = { state: req.body.state, place: req.body.city }

  try {
    // Call function to generate OCD IDs passing the user's city and state
    const OCD_IDs = generateOCDIds(divisions)
      .then(query => {
        try {
          // Use the genereated OCD ID query to call the API to retrieve the elections
          const request_elections = ApiElections(query)
            .then(response => {
              // Serve search results page with data from API response
              let title = `You have the following upcoming elections for: ${divisions.place}, ${divisions.state}`
              res.status(200).render('search', { title: title, results: response.data })
            })
            .catch(err => res.send(err));
      } catch (err) {console.log(err); res.send(err)}
      })
      // Send user back to search page with error showing if did not include both city and state
      .catch(err => res.status(500).render('index', { err: err, states: us_states }));
  } catch(err) {console.error(err)}
});

module.exports = router;
