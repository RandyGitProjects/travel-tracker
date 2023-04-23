class Destinations {
    constructor(destinations) {
        this.destinations = destinations
    }
    getAllDestinations() {
        return this.destinations;
      }
    
    getDestinationById(id) {
        return this.destinations.find(destination => destination.id === id);
      }

    getDestinationCost(destinationId, inputTravelers, inputDuration) {
      const destination = this.getDestinationById(destinationId)
      const costOfDestination = (inputTravelers * destination.estimatedFlightCostPerPerson) + (inputDuration * destination.estimatedLodgingCostPerDay)
      return costOfDestination * 1.1
    }  
}

export default Destinations;