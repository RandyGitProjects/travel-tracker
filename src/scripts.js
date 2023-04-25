
import "./css/styles.css";
import apiCalls from "../src/data/apiCalls";
import Trips from "../src/all-trips";
import Destinations from "./all-destinations";

//Query Selectors
const form = document.querySelector(".travel-form");
const acceptedMediaElement = document.querySelector(".accepted-element");
const pendingMediaElement = document.querySelector(".pending-element");
const travelerName = document.querySelector(".main-title");
const totalTrips = document.querySelector(".total-trips");
const amountTrips = document.querySelector(".amount-trips");
const formDestinations = document.querySelector("#destination");
const formDuration = document.querySelector("#duration");
const formTravelers = document.querySelector("#travelers");
const formEstimation = document.querySelector("#cost");
const bookTrip = document.querySelector(".book-trip");
const formDate = document.querySelector("#date");
const showHidden = document.querySelectorAll(".hidden-page");
const loginForm = document.querySelector(".login");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const errorElement = document.querySelector(".error");

//Global Variables
let allTrips, allDestinations

//Event Listeners
window.addEventListener("load", () => {
  Promise.all(apiCalls)
    .then((apiCallsArray) => {
      const traveler = apiCallsArray[0].travelers
      const trips = apiCallsArray[1].trips
      const destinations = apiCallsArray[2].destinations
      displayTripCardsApproved(trips, destinations, traveler);
      displayTripCardsPending(trips, destinations, traveler);
      displayTravelerName(traveler);
      displayTotalTrips(traveler, trips);
      displayAmountTrips(traveler, trips, destinations);
      displayTripsForForm(destinations);
      updateDateCalendar();
    })
    .catch(error => console.log(error, "error"))
})

form.addEventListener("submit", function (event) {
  event.preventDefault();
  Promise.all(apiCalls)
    .then((apiCallsArray) => {
      const destinations = apiCallsArray[2].destinations
      displayCalculatedCost(destinations);
    })
    .catch(error => console.log(error, "error"))
});

loginForm.addEventListener("submit", function (event) {
  const userIdNumber = Number(username.value.slice(8))
  event.preventDefault()
  if (!username.value.includes("traveler") || !password.value || password.value !== "travel" || userIdNumber < 1 || userIdNumber > 50) {
    errorElement.innerText = "Invalid Username or Password"
    return
  } else {
    Promise.all(apiCalls)
      .then((apiCallsArray) => {
        console.log(apiCallsArray)
        const trips = apiCallsArray[1].trips
        const destinations = apiCallsArray[2].destinations
        const singleTraveler = apiCallsArray[0].travelers.find(traveler => traveler.id === userIdNumber)
        successfulLogin();
        displayTripCardsApproved(trips, destinations, singleTraveler);
        displayTripCardsPending(trips, destinations, singleTraveler);
        displayTravelerName(singleTraveler);
        displayTotalTrips(singleTraveler, trips);
        displayAmountTrips(singleTraveler, trips, destinations);
        displayTripsForForm(destinations);
        updateDateCalendar();
      })
      .catch(error => {
        console.log(error)
        if (error.message === "Traveler not found") {
          errorElement.innerText = error
        } else {
          errorElement.innerText = "Invalid Username or Password"
        }
      })
  }
})

bookTrip.addEventListener("click", function (event) {
  event.preventDefault()
  const getTravelerIdURL = fetch("http://localhost:3001/api/v1/travelers/" + Number(username.value.slice(8)))
    .then(response => response.json())

  Promise.all(apiCalls.concat(getTravelerIdURL))
    .then((apiCallsArray) => {
      const trips = apiCallsArray[1].trips
      const destinations = apiCallsArray[2].destinations
      const singleTraveler = apiCallsArray[0].travelers.find(traveler => traveler.id === Number(username.value.slice(8)))
      submitTrip(trips, destinations, singleTraveler);
    })
    .catch(error => console.log(error, "error"))
})

//Functions
function submitTrip(trips, destinations, traveler) {
  let date = (formDate.value).split("-").join("/")
  let duration = parseFloat(formDuration.value);
  let inputTravelers = parseFloat(formTravelers.value);
  let destination = parseFloat(formDestinations.value);

  if (!formDate.value || !formDestinations.value || !formTravelers.value || !formDuration.value) {
    window.alert("At least one of the required values are missing or invalid, try again please!")
  } else {
    fetch("http://localhost:3001/api/v1/trips", {
      method: "POST",
      body: JSON.stringify({
        id: Number(Date.now()),
        userID: traveler.id,
        destinationID: destination,
        travelers: inputTravelers,
        date: date,
        duration: duration,
        status: "pending",
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

const successfulLogin = () => {
  showHidden.forEach(page => {
    page.classList.remove("hidden-page");
  })
  loginForm.classList.add("hidden-page")
}

function updateDateCalendar() {
  let today = new Date().toLocaleDateString("en-CA")
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
  formDestinations.innerHTML = ""
  destinations.forEach((destination) => {
  formDestinations.innerHTML += `<option id="${destination.id}" value="${destination.id}">${destination.destination}</option>`
  })
};

const displayAmountTrips = (traveler, trips, destinations) => {
  allTrips = new Trips(trips)
  destinations = new Destinations(destinations)
  amountTrips.innerHTML = `You spent a total of $${parseFloat(allTrips.calculateTripCost(traveler, destinations)).toLocaleString()} on trips.`
};

const displayTotalTrips = (traveler, trips) => {
  allTrips = new Trips(trips)
  totalTrips.innerHTML = `You went on ${allTrips.getTotalTrips(traveler)} total trips!`
};

const displayTravelerName = (traveler) => {
  travelerName.innerHTML = `Welcome back to<br>Odyssey Vacations,<br>${traveler.name}!</h1>`
};

const displayTripCardsApproved = (trips, destinations, traveler) => {
  allTrips = new Trips(trips)
  allDestinations = new Destinations(destinations)
  const travelerTrips = allTrips.getTripsByTravelerId(traveler).filter((trip) => trip.status === "approved")
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
  pendingMediaElement.innerHTML = ""
  const travelerTrips = allTrips.getTripsByTravelerId(traveler).filter((trip) => trip.status === "pending")
  travelerTrips.forEach((trip) => {
    const travelerDest = allDestinations.getDestinationById(trip.destinationID)
    pendingMediaElement.innerHTML += `<div class="card" tabindex="0">
                                <img src="${travelerDest.image}" class="card-image" alt="${travelerDest.alt}">
                                <span class="card-info">${travelerDest.destination}<br>Date: ${trip.date}<br>Duration: ${trip.duration}<br>Travelers: ${trip.travelers}</span>
                              </div>`
  });
};