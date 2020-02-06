
/* Generate OCD IDs function that requires city and state inputs from user*/
module.exports = (divisions) => {
  let identifier = "?district-divisions="
  let base_state = "ocd-division/country:us/state:"
  let base_place = "/place:"

  try {
    return new Promise((resolve, reject) => {
      // If user did not enter both city and state, send error with feedback
      if (!divisions.state || !divisions.place) {
        reject("Please enter both a valid City and State")
        // When user enters both inputs, sanitize the inputs and create OCD ID parameters 
        // from base paths
      } else if (divisions.state && divisions.place) {
        let OCD_state = divisions.state.toLowerCase()
        let OCD_place = divisions.place.toLowerCase().replace(" ", "_")

        let state_query = base_state + OCD_state
        let place_query = state_query + base_place + OCD_place
        
        let query = identifier + state_query + ',' + place_query
        resolve(query)
      }
    })
  } catch (err) {console.error(err)}
}
