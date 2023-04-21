import { expect } from 'chai';
import Trips from '../src/all-trips';
import Destinations from '../src/all-destinations'
import Traveler from '../src/all-travelers';
import mock from '../src/data/mock';

describe('Trips', function () {
    let trip1

    beforeEach(function () {
        trip1 = new Trips(mock.trips, mock.destinations)
    });

    it('should be a function', function () {
        expect(Trips).to.be.a('function')
    });

    it('should be a instance of a new trip', function () {
        expect(trip1).to.be.instanceOf(Trips)
    });

    it('should return an array of all trips', function () {
        expect(trip1.getAllTrips()).to.equal(mock.trips)
    })

    
    it('should return a trip with the given ID', function () {
        const traveler = new Traveler(mock.travelers[2])
        expect(trip1.getTripById(traveler)).to.deep.equal({
            "id": 3,
            "userID": 3,
            "destinationID": 22,
            "travelers": 4,
            "date": "2022/05/22",
            "duration": 17,
            "status": "approved",
            "suggestedActivities": []
        })
    })
    
    it('should return a trip based on the status', function () {
        expect(trip1.getStatus('pending')).to.deep.equal([{
            "id": 83,
            "userID": 47,
            "destinationID": 26,
            "travelers": 1,
            "date": "2020/05/06",
            "duration": 11,
            "status": "pending",
            "suggestedActivities": []
        }])
    })
    
    it('should return an array of all trips', function () {
        const traveler = new Traveler(mock.travelers[2])
        expect(trip1.getTotalTrips(traveler)).to.equal(3)
    })

    it('should return an array of trips for the given user ID', function () {
        const traveler = new Traveler(mock.travelers[2])
        expect(trip1.getTripsByTravelerId(traveler)).to.deep.equal([
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
            "id": 65,
            "userID": 3,
            "destinationID": 35,
            "travelers": 4,
            "date": "2020/03/21",
            "duration": 18,
            "status": "approved",
            "suggestedActivities": []
            }
        ])
    })
    // move to destination test. Currently had destinations into trips param
    // not very srp 
    // it('should return an array of destinations', function () {
    //     expect(trip1.getAllDestinations()).to.equal(mock.destinations)
    // })

    // it('should return a destination with the given ID', function () {
    //     expect(trip1.getDestinationById(22)).to.deep.equal({
    //         "id": 22,
    //         "destination": "Rome, Italy",
    //         "estimatedLodgingCostPerDay": 90,
    //         "estimatedFlightCostPerPerson": 650,
    //         "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    //         "alt": "people standing inside a colosseum during the day"
    //       })
    // })

    it('should be able to calculate total cost of all trips by user and include 10% agent fee', function () {
        const traveler = new Traveler(mock.travelers[2])
        const destinations = new Destinations(mock.destinations)
        expect(trip1.calculateTripCost(traveler, destinations)).to.equal('15032')
    })
    
})