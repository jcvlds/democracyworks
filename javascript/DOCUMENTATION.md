# Purpose for this solution
  Build a web app that allows people to search upcoming elections based on their address


## Functional Requirements
  User should be presented with an address form and be able to enter their full address
  On submitting the form, user should be displayed with their upcoming elections search results (at this time, only the city and state are required)


## Technical Requirements
  The city and state inputs submitted by the user from search form should be translated to OCD IDs appropriately
  The OCD IDs should be used to query the API to fetch upcoming elements
  The API response should be sent to user to be rendered on the results page


## User Scenario
  User opens the search form and inputs "South Miami" for city and "FL" for state
  Results page should render two upcoming elections for that address


## Criteria
  - Form submits ✅
  - State and OCD-IDs are correctly generated ✅
      - please refer to /controllers/SearchController.js and /controllers/generateOCDIds.js
  - Easy to change code that generates OCD-IDs ✅
      - please refer to /controllers/generateOCDIds.js
  - API correctly called ✅
      - please refer to /api/apiElections.js
  - Returned elections displayed to user ✅
      - please refer to /views/search-results.hbs
  - Documentation ✅
  - Functions/Classes/Methods small and clearly scoped ✅
  - Clear names ✅

## link to code