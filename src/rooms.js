import { getBookingsByDate } from './bookings';

export function getRoomByNumber(roomNumber, rooms) {
  return rooms.find(room => room.number === roomNumber);
}

export function getAvailableRooms(date, rooms, bookings) {
  const bookingsOnDate = getBookingsByDate(date, bookings);
  const bookedRoomNumbers = bookingsOnDate.map(booking => booking.roomNumber);

  return rooms.filter(room => !bookedRoomNumbers.includes(room.number));
}
