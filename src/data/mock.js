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
    },
    {
    "id": 83,
    "userID": 47,
    "destinationID": 26,
    "travelers": 1,
    "date": "2020/05/06",
    "duration": 11,
    "status": "pending",
    "suggestedActivities": []
    },
    {
    "id": 46,
    "userID": 44,
    "destinationID": 33,
    "travelers": 2,
    "date": "2020/08/24",
    "duration": 11,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 47,
    "userID": 28,
    "destinationID": 32,
    "travelers": 3,
    "date": "2019/12/10",
    "duration": 14,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 48,
    "userID": 44,
    "destinationID": 14,
    "travelers": 6,
    "date": "2021/02/10",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 49,
    "userID": 45,
    "destinationID": 35,
    "travelers": 1,
    "date": "2020/05/14",
    "duration": 16,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 50,
    "userID": 3,
    "destinationID": 16,
    "travelers": 5,
    "date": "2020/07/02",
    "duration": 17,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 51,
    "userID": 16,
    "destinationID": 27,
    "travelers": 2,
    "date": "2020/01/16",
    "duration": 15,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 52,
    "userID": 46,
    "destinationID": 14,
    "travelers": 2,
    "date": "2020/01/24",
    "duration": 18,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 53,
    "userID": 27,
    "destinationID": 4,
    "travelers": 6,
    "date": "2020/01/03",
    "duration": 20,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 54,
    "userID": 48,
    "destinationID": 21,
    "travelers": 2,
    "date": "2020/09/27",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 55,
    "userID": 39,
    "destinationID": 49,
    "travelers": 3,
    "date": "2020/03/08",
    "duration": 6,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 56,
    "userID": 23,
    "destinationID": 21,
    "travelers": 3,
    "date": "2020/06/14",
    "duration": 19,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 57,
    "userID": 33,
    "destinationID": 17,
    "travelers": 2,
    "date": "2019/07/04",
    "duration": 20,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 58,
    "userID": 40,
    "destinationID": 36,
    "travelers": 4,
    "date": "2020/10/27",
    "duration": 17,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 59,
    "userID": 21,
    "destinationID": 44,
    "travelers": 4,
    "date": "2020/01/27",
    "duration": 14,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 60,
    "userID": 17,
    "destinationID": 45,
    "travelers": 2,
    "date": "2020/06/23",
    "duration": 17,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 61,
    "userID": 26,
    "destinationID": 19,
    "travelers": 2,
    "date": "2020/07/25",
    "duration": 5,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 62,
    "userID": 19,
    "destinationID": 37,
    "travelers": 4,
    "date": "2020/08/07",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 63,
    "userID": 26,
    "destinationID": 35,
    "travelers": 5,
    "date": "2020/11/03",
    "duration": 13,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 64,
    "userID": 45,
    "destinationID": 25,
    "travelers": 3,
    "date": "2020/08/26",
    "duration": 7,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 65,
    "userID": 3,
    "destinationID": 35,
    "travelers": 4,
    "date": "2020/03/21",
    "duration": 18,
    "status": "approved",
    "suggestedActivities": []
    },
    {
    "id": 66,
    "userID": 17,
    "destinationID": 31,
    "travelers": 6,
    "date": "2020/12/19",
    "duration": 10,
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
    },
    {
    "id": 16,
    "destination": "Bangkok, Thailand",
    "estimatedLodgingCostPerDay": 35,
    "estimatedFlightCostPerPerson": 988,
    "image": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
    "alt": "ornate buildings with a garden during the day"
    },
    {
    "id": 35,
    "destination": "Anchorage, Alaska",
    "estimatedLodgingCostPerDay": 200,
    "estimatedFlightCostPerPerson": 100,
    "image": "https://images.unsplash.com/photo-1539545547102-90ae2c140089?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "man riding on kayak surrounded by mountains"
    },
    {
    "id": 36,
    "destination": "Reykjavík, Iceland",
    "estimatedLodgingCostPerDay": 900,
    "estimatedFlightCostPerPerson": 120,
    "image": "https://images.unsplash.com/photo-1515005319369-c4406c3f832b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    "alt": "frozen river in the middle of rock mountains"
    },
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