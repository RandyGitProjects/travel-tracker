import { expect } from 'chai';
import Trips from '../src/all-trips';
import mock from '../src/data/mock';

describe('trip', function () {
    let trip1, trip2, trip3
    beforeEach(function () {
        trip1 = new Trips(mock.trips[0])
        trip2 = new Trips(mock.trips[1])
        trip3 = new Trips(mock.trips[2])
    });

    it('should be a function', function () {
        expect(Trips).to.be.a('function')
    });

    it('should be a instance of a new trip', function () {
        expect(trip1).to.be.a(Trips)
    });

    it('should be able to store a number for trip ID', function () {
        expect(trip1.id).to.be.a(1)
    })

    it('should be able to store a number for a user ID', function () {
        expect(trip1.userId).to.be.a(44)
    })

    it('should be able to store a number for a destination ID', function () {
        expect(trip1.destinationId).to.be.a(49)
    })

    it('should be able to store a date string', function () {
        expect(trip1.date).to.be.a("2022/09/16")
    })

    it('should be able to store the amount of days for the trip ', function () {
        expect(trip1.duration).to.be.a(8)
    })

    it('should be able to determine the status of approved', function () {
        expect(trip1.status).to.be.a("approved")
    })

    it('should start with an empty array', function () {
        expect(trip1.suggestedActivities).to.deep.equal([])
    })
})