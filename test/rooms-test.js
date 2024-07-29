import chai from 'chai';
const expect = chai.expect;
import { rooms } from './data/sample-rooms';
import { bookings } from './data/sample-bookings';
import { getAvailableRooms } from '../src/rooms';

describe('Should return a list of available rooms on a given date', () => {
  const allRooms = [...rooms];
  const allBookings = [...bookings];

  it('return all rooms with availability on the given date', () => {
    const expected = [];
    const testDate = new Date('2025/01/12');
    const result = getAvailableRooms(testDate, allRooms, allBookings);
    expect(result).to.deep.equal(expected);
  });
});
