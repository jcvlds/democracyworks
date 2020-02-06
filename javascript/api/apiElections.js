const axios = require('axios');

/* API call function that takes in OCD ID query input */
module.exports = async (query) => {
    try {
      // Include the OCD ID query from user inputs to the API call parameters
      // return axios.get(`https://api.turbovote.org/elections/upcoming` +
      return await axios.get(`https://api.turbovote.org/elections/upcoming` +
        `${query}`, {
          headers: {Accept: 'application/json'}})
    } catch (error) {console.error(error)}
}
