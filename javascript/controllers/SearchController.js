var us_states = require('../us_state.js');
const generateOCDIds = require('../controllers/generateOCDIds.js')
const ApiElections = require('../api/apiElections.js')

/* Controller to handle incoming search form requests */
module.exports = async (req, res, next) => {
  // Grab user inputs for city and state and store to local variables
  let divisions = { state: req.body.state, place: req.body.city }

  try {
    // Call function to generate OCD IDs passing the user's city and state store query to variable
    const OCD_IDs = await generateOCDIds(divisions)

    // Use the genereated OCD ID query to call the API to retrieve the elections
    const request_elections = await ApiElections(OCD_IDs)

    // Serve search results page with data from API response
    let title = `You have the following upcoming elections for: ${divisions.place}, ${divisions.state}`
    res.status(200).render('search-results', { title: title, results: request_elections.data })
    
    // Catch errors and send user back to search page showing erorr
  } catch (err) {console.error(err);
      res.status(500).render('index', { err: err, states: us_states });
    }
}
