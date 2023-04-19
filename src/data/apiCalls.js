let apiCalls;

const travlerAPI = fetch("http://localhost:3001/api/v1/travelers")
  .then(response => response.json())
  .catch(error => console.log(error))

const singleTravelerAPI = fetch("http://localhost:3001/api/v1/travelers/1")
  .then(response => response.json())
  .catch(error => console.log(error))

  const allTripsAPI = fetch("http://localhost:3001/api/v1/trips")
  .then(response => response.json())
  .catch(error => console.log(error))

  const allDestinationsAPI = fetch("http://localhost:3001/api/v1/destinations")
  .then(response => response.json())
  .catch(error => console.log(error))

apiCalls = [travlerAPI, singleTravelerAPI, allTripsAPI, allDestinationsAPI]

export default apiCalls;