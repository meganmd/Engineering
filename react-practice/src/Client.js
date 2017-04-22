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

function addUser(username, password, firstName, lastName, cb) {
  console.log(username + " " + password + " " + firstName + " " + lastName)
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
      firstName: firstName,
      lastName: lastName
    })
  }).then(checkStatus)
    .then(cb);
}

function deleteUser(username, cb) {
  return fetch(`api/deleteUser`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
    })
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function addProject(name, description, cb) {
  return fetch('api/addProject', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      name: name,
      description: description
    })
  }).then(checkStatus)
    .then(cb);
}

function addUserToProject(username, projectName, role, cb) {
  return fetch('api/addUserToProject', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      projectName: projectName,
      role: role
    })
  }).then(checkStatus)
    .then(cb);
}

function getProject(uid, cb){
  return fetch(`api/project?name=${uid}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getProjects(cb) {
  return fetch(`api/listProjects`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function listProjectUsersTable(cb) {
  return fetch(`api/listProjectUsers`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getProjectsByUser(uid, cb) {
  return fetch(`api/projects?username=${uid}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getAcceptedProjectsByUser(uid, cb) {
  return fetch(`api/acceptedProjects?username=${uid}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getUnacceptedProjectsByUser(uid, cb) {
  return fetch(`api/unacceptedProjects?username=${uid}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getUserFromProject(uid,pid, cb){
  return fetch(`api/userFromProject?username=${uid}&projectTitle=${pid}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getUsersFromProject(pid, cb){
  return fetch(`api/usersFromProject?projectTitle=${pid}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function acceptProjectInvitation(username, projectName, cb){
  return fetch('api/acceptProjectInvitation', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      projectName: projectName
    })
  }).then(checkStatus)
    .then(cb);
}

function rejectProjectInvitation(username, projectName, cb){
  return fetch('api/rejectProjectInvitation', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      projectName: projectName
    })
  }).then(checkStatus)
    .then(cb);
}

function getPBIs(project,cb){
  return fetch(`api/pbis?project=${project}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function listPBITable(cb){
  return fetch(`api/listPBITable`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function addPBI(description, role, functionality, value,
  acceptanceCriteria, estimate, columnNumber, rowNumber, project, cb){
    return fetch('api/addPBI', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        description: description,
        role: role,
        functionality: functionality,
        value: value,
        acceptanceCriteria: acceptanceCriteria,
        estimate: estimate,
        columnNumber: columnNumber,
        rowNumber: rowNumber,
        project: project
      })
    }).then(checkStatus)
      .then(cb);
}

function editPBI(id, description, role, functionality, value,
  acceptanceCriteria, estimate, cb){
    return fetch('api/editPBI', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        id: id,
        description: description,
        role: role,
        functionality: functionality,
        value: value,
        acceptanceCriteria: acceptanceCriteria,
        estimate: estimate
      })
    }).then(checkStatus)
      .then(cb);
}

function movePBI(id, columnNumber, rowNumber, cb){
    return fetch('api/movePBI', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        id: id,
        columnNumber: columnNumber,
        rowNumber: rowNumber
      })
    }).then(checkStatus)
      .then(cb);
}

//returns an integer representing the current total percentage of tasks for a pbi
function getTotalPBIPercentage(pbiID, cb){
  return fetch(`api/PBITotalPercentage?pbi=${pbiID}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function addTask(project, sprint, pbi, description, percentage, member,
  columnNumber, priority, cb){
  return fetch('api/addTask', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      project: project,
      sprint: sprint,
      pbi: pbi,
      description: description,
      percentage: percentage,
      member: member,
      columnNumber: columnNumber,
      priority: priority
    })
  }).then(checkStatus)
    .then(cb);
}

function getTasksBySprint(projectName, sprintNum, cb) {
  return fetch(`api/tasksBySprint?projectName=${projectName}&sprintNum=${sprintNum}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function getTasksByProject(projectName, cb) {
  return fetch(`api/tasksByProject?project=${projectName}`, {
    accept: 'application/json',
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

const Client = { getUsers, addUser, getUser, getUsernames, addProject,
  getProject, getProjectsByUser, getAcceptedProjectsByUser,
  getUnacceptedProjectsByUser, getProjects, listProjectUsersTable,
  addUserToProject, getUserFromProject, getPBIs, addPBI, listPBITable,
  editPBI, movePBI, acceptProjectInvitation, rejectProjectInvitation, addTask,
  getTotalPBIPercentage};
export default Client;
