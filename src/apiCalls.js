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

export function postResource(endpoint, resource) {
  var url = 'http://localhost:3001/api/v1/' + endpoint;
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resource),
  };

  return fetch(url, options)
    .then(response => {
      if (response.status !== 201) {
        throw new Error(createErrorMsg(response));
      }
      return response.json();
    })
    .then(data => data)
    .catch(err => console.error(err));
}

function createErrorMsg(response) {
  const { status, statusText } = response;
  var msg = 'POST ERROR: Resource not created \n>>> STATUS: ';
  msg += status;
  msg += '\n>>> ';
  msg += statusText;

  return msg;
}
