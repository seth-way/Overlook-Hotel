import { getTotalSpent } from './customers';
import { convertToCurrency } from './utility';
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

export function updateUserBookings(id, bookings, rooms, isAdmin) {
  var allUserBookings = isAdmin
    ? bookings
    : getBookingsByCustomer(id, bookings);

  allUserBookings = allUserBookings.map(booking => {
    booking.price = getRoomPrice(booking.roomNumber, rooms);
    return booking;
  })
  const userBookings = groupBookingsPastVsUpcoming(allUserBookings);

  userBookings.totals = {};

  const { totals } = userBookings;

  totals.past = getTotalSpent(userBookings.past, rooms);
  totals.upcoming = getTotalSpent(userBookings.upcoming, rooms);
  totals.total = totals.past + totals.upcoming;

  Object.keys(totals).forEach(key => {
    totals[key] = convertToCurrency(totals[key]);
  });

  return userBookings;
}

export function sortBookingsByDate(bookings) {
  return bookings.sort(
    (a, b) => convertDateToValue(b.date) - convertDateToValue(a.date)
  );
}

function convertDateToValue(date) {
  return new Date(date).valueOf();
}
