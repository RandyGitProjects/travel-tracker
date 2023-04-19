import { expect } from 'chai';
import Trips from '../src/all-trips';
import mock from '../src/data/mock';

describe('Trips', function () {
    let trip1, trip2, trip3, trip4
    beforeEach(function () {
        trip1 = new Trips(mock.trips[0])
        trip2 = new Trips(mock.trips[1])
        trip3 = new Trips(mock.trips[2])
        trip4 = new Trips(mock.trips[3])
    });

    it.skip('should be a function', function () {
        expect(Trips).to.be.a('function')
    });

    it.skip('should be a instance of a new trip', function () {
        expect(trip1).to.be.a(Trips)
    });

    it.skip('should be able to store a number for trip ID', function () {
        expect(trip1.id).to.be.a(1)
    })

    it.skip('should be able to store a number for a user ID', function () {
        expect(trip1.userId).to.be.a(44)
    })

    it.skip('should be able to store a number for a destination ID', function () {
        expect(trip1.destinationId).to.be.a(49)
    })

    it.skip('should be able to store a date string', function () {
        expect(trip1.date).to.be.a("2022/09/16")
    })

    it.skip('should be able to store the amount of days for the trip ', function () {
        expect(trip1.duration).to.be.a(8)
    })

    it.skip('should be able to determine the status of approved', function () {
        expect(trip1.status).to.be.a("approved")
    })

    it.skip('should be able to determine the status of pending', function () {
        expect(trip1.status).to.be.a("pending")
    })

    it.skip('should start with an empty array', function () {
        expect(trip4.suggestedActivities).to.deep.equal([])
    })

    it.skip('should be able to calculate total cost of all trips by user and include 10% agent fee', function () {
        expect(trip1.calculateCost()).to.be.a('$5,819')
        expect(trip2.calculateCost()).to.be.a('$4,565')
        expect(trip3.calculateCost()).to.be.a('$4,543')
    })
    
})