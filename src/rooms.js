import { getBookingsByDate } from './bookings';

export function getRoomByNumber(roomNumber, rooms) {
  return rooms.find(room => room.number === roomNumber);
}

export function getAvailableRooms(date, rooms, bookings) {
  const bookingsOnDate = getBookingsByDate(date, bookings);
  const bookedRoomNumbers = bookingsOnDate.map(booking => booking.roomNumber);

  return rooms.filter(room => !bookedRoomNumbers.includes(room.number));
}

export function getRoomTypes(rooms) {
  const roomCategories = { suites: [], standard: [] };
  return rooms.reduce((acc, room) => {
    const { roomType } = room;
    if (roomType.includes('suite')) {
      if (!acc.suites.includes(roomType)) acc.suites.push(roomType);
    } else {
      if (!acc.standard.includes(roomType)) acc.standard.push(roomType);
    }
    return acc;
  }, roomCategories);
}
