import { expect } from 'chai';
import Destinations from '../src/all-destinations'
import mock from '../src/data/mock';

describe('Destinations', function () {
    let allDestinations

    beforeEach(function () {
        allDestinations = new Destinations(mock.destinations)
    });

    it('should be a function', function () {
        expect(Destinations).to.be.a('function')
    });

    it('should be a instance of a new trip', function () {
        expect(allDestinations).to.be.instanceOf(Destinations)
    });

    it('should return an array of destinations', function () {
        expect(allDestinations.getAllDestinations()).to.equal(mock.destinations)
    })

    it('should return a destination with the given ID', function () {
        expect(allDestinations.getDestinationById(22)).to.deep.equal({
            "id": 22,
            "destination": "Rome, Italy",
            "estimatedLodgingCostPerDay": 90,
            "estimatedFlightCostPerPerson": 650,
            "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "alt": "people standing inside a colosseum during the day"
          })
    })

    it('should return undefined when searching for destination with wrong id', function () {
        expect(allDestinations.getDestinationById(99)).to.equal(undefined)
        })

    it('should be able to calculate cost of trip of user inputs and include 10% agent fee', function () {
        const destinationID = 22
        const inputDuration = 3
        const inputTravelers = 3
        expect(allDestinations.getDestinationCost(destinationID, inputDuration, inputTravelers)).to.equal(2442)
    })
    
})