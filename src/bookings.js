import { getTotalSpent } from './customers';
import {
  convertToCurrency,
  getCurrentDate,
  getValueOfCurrentDate,
} from './utility';
import { getRoomPrice } from './rooms';

export function getBookingsByCustomer(id, bookings) {
  return bookings.filter(booking => booking.userID === id);
}

export function getBookingsByDate(date, bookings) {
  return bookings.filter(
    booking => date.valueOf() === new Date(booking.date).valueOf()
  );
}

export function groupBookingsPastVsUpcoming(bookings) {
  const initial = { past: [], upcoming: [] };
  const groupedBookings = bookings.reduce((acc, booking) => {
    const bookingDate = new Date(booking.date);
    if (bookingDate.valueOf() < Date.now().valueOf()) {
      acc.past.push(booking);
    } else {
      acc.upcoming.push(booking);
    }

    return acc;
  }, initial);

  sortBookingsByDate(groupedBookings.upcoming);
  sortBookingsByDate(groupedBookings.past);

  return groupedBookings;
}

export function updateUserBookings(user, userBookings, bookings, rooms) {
  const { id, isAdmin } = user;
  var allUserBookings = isAdmin
    ? bookings
    : getBookingsByCustomer(id, bookings);
  allUserBookings = allUserBookings.map(booking => {
    booking.price = getRoomPrice(booking.roomNumber, rooms);
    return booking;
  });
  const updates = groupBookingsPastVsUpcoming(allUserBookings);
  updates.totals = {};

  const { totals } = updates;

  totals.past = getTotalSpent(updates.past, rooms);
  totals.upcoming = getTotalSpent(updates.upcoming, rooms);
  totals.total = totals.past + totals.upcoming;

  Object.keys(totals).forEach(key => {
    totals[key] = convertToCurrency(totals[key]);
  });

  userBookings = Object.assign(userBookings, updates);
}

export function sortBookingsByDate(bookings) {
  return bookings.sort(
    (a, b) => convertDateToValue(b.date) - convertDateToValue(a.date)
  );
}

function convertDateToValue(date) {
  return new Date(date).valueOf();
}
