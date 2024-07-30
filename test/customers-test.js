import chai from 'chai';
const expect = chai.expect;
import { bookings } from './data/sample-bookings';
import { rooms } from './data/sample-rooms';
import { getTotalSpent } from '../src/customers';
import { getBookingsByCustomer } from '../src/bookings';

describe("Got total cost of customer's bookings", () => {
  const allBookings = [...bookings];
  const allRooms = [...rooms];

  it('should return the total dollar amount spent on rooms', () => {
    const expected = 849.54;
    const customerBookings = getBookingsByCustomer(1, allBookings);
    const result = getTotalSpent(customerBookings, allRooms);
    
    expect(result).to.equal(expected);
  });
});
