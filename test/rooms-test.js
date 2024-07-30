import chai from 'chai';
const expect = chai.expect;
import { rooms } from './data/sample-rooms';
import { bookings } from './data/sample-bookings';
import { getRoomByNumber, getAvailableRooms } from '../src/rooms';

describe('Get room by number', () => {
  const allRooms = [...rooms];
  it('should return the correct room given a room number', () => {
    const expected = {
      number: 1,
      roomType: 'residential suite',
      bidet: true,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 358.4,
    };
    const result = getRoomByNumber(1, allRooms);
    expect(result).to.deep.equal(expected);
  });

  it('should return the correct room when given a different number', () => {
    const expected = {
      number: 3,
      roomType: 'single room',
      bidet: false,
      bedSize: 'king',
      numBeds: 1,
      costPerNight: 491.14,
    };
    const result = getRoomByNumber(3, allRooms);
    expect(result).to.deep.equal(expected);
  });

  it('should return undefined if no room found', () => {
    const result = getRoomByNumber(100, allRooms);
    expect(result).to.be.undefined;
  });
});

describe('Should return a list of available rooms on a given date', () => {
  const allRooms = [...rooms];
  const allBookings = [...bookings];

  it('return all rooms with availability on the given date', () => {
    const expected = [
      {
        number: 1,
        roomType: 'residential suite',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 358.4,
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 477.38,
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17,
      },
    ];
    const testDate = new Date('2025/01/12');
    const result = getAvailableRooms(testDate, allRooms, allBookings);
    expect(result).to.deep.equal(expected);
  });
});
