// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import apiCalls from '../src/data/apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Trips from '../src/all-trips'
import Destinations from './all-destinations';
import Traveler from './all-travelers';
// import singleTraveler from './single-traveler';


console.log('This is the JavaScript entry file - your code begins here.');

//Query Selectors
const form = document.querySelector(".travel-form")
const acceptedMediaElement = document.querySelector(".accepted-element")
const pendingMediaElement = document.querySelector(".pending-element")
const travelerName = document.querySelector(".main-title")
const totalTrips = document.querySelector(".total-trips")
const amountTrips = document.querySelector(".amount-trips")
const formDestinations = document.querySelector("#destination")
const formDuration = document.querySelector("#duration")
const formTravelers = document.querySelector("#travelers")
const formEstimation = document.querySelector("#cost")
const bookTrip = document.querySelector(".book-trip")
const formDate = document.querySelector("#date")

//Global Variables
let allTrips, allDestinations, allTravelers

//Event Listeners

// Functions
window.addEventListener('load', () => {
  Promise.all(apiCalls)
    .then((apiCallsArray) => {
      const traveler = apiCallsArray[0].travelers
      const singleTraveler = apiCallsArray[1].traveler //not working atm 
      const trips = apiCallsArray[2].trips
      const destinations = apiCallsArray[3].destinations
      displayTripCardsApproved(trips, destinations, traveler)
      displayTripCardsPending(trips, destinations, traveler)
      displayTravelerName(traveler);
      displayTotalTrips(traveler, trips)
      displayAmountTrips(traveler, trips, destinations)
      displayTripsForForm(destinations)
      updateDateCalendar()
    })
    .catch(error => console.log(error, "error"))
})

form.addEventListener("submit", function(event) {
  event.preventDefault();
  Promise.all(apiCalls)
    .then((apiCallsArray) => {
      const destinations = apiCallsArray[3].destinations
      displayCalculatedCost(destinations);
    })
    .catch(error => console.log(error, "error"))
});

bookTrip.addEventListener("click", function(event) {
  event.preventDefault()
  Promise.all(apiCalls)
    .then((apiCallsArray) => {
      const travelers = apiCallsArray[0].travelers
      const trips = apiCallsArray[2].trips
      const destinations = apiCallsArray[3].destinations
      submitTrip(trips, destinations, travelers)
    })
    .catch(error => console.log(error, "error"))
})

function submitTrip(trips, destinations, traveler) {
  var date = (document.querySelector("#date").value).split('-').join('/')
  var duration = parseFloat(document.querySelector("#duration").value);
  var inputTravelers = parseFloat(document.querySelector("#travelers").value);
  var destination = parseFloat(document.querySelector("#destination").value);

  if (!formDate.value || !formDestinations.value || !formTravelers.value || !formDuration.value) {
    window.alert("At least one of the required values are missing or invalid, try again please!")
  } else {
    fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify({
    id: Number(Date.now()),
    userID: traveler[2].id,
    destinationID: destination,
    travelers: inputTravelers,
    date: date,
    duration: duration,
    status: 'pending',
    suggestedActivities: []
  }),
  headers: {
    "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
  allTrips.addTrip(data.newTrip)
  displayTripCardsPending(trips, destinations, traveler)
  displayTotalTrips(traveler, trips)
  displayAmountTrips(traveler, trips, destinations)
  displayCalculatedCost(destinations)
  resetForm()
  })
  .catch(error => console.log(error))
  }
};

function updateDateCalendar() {
  let today = new Date().toLocaleDateString('en-CA')
  formDate.setAttribute("min", today)
};

function resetForm() {
  formDestinations.value = ""
  formDate.value = ""
  formDuration.value = ""
  formTravelers.value = ""
  formEstimation.value = ""
};

const displayCalculatedCost = (destinations) => {
  allDestinations = new Destinations(destinations)
  const totalCost = allDestinations.getDestinationCost(Number(formDestinations.value), Number(formTravelers.value), Number(formDuration.value))
  formEstimation.value = "$" + totalCost.toFixed(2);
  return false 
};

const displayTripsForForm = (destinations) => {
  formDestinations.innerHTML =''
  destinations.forEach((destination) => {
    formDestinations.innerHTML += `<option id="${destination.id}" value="${destination.id}">${destination.destination}</option>`
   })
};

const displayAmountTrips = (traveler, trips, destinations) => {
  allTrips = new Trips(trips)
  destinations = new Destinations(destinations)
  amountTrips.innerHTML = `You spent a total of $${parseFloat(allTrips.calculateTripCost(traveler[2], destinations)).toLocaleString()} on trips.`
};

const displayTotalTrips = (traveler, trips) => {
  allTrips = new Trips(trips)
  totalTrips.innerHTML = `You went on ${allTrips.getTotalTrips(traveler[2])} total trips!`
};

const displayTravelerName = (traveler) => {
  travelerName.innerHTML = `Welcome back to<br>Odyssey Vacations,<br>${traveler[2].name}!</h1>`
};

const displayTripCardsApproved = (trips, destinations, traveler) => {
  allTrips = new Trips(trips)
  allDestinations = new Destinations(destinations)
  // allTravelers = new Travelers(traveler)
    const travelerTrips = allTrips.getTripsByTravelerId(traveler[2]).filter((trip) => trip.status === 'approved')
    travelerTrips.forEach((trip) => {
    const travelerDest = allDestinations.getDestinationById(trip.destinationID)
    acceptedMediaElement.innerHTML += `<div class="card" tabindex="0">
                                <img src="${travelerDest.image}" class="card-image" alt="${travelerDest.alt}">
                                <span class="card-info">${travelerDest.destination}<br>Date: ${trip.date}<br>Duration: ${trip.duration}<br>Travelers: ${trip.travelers}</span>
                              </div>`
  });
};

const displayTripCardsPending = (trips, destinations, traveler) => {
  allTrips = new Trips(trips)
  allDestinations = new Destinations(destinations)
  // allTravelers = new Travelers(traveler)
  pendingMediaElement.innerHTML = ''
    const travelerTrips = allTrips.getTripsByTravelerId(traveler[2]).filter((trip) => trip.status === 'pending')
    travelerTrips.forEach((trip) => {
    const travelerDest = allDestinations.getDestinationById(trip.destinationID)
    pendingMediaElement.innerHTML += `<div class="card" tabindex="0">
                                <img src="${travelerDest.image}" class="card-image" alt="${travelerDest.alt}">
                                <span class="card-info">${travelerDest.destination}<br>Date: ${trip.date}<br>Duration: ${trip.duration}<br>Travelers: ${trip.travelers}</span>
                              </div>`
  });
};

