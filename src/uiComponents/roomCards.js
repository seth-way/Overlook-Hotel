import { unhideElement } from '../domUpdates';

export function createRoomCards(rooms, user) {
  if (!rooms.length) return createNoRoomsFoundMessage();
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('room-cards-container');

  rooms.forEach(room => {
    const roomCard = createRoomCard(room, user);
    cardsContainer.appendChild(roomCard);
  });
  return cardsContainer;
}

function createRoomCard(room, user) {
  const { id, isAdmin } = user;
  const { number } = room;
  const roomCard = document.createElement('div');
  roomCard.classList.add('card');
  const cardHeading = document.createElement('h4');
  cardHeading.innerText = room.number;
  roomCard.appendChild(cardHeading);
  const roomGrid = createRoomInfo(room);
  roomCard.appendChild(roomGrid);
  const bookitBtn = createBookItBtn(id, number);
  if (id && !isAdmin) roomCard.appendChild(bookitBtn);
  return roomCard;
}

function createBookItBtn(userID, roomNumber) {
  const bookingBtn = document.createElement('button');
  bookingBtn.id = 'bookit-' + userID + '-' + roomNumber;
  bookingBtn.classList.add('booking-btn');

  bookingBtn.innerHTML = '<span>book it!</span>';

  const original = document.getElementById('dummy-booking-icon');
  const copy = original.cloneNode(true);
  copy.removeAttribute('id');
  unhideElement(copy);
  bookingBtn.appendChild(copy);

  return bookingBtn;
}

function createRoomInfo(room) {
  const { roomType, bidet, bedSize, numBeds, costPerNight } = room;
  const labels = ['per night', 'type', 'bed size', '# beds', 'has bidet'];
  const values = [
    `$${costPerNight}`,
    roomType,
    bedSize,
    numBeds,
    bidet ? '✓' : '✗',
  ];
  const infoContainer = document.createElement('div');
  infoContainer.classList.add('room-card-info');
  infoContainer.appendChild(createInfoColumn(...labels));
  infoContainer.appendChild(createInfoColumn(...values));
  return infoContainer;
}

function createInfoColumn(...items) {
  const infoColumn = document.createElement('ul');
  items.forEach(item => {
    const element = document.createElement('li');
    element.classList.add('room-info-item');
    element.innerText = item;
    infoColumn.appendChild(element);
  });
  return infoColumn;
}

function createNoRoomsFoundMessage() {
  const message = document.createElement('p');
  message.innerText = 'No rooms meet your search criteria.';
  return message;
}
