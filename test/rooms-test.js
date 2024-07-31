import chai from 'chai';
const expect = chai.expect;
import { rooms } from './data/sample-rooms';
import { bookings } from './data/sample-bookings';
import { getRoomByNumber, getAvailableRooms, getRoomTypes } from '../src/rooms';

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

describe('Get available rooms by date', () => {
  const allRooms = [...rooms];
  const allBookings = [...bookings];

  it('should return all rooms with vacancy on the given date', () => {
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

describe('Sort room types by suite and standard options', () => {
  const allRooms = [...rooms];

  it('should make an object w/ room types grouped by suite / standard', () => {
    const expected = {
      suites: ['residential suite', 'suite'],
      standard: ['single room'],
    };

    const result = getRoomTypes(allRooms);
    expect(result).to.deep.equal(expected);
  });

  it('should return only the room types present in given data', () => {
    const expected = {
      suites: [],
      standard: ['single room'],
    };

    const result = getRoomTypes(allRooms.slice(2));
    expect(result).to.deep.equal(expected);
  });
  it('should return no room types if none are present', () => {
    const expected = {
      suites: [],
      standard: [],
    };

    const result = getRoomTypes([]);
    expect(result).to.deep.equal(expected);
  });
});
