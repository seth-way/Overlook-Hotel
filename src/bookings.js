import { getTotalSpent } from "./customers";
import { convertToCurrency } from "./scripts";

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
  return bookings.reduce((acc, booking) => {
    const bookingDate = new Date(booking.date);
    if (bookingDate.valueOf() < Date.now().valueOf()) {
      acc.past.push(booking);
    } else {
      acc.upcoming.push(booking);
    }
    
    return acc;
  }, initial);
}

export function updateUserBookings(id, bookings, rooms) {
  const allUserBookings = getBookingsByCustomer(id, bookings);
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
