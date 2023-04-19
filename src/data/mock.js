const trips = [
    {
    "id": 1,
    "userID": 44,
    "destinationID": 49,
    "travelers": 1,
    "date": "2022/09/16",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 2,
    "userID": 35,
    "destinationID": 25,
    "travelers": 5,
    "date": "2022/10/04",
    "duration": 18,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 3,
    "userID": 3,
    "destinationID": 22,
    "travelers": 4,
    "date": "2022/05/22",
    "duration": 17,
    "status": "approved",
    "suggestedActivities": []
    }
]

const destinations = [
    {
    "id": 22,
    "destination": "Rome, Italy",
    "estimatedLodgingCostPerDay": 90,
    "estimatedFlightCostPerPerson": 650,
    "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "people standing inside a colosseum during the day"
    },
    {
    "id": 25,
    "destination": "New York, New York",
    "estimatedLodgingCostPerDay": 175,
    "estimatedFlightCostPerPerson": 200,
    "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
    },
    {
    "id": 49,
    "destination": "Castries, St Lucia",
    "estimatedLodgingCostPerDay": 650,
    "estimatedFlightCostPerPerson": 90,
    "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
    "alt": "aerial photography of rocky mountain under cloudy sky"
    }
]

const travelers = [
    {
    "id": 1,
    "name": "Ham Leadbeater",
    "travelerType": "relaxer"
    },
    {
    "id": 2,
    "name": "Rachael Vaughten",
    "travelerType": "thrill-seeker"
    },
    {
    "id": 3,
    "name": "Sibby Dawidowitsch",
    "travelerType": "shopper"
    },
    {
    "id": 4,
    "name": "Leila Thebeaud",
    "travelerType": "photographer"
    },
    {
    "id": 5,
    "name": "Tiffy Grout",
    "travelerType": "thrill-seeker"
    },
    {
    "id": 6,
    "name": "Laverna Flawith",
    "travelerType": "shopper"
    },
    {
    "id": 7,
    "name": "Emmet Sandham",
    "travelerType": "relaxer"
    },
    {
    "id": 8,
    "name": "Carlin O'Reilly",
    "travelerType": "history buff"
    },
    {
    "id": 9,
    "name": "Natalee Deegin",
    "travelerType": "relaxer"
    },
    {
    "id": 31,
    "name": "Maureene Derrell",
    "travelerType": "relaxer"
    },
    {
    "id": 32,
    "name": "Karlee Dowsey",
    "travelerType": "thrill-seeker"
    },
    {
    "id": 33,
    "name": "Selene Kleyn",
    "travelerType": "relaxer"
    },
    {
    "id": 34,
    "name": "Alexandr Struss",
    "travelerType": "shopper"
    },
    {
    "id": 35,
    "name": "Lorilyn Barlowe",
    "travelerType": "shopper"
    },
    {
    "id": 36,
    "name": "Lorettalorna Borell",
    "travelerType": "foodie"
    },
    {
    "id": 37,
    "name": "Jorry Adamczewski",
    "travelerType": "thrill-seeker"
    },
    {
    "id": 38,
    "name": "Lazar Leamy",
    "travelerType": "thrill-seeker"
    },
    {
    "id": 39,
    "name": "Michal Tudhope",
    "travelerType": "shopper"
    },
    {
    "id": 40,
    "name": "Melisent Pavolini",
    "travelerType": "photographer"
    },
    {
    "id": 41,
    "name": "Wadsworth Caddie",
    "travelerType": "photographer"
    },
    {
    "id": 42,
    "name": "Mignonne Thame",
    "travelerType": "photographer"
    },
    {
    "id": 43,
    "name": "Phyllis Madine",
    "travelerType": "photographer"
    },
    {
    "id": 44,
    "name": "Marijo MacNeilley",
    "travelerType": "photographer"
    },
    {
    "id": 45,
    "name": "Ofilia Hart",
    "travelerType": "thrill-seeker"
    }
]

export default {trips, destinations, travelers}