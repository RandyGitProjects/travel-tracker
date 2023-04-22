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


console.log('This is the JavaScript entry file - your code begins here.');

//Query Selectors
const form = document.querySelector(".travel-form")
const mediaElement = document.querySelector(".media-element")
const travelerName = document.querySelector(".main-title")
const totalTrips = document.querySelector(".total-trips")
const amountTrips = document.querySelector(".amount-trips")


//Global Variables
let allTrips, allDestinations, travelers

//Event Listeners
form.addEventListener("submit", function(event) {
    event.preventDefault();
    displayCalculatedCost();
  });
// Functions
window.addEventListener('load', () => {
  Promise.all(apiCalls)
    .then((apiCallsArray) => {
      const traveler = apiCallsArray[0].travelers
      const singleTraveler = apiCallsArray[1].traveler //not working atm 
      const trips = apiCallsArray[2].trips
      const destinations = apiCallsArray[3].destinations
      displayTripCardsApproved(trips, destinations, traveler)
      displayTravelerName(traveler);
      displayTotalTrips(traveler, trips)
      displayAmountTrips(traveler, trips, destinations)
    })
    .catch(error => console.log(error, "error"))
})

const displayAmountTrips = (traveler, trips, destinations) => {
  allTrips = new Trips(trips)
  destinations = new Destinations(destinations)
  amountTrips.innerHTML = `You spent a total of $${parseFloat(allTrips.calculateTripCost(traveler[2], destinations)).toLocaleString()} on trips.`
}

const displayTotalTrips = (traveler, trips) => {
  allTrips = new Trips(trips)
  totalTrips.innerHTML = `You went on ${allTrips.getTotalTrips(traveler[2])} total trips!`
}

const displayTravelerName = (traveler) => {
  travelerName.innerHTML = `Welcome back to<br>Odyssey Vacations,<br>${traveler[2].name}!</h1>`
}

const displayTripCardsApproved = (trips, destinations, traveler) => {
  allTrips = new Trips(trips)
  allDestinations = new Destinations(destinations)
  travelers = new Traveler(traveler)
    const travelerTrips = allTrips.getTripsByTravelerId(traveler[2]).filter((trip) => trip.status === 'approved')
    travelerTrips.forEach((trip) => {
    const travelerDest = allDestinations.getDestinationById(trip.destinationID)
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const destinationImage = `<img src="${travelerDest.image}" class="card-image" alt="${travelerDest.alt}">`;
    const destinationTitle = `<span class="card-info">${travelerDest.destination}<br>Date: ${trip.date}<br>Duration: ${trip.duration}<br>Travelers: ${trip.travelers}</span>`;
    const cardContent = `${destinationImage}${destinationTitle}`;
    cardElement.innerHTML = cardContent;
    mediaElement.appendChild(cardElement);
  });
};

function displayCalculatedCost() {
    var date = new Date(document.querySelector("#date").value);
    var duration = document.querySelector("#duration").value;
    console.log(duration)
    var travelers = document.querySelector("#travelers").value;
    var destination = document.querySelector("#destination").value;
    var costPerDay = 100;
    var costPerPerson = costPerDay * duration;
    var totalCost = costPerPerson * travelers;
    document.querySelector("#cost").value = "$" + totalCost.toFixed(2);
    return false
}