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
}

export default Destinations;