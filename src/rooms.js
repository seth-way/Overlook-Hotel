import { getBookingsByDate } from './bookings';
import { convertToCurrency } from './utility';

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
//- room filtering functions -//
export function filterRooms(filters, rooms, bookings) {
  const { date, roomType, bedSize, bedCount, hasBidet } = filters;
  const availableRooms = getAvailableRooms(new Date(date), rooms, bookings);
  return availableRooms.filter(room => {
    if (hasBidet && !room.bidet) return false;
    if (bedCount && room.numBeds !== Number(bedCount)) return false;
    return room.roomType.includes(roomType) && room.bedSize.includes(bedSize);
  });
}

function getFilterKeyFromInputID(id) {
  const filterKeys = {
    'vacancy-date': 'date',
    'vacancy-room-types': 'roomType',
    'vacancy-bed-sizes': 'bedSize',
    'vacancy-bed-count': 'bedCount',
    'vacancy-bidet': 'hasBidet',
  };

  return filterKeys[id];
}

export function updateRoomFilterOptions(id, value, filterOptions) {
  const key = getFilterKeyFromInputID(id);
  filterOptions[key] = key === 'date' ? value.replaceAll('-', '/') : value;
  console.log(filterOptions);
  return filterOptions;
}

export function getRoomPrice(roomNumber, rooms) {
  const room = getRoomByNumber(roomNumber, rooms);
  return convertToCurrency(room.costPerNight);
}
