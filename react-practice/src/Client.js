/* eslint-disable no-undef */
function getUsernames(cb) {
  return fetch(`api/listUsernames`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getUsers(cb) {
  return fetch(`api/listUsers`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getUser(uid, cb) {
  return fetch(`api/user?username=${uid}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function addUser(username, password, favoriteColor, cb) {
  console.log(username + " " + password + " " + favoriteColor)
  return fetch('api/addUser',
  {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
      favoriteColor: favoriteColor
    })
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { getUsers, addUser, getUser, getUsernames };
export default Client;
