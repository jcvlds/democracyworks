var us_states = require('../us_state.js');
const generateOCDIds = require('../controllers/generateOCDIds.js')
const ApiElections = require('../api/apiElections.js')

/* Generate OCD IDs function that requires city and state inputs from user*/
module.exports = (req, res, next) => {
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
}

