import { getRoomByNumber } from './rooms';

export function getTotalSpent(customerBookings, rooms) {
  const bookingPrices = customerBookings.map(booking => {
    const room = getRoomByNumber(booking.roomNumber, rooms);
    return room ? room.costPerNight : 0;
  });

  return bookingPrices.reduce((total, price) => total + price, 0);
}
