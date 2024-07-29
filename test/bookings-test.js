import chai from 'chai';
const expect = chai.expect;
import { bookings } from './data/sample-bookings';
import {
  getBookingsByCustomer,
  getBookingsByDate,
  groupBookingsPastVsUpcoming,
} from '../src/bookings';

describe('Get all bookings for a customer', () => {
  const allBookings = [...bookings];

  it('should return all bookings associated with a customer id', () => {
    const expected = [
      {
        id: '5fwrgu4i7k55hl7bd',
        userID: 1,
        date: '2022/02/18',
        roomNumber: 1,
      },
      {
        id: '5fwrgu4i7k55hl7dx',
        userID: 1,
        date: '2022/02/21',
        roomNumber: 14,
      },
    ];
    const result = getBookingsByCustomer(1, allBookings);
    expect(result).to.deep.equal(expected);
  });

  it('should work with any customer id', () => {
    const expected = [
      {
        id: '5fwrgu4i7k55hl7dw',
        userID: 2,
        date: '2022/01/12',
        roomNumber: 20,
      },
    ];
    const result = getBookingsByCustomer(2, allBookings);
    expect(result).to.deep.equal(expected);
  });

  it('should return an empty array if id is not found', () => {
    const expected = [];
    const result = getBookingsByCustomer(99, allBookings);
    expect(result).to.deep.equal(expected);
  });
});

describe('Get bookings for a given date', () => {
  const allBookings = [...bookings];

  it('should return all bookings for a given date', () => {
    const expected = [
      {
        id: '5fwrgu4i7k55hl7e5',
        userID: 6,
        date: '2025/1/12',
        roomNumber: 15,
      },
      {
        id: '5fwrgu4i7k55hl7nt',
        userID: 5,
        date: '2025/01/12',
        roomNumber: 3,
      },
    ];
    const testDate = new Date('2025/01/12');
    const result = getBookingsByDate(testDate, allBookings);
    expect(result).to.deep.equal(expected);
  });

  it('should return all bookings for any date', () => {
    const expected = [
      {
        id: '5fwrgu4i7k55hl7bd',
        userID: 1,
        date: '2022/02/18',
        roomNumber: 1,
      },
    ];
    const testDate = new Date('2022/02/18');
    const result = getBookingsByDate(testDate, allBookings);
    expect(result).to.deep.equal(expected);
  });

  it('should return an empty array of no bookings are found', () => {
    const expected = [];
    const testDate = new Date('1970/02/18');
    const result = getBookingsByDate(testDate, allBookings);
    expect(result).to.deep.equal(expected);
  });
});

describe('Group bookings by past & upcoming', () => {
  const allBookings = [...bookings];

  it('should take bookings & sort them into past / upcoming', () => {
    const expected = {
      past: [
        {
          id: '5fwrgu4i7k55hl7bd',
          userID: 1,
          date: '2022/02/18',
          roomNumber: 1,
        },
        {
          id: '5fwrgu4i7k55hl7dw',
          userID: 2,
          date: '2022/01/12',
          roomNumber: 20,
        },
        {
          id: '5fwrgu4i7k55hl7dx',
          userID: 1,
          date: '2022/02/21',
          roomNumber: 14,
        },
        {
          id: '5fwrgu4i7k55hl7e4',
          userID: 8,
          date: '2022/01/12',
          roomNumber: 1,
        },
      ],
      upcoming: [
        {
          id: '5fwrgu4i7k55hl7e5',
          userID: 6,
          date: '2025/01/12',
          roomNumber: 15,
        },
        {
          id: '5fwrgu4i7k55hl7nt',
          userID: 5,
          date: '2025/01/12',
          roomNumber: 3,
        },
      ],
    };

    const result = groupBookingsPastVsUpcoming(allBookings);
    expect(result).to.deep.equal(expected);
  });

  it('should create an empty array value when no bookings found', () => {
    const expected = {
      past: [
        {
          id: '5fwrgu4i7k55hl7bd',
          userID: 1,
          date: '2022/02/18',
          roomNumber: 1,
        },
        {
          id: '5fwrgu4i7k55hl7dw',
          userID: 2,
          date: '2022/01/12',
          roomNumber: 20,
        },
        {
          id: '5fwrgu4i7k55hl7dx',
          userID: 1,
          date: '2022/02/21',
          roomNumber: 14,
        },
        {
          id: '5fwrgu4i7k55hl7e4',
          userID: 8,
          date: '2022/01/12',
          roomNumber: 1,
        },
      ],
      upcoming: [],
    };

    const result = groupBookingsPastVsUpcoming(allBookings.slice(0, 4));
    expect(result).to.deep.equal(expected);
  });

  it('should return both empty arrays when given no bookings', () => {
    const expected = { past: [], upcoming: [] };
    const result = groupBookingsPastVsUpcoming([]);
    expect(result).to.deep.equal(expected);
  });
});
