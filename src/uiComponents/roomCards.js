export function createRoomCards(rooms) {
  if (!rooms.length) return createNoRoomsFoundMessage();
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('room-cards-container');

  rooms.forEach(room => {
    const roomCard = createRoomCard(room);
    cardsContainer.appendChild(roomCard);
  });
  return cardsContainer;
}

function createRoomCard(room) {
  const roomCard = document.createElement('div');
  roomCard.classList.add('card');
  const cardHeading = document.createElement('h4');
  cardHeading.innerText = room.number;
  roomCard.appendChild(cardHeading);
  const roomGrid = createRoomInfo(room);
  roomCard.appendChild(roomGrid);

  return roomCard;
}

function createRoomInfo(room) {
  const { roomType, bidet, bedSize, numBeds, costPerNight } = room;
  const labels = ['type', 'bed size', '# beds', 'has bidet', 'per night'];
  const values = [
    roomType,
    bedSize,
    numBeds,
    bidet ? '✓' : '✗',
    `$${costPerNight}`,
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
