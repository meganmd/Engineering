
module.exports = class database {
  constructor(name) {
    var sqlite = require("sqlite3").verbose();
    this.db = new sqlite.Database("./db/" + name + ".db");
  }

  initialize(cb) {
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT, firstName TEXT, lastName TEXT)");
      this.db.run("CREATE TABLE IF NOT EXISTS projects (name TEXT PRIMARY KEY, description TEXT)");
      this.db.run("CREATE TABLE IF NOT EXISTS userProjects (username TEXT, projectName TEXT, PRIMARY KEY(username, projectName))");

      //Uses foreign key in projects table
      this.db.run("CREATE TABLE IF NOT EXISTS productBacklogItems (id INTEGER PRIMARY KEY, description TEXT, role TEXT, functionality TEXT, value TEXT, acceptanceCriteria TEXT, estimate TEXT, columnNumber INT, rowNumber INT, project TEXT, FOREIGN KEY(project) REFERENCES projects(name))");
      if(!(typeof cb === 'undefined')) {
        cb();
      };
    });
  }

  drop(cb) {
    this.db.serialize(() => {
      this.db.run("DROP TABLE users");
      this.db.run("DROP TABLE projects");
      this.db.run("DROP TABLE userProjects");
      this.db.run("DROP TABLE productBacklogItems")
      if(!(typeof cb === 'undefined')) {
        cb();
      };
    });
  }

  getTableNames(cb) {
    this.db.all("SELECT name FROM sqlite_master WHERE type='table'", cb);
  }

  addUser(username, password, firstName, lastName, cb) {
    this.db.run("INSERT INTO users (username, password, firstName, lastName) VALUES (?, ?, ?, ?)", username, password, firstName, lastName, cb);
  }

  getUser(username, cb) {
    this.db.get("SELECT * FROM users where username = ?",username, cb);
  }

  deleteUser(username, cb) {
    this.db.run("DELETE FROM users where username = ?", username, cb);
  }

  getUsers(cb) {
    this.db.all("SELECT * FROM users", cb);
  }

  getUsernames(cb) { //not right
    this.db.all("SELECT username FROM users", cb);
  }

  addProject(name, description, cb) {
    this.db.run("INSERT INTO projects (name, description) VALUES (?, ?)", name, description, cb);
  }

  getProjects(cb) {
    this.db.all("SELECT * FROM projects", cb);
  }

  getProject(name, cb){
    this.db.get("SELECT * FROM projects where name = ?",name, cb);
  }

  addUserProjectConnection(username, projectName, cb) {
    this.db.run("INSERT INTO userProjects (username, projectName) VALUES (?, ?)", username, projectName, cb);
  }

  getProjectUsers(projectName, cb) {
    this.db.all("Select * from users where username in (select username from userProjects where projectName = ?)", projectName, cb)
  }

  getUserFromProject(projectName, username, cb){
    this.db.get("Select * from userProjects where username = ? AND projectName = ?",username,projectName,cb)
  }

  listProjectUsers(cb) {
    this.db.all("SELECT * FROM userProjects", cb);
  }

  getProjectsByUser(username, cb){
    this.db.all("SELECT * FROM projects where name in (SELECT projectName FROM userProjects where username = ?)", username, cb)
  }

  listProductBacklogItemsTable(cb){
    this.db.all("SELECT * FROM productBacklogItems", cb);
  }

  // Returns all PBIs for a project in order by column and then row
  getProductBacklogItemsForProject(project, cb){
    this.db.all("SELECT * FROM productBacklogItems where project = ? ORDER BY columnNumber, rowNumber",project, cb);
  }

  addProductBacklogItem(description, role, functionality, value,
    acceptanceCriteria, estimate, columnNumber, rowNumber, project, cb){
    this.db.run("INSERT INTO productBacklogItems (description, role, " +
    "functionality, value, acceptanceCriteria, estimate, columnNumber, " +
    "rowNumber, project) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",description, role,
    functionality, value, acceptanceCriteria, estimate, columnNumber, rowNumber,
     project, cb);
  }

  updateProductBacklogItem(id, description, role, functionality, value,
    acceptanceCriteria, estimate, cb){
      this.db.run("UPDATE productBacklogItems SET description = ?, role = ?," +
      " functionality = ?, value = ?, acceptanceCriteria = ?, estimate = ?" +
      "  WHERE id = ?", description, role,
      functionality, value, acceptanceCriteria, estimate, id, cb);
  }

  moveProductBackLogItem(id, columnNumber, rowNumber, cb){
    this.db.run("UPDATE productBacklogItems SET columnNumber = ?, rowNumber = ?" +
    " WHERE id = ?", columnNumber, rowNumber, id, cb);
  }

}
