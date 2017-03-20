
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

  addUserProjectConnection(username, projectName, cb) {
    this.db.run("INSERT INTO userProjects (username, projectName) VALUES (?, ?)", username, projectName, cb);
  }

  getProjectUsers(projectName, cb) {
    this.db.all("Select * from users where username in select username from userprojects where projectName = ?", projectName, cb)
  }

  listProjectUsers(cb) {
    this.db.all("SELECT * FROM userprojects", cb);
  }
}
