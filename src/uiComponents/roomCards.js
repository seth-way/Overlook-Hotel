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
  const roomInfo = createRoomTable(room);
  roomCard.appendChild(roomInfo);

  return roomCard;
}

function createRoomTable(room) {
  const { number, roomType, bidet, bedSize, numBeds, costPerNight } = room;
  const table = document.createElement('table');
  table.appendChild(createRoomHeader(number));
  table.appendChild(createTableRow('type:', roomType));
  table.appendChild(createTableRow('bed size:', bedSize));
  table.appendChild(createTableRow('# beds:', numBeds));
  table.appendChild(createTableRow('has bidet:', bidet ? '✓' : '✗'));
  table.appendChild(createTableRow('cost per night:', `$${costPerNight}`));
  return table;
}

function createRoomHeader(roomNumber) {
  const row = document.createElement('tr');
  const header = document.createElement('th');
  row.appendChild(header);

  header.setAttribute('colspan', '2');
  header.innerText = roomNumber

  return row;
}

function createTableRow(descriptor, value) {
  const row = document.createElement('tr');
  const label = document.createElement('td');
  label.innerText = descriptor;
  row.appendChild(label);

  const tableValue = document.createElement('td');
  tableValue.innerText = value;
  row.appendChild(tableValue);

  return row;
}

function createNoRoomsFoundMessage() {
  const message = document.createElement('p');
  message.innerText = 'No rooms meet your search criteria.';
  return message;
}
