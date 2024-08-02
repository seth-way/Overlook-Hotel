export function getCurrentDate() {
  const currentDate = new Date();
  currentDate.setMinutes(
    currentDate.getMinutes() - currentDate.getTimezoneOffset()
  );

  return currentDate.toJSON().slice(0, 10);
}

export function convertToCurrency(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
