class Trips {
    constructor(trips) {
      this.trips = trips;
    }
  
    getAllTrips() {
        return this.trips;
    }
  
    getTripById(traveler) {
        return this.trips.find(trip => trip.id === traveler.id);
    }

    getStatus(status) {
        const trip = this.trips.filter(trip => trip.status === status)
        return trip
    }
    
    getTotalTrips(traveler) {
        return this.trips.filter(trip => trip.userID === traveler.id).length
    }

    getTripsByTravelerId(traveler) {
        return this.trips.filter(trip => trip.userID === traveler.id);
    }
    
    calculateTripCost(traveler, destinationList) {
        const travelerTrips = this.getTripsByTravelerId(traveler);
        const totalCost = travelerTrips.reduce((acc, trip) => {
        const destination = destinationList.getDestinationById(trip.destinationID);
        const lodgingCost = destination.estimatedLodgingCostPerDay * trip.duration;
        const flightCost = destination.estimatedFlightCostPerPerson * trip.travelers;
        return acc + lodgingCost + flightCost;
        }, 0);
        return (totalCost * 1.10).toFixed();
      }
  }

export default Trips