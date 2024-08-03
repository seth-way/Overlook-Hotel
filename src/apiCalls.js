export function getResource(endpoint, id) {
  var url = 'http://localhost:3001/api/v1/' + endpoint;
  if (id) url += '/' + id;
  const data = fetch(url)
    .then(response => {
      if (!response.ok) {
        var errorMessage = 'GET ERROR: Response not OK >>> STATUS';
        errorMessage += ` ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      return response.json();
    })
    .then(data => data)
    .catch(err => console.error(err));
  return data;
}
