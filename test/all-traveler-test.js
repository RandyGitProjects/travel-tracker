import { expect } from 'chai';
import Traveler from '../src/all-travelers';
import mock from '../src/data/mock';

describe('Traveler', function () {
    let traveler

    beforeEach(function () {
        traveler = new Traveler(mock.travelers[2])
    });

    it('should be a function', function () {
        expect(Traveler).to.be.a('function')
    });

    it('should be a instance of a new traveler', function () {
        expect(traveler).to.be.instanceOf(Traveler)
    });

    it('should return a travelerID', function () {
        expect(traveler.id).to.equal(3)
    })

    it('should return a traveler name', function () {
        expect(traveler.name).to.equal("Sibby Dawidowitsch")
    })

    it('should return a travelers type', function () {
        expect(traveler.travelerType).to.equal("shopper")
    })
    
})