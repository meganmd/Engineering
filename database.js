
module.exports = class database {
  constructor(name) {
    var sqlite = require("sqlite3").verbose();
    this.db = new sqlite.Database("./db/" + name + ".db");
  }

  initialize(cb) {
    this.db.serialize(() => {

      this.db.run("CREATE TABLE IF NOT EXISTS users (" +
          "username TEXT PRIMARY KEY," +
          "password TEXT," +
          "firstName TEXT," +
          "lastName TEXT" +
        ")");

      this.db.run("CREATE TABLE IF NOT EXISTS projects (" +
          "name TEXT PRIMARY KEY," +
           "description TEXT" +
         ")");

      this.db.run("CREATE TABLE IF NOT EXISTS userProjects (" +
        "username TEXT," +
        "projectName TEXT," +
        "role TEXT," +
        "accepted INTEGER NOT NULL DEFAULT 0," +
        "PRIMARY KEY(username, projectName)," +
        "FOREIGN KEY(projectName) REFERENCES projects(name)," +
        "FOREIGN KEY(username) REFERENCES users(username)" +
      ")");

      //Uses foreign key in projects table
      this.db.run("CREATE TABLE IF NOT EXISTS productBacklogItems (" +
        "id INTEGER PRIMARY KEY," +
        "description TEXT, " +
        "role TEXT, " +
        "functionality TEXT, " +
        "value TEXT, " +
        "acceptanceCriteria TEXT, " +
        "estimate TEXT, " +
        "priority INT, " +
        "project TEXT, " +
        "FOREIGN KEY(project) REFERENCES projects(name)" +
      ")");

      this.db.run("CREATE TABLE IF NOT EXISTS tasks (" +
        "project TEXT, " +
        "sprint TEXT, " +
        "pbi INTEGER, " +
        "id INTEGER PRIMARY KEY, " +
        "description TEXT, " +
        "percent INTEGER, " +
        "member TEXT, " +
        "columnNumber INTEGER, " +
        "priority INTEGER, " +
        "FOREIGN KEY(project) REFERENCES projects(name), " +
        "FOREIGN KEY(sprint) REFERENCES sprints(number), " +
        "FOREIGN KEY(pbi) REFERENCES productBacklogItems(id), " +
        "FOREIGN KEY(member) REFERENCES users(username)" +
      ")");

      this.db.run("CREATE TABLE IF NOT EXISTS sprints (" +
        "number INTEGER, " +
        "project TEXT, " +
        "FOREIGN KEY(project) REFERENCES projects(name)" +
        "PRIMARY KEY (number, project)" +
      ")");

      this.db.run("CREATE TABLE IF NOT EXISTS sprintPBIs (" +
        "row INTEGER, " +
        "project TEXT, " +
        "id INTEGER, " +
        "sprint INTEGER, " +
        "status TEXT, " +
        "reason TEXT, " +
        "PRIMARY KEY (project, id, sprint)" +
        "FOREIGN KEY(project) REFERENCES projects(name)" +
        "FOREIGN KEY(project) REFERENCES sprints(project)" +
        "FOREIGN KEY(id) REFERENCES productBacklogItems(id)" +
        "FOREIGN KEY(sprint) REFERENCES sprints(number)" +
      ")");
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
      this.db.run("DROP TABLE productBacklogItems");
      this.db.run("DROP TABLE tasks");
      this.db.run("DROP TABLE sprints");
      this.db.run("DROP TABLE sprintPBIs");
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

  addUserProjectConnection(username, projectName, role, cb) {
    this.db.run("INSERT INTO userProjects (username, projectName, role) VALUES (?, ?, ?)", username, projectName, role, cb);
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
    this.db.all("SELECT * FROM userProjects INNER JOIN projects ON projects.name = userProjects.projectName WHERE username = ?",username, cb)
  }

  getAcceptedProjectsByUser(username, cb){
    this.db.all("SELECT * FROM userProjects INNER JOIN projects ON projects.name = userProjects.projectName WHERE username = ? and accepted = 1",username, cb)
  }

  getUnacceptedProjectsByUser(username, cb){
    this.db.all("SELECT * FROM userProjects INNER JOIN projects ON projects.name = userProjects.projectName WHERE username = ? and accepted = 0",username, cb)
  }

  acceptProject(username, projectName, cb){
    this.db.run("UPDATE userProjects SET accepted = ? where username = ? and projectName = ?", 1, username,  projectName, cb);
  }

  deleteUserProjectConnection(username, projectName, cb) {
    this.db.run("DELETE from userProjects WHERE username = ? AND projectName = ?", username, projectName, cb);
  }

  listProductBacklogItemsTable(cb){
    this.db.all("SELECT * FROM productBacklogItems", cb);
  }

  // Returns all PBIs for a project in order by column and then row
  getProductBacklogItemsForProject(project, cb){
    this.db.all("SELECT * FROM productBacklogItems where project = ? ORDER BY priority",project, cb);
  }

  getProductBacklog(project, cb){
    this.db.all(
        "SELECT * FROM productBacklogItems NATURAL LEFT OUTER JOIN ( " +
          "SELECT * FROM sprintPBIs x JOIN ( " +
            "SELECT id, MAX(sprint) AS sprint " +
            "FROM sprintPBIs " +
            "GROUP BY id " +
            ") y ON y.id = x.id AND y.sprint = x.sprint )" +
        "WHERE project = ? AND ((sprint is null) OR (status = 'rejected')) " +
        "ORDER BY priority ASC",
        project, cb);
  }

  getSprintBacklog(project, sprint, cb){
    this.db.all("SELECT id, description, role, functionality, value, acceptanceCriteria, status, reason, estimate, priority, project, IFNUll(percentComplete,0) as percentComplete FROM productBacklogItems p NATURAL JOIN sprintPBIs " +
    " LEFT OUTER JOIN (" +
    "  SELECT pbi, sum(percent) as percentComplete" +
    "  FROM tasks WHERE columnNumber = 3 AND project = ? AND sprint = ? " +
    "  GROUP BY pbi" +
    " ) x on x.pbi = p.id" +
    "  WHERE project = ? AND sprint = ? ORDER BY row",
    project, sprint, project, sprint, cb);
  }


  addProductBacklogItem(description, role, functionality, value,
    acceptanceCriteria, estimate, project, cb){
    this.db.run("INSERT INTO productBacklogItems (description, role, " +
    "functionality, value, acceptanceCriteria, estimate, " +
    "priority, project) VALUES(?, ?, ?, ?, ?, ?, 0, ?)",description, role,
    functionality, value, acceptanceCriteria, estimate,
     project, cb);
  }
  incrementBacklog(cb) {
    this.db.run("UPDATE productBacklogItems SET priority = priority + 1", cb);
  }

  updateProductBacklogItem(id, description, role, functionality, value,
    acceptanceCriteria, estimate, cb){
      this.db.run("UPDATE productBacklogItems SET description = ?, role = ?," +
      " functionality = ?, value = ?, acceptanceCriteria = ?, estimate = ?" +
      "  WHERE id = ?", description, role,
      functionality, value, acceptanceCriteria, estimate, id, cb);
  }

  moveProductBackLogItem(id, priority, cb){
    this.db.run("UPDATE productBacklogItems SET priority = ?" +
    " WHERE id = ?", priority, id, cb);
  }

  addProductBacklogItemToSprint(id, projectName, sprint, cb){
    this.db.get("SELECT MAX(row) as lastRow from sprintPBIs where project = ? and sprint = ?", projectName, sprint, (error, data) => {
      this.db.run("INSERT INTO sprintPBIs (row, project, id, sprint, status, reason) VALUES (?, ?, ?, ?, ?, ?)", data.lastRow + 1, projectName, id, sprint, "none", "", cb);
    })
  }

  acceptProductBackLogItem(id, projectName, sprint, cb){
    this.db.run("UPDATE sprintPBIs SET status = ? WHERE id = ? and project = ? and sprint = ?", "accepted", id, projectName, sprint, cb);
  }

  rejectProductBackLogItem(id, projectName, sprint, reason, cb){
    this.db.run("UPDATE sprintPBIs SET status = ?, reason = ? WHERE id = ? and project = ? and sprint = ?", "rejected", reason, id, projectName, sprint, cb);
  }

  addTask(project, sprint, pbi, description, percent, member, columnNumber, priority, cb) {
    this.db.run("INSERT INTO tasks (project, sprint, pbi, description, percent," +
    " member, columnNumber, priority) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
    project, sprint, pbi, description, percent, member, columnNumber, priority, cb);
  }

  updateTask(id, pbi, description, percent, member, cb) {
    this.db.run("UPDATE tasks SET pbi = ?, description = ?, percent = ?," +
    " member = ? WHERE id = ?", pbi, description, percent, member, id, cb);
  }

  moveTask(id, columnNumber, priority, cb) {
    this.db.run("UPDATE tasks SET columnNumber = ?, priority = ? WHERE id = ?",
    columnNumber, priority, id, cb );
  }

  deleteTask(id, cb) {
    this.db.run("DELETE from tasks where id = ?", id, cb);
  }

  getTasksBySprint(projectName, sprintNum, cb) {
    this.db.all("SELECT * FROM tasks WHERE project = ? AND sprint = ? ORDER BY columnNumber, priority", projectName, sprintNum, cb);
  }

  getTasksByProject(projectName, cb){
    this.db.all("SELECT * FROM tasks WHERE project = ?", projectName, cb);
  }

  getTasksByPBI(pbi, cb){
    this.db.all("SELECT * from tasks WHERE pbi = ?", pbi, cb);
  }

  getTask(id, cb){
    this.db.get("SELECT * from tasks WHERE id = ?", id, cb);
  }

  incrementTasksInNewColumn(column, priority, cb) {
    this.db.run("UPDATE tasks set priority = priority + 1" +
      " WHERE columnNumber = ? and priority >= ?",
      column, priority, cb);
  }

  decrementTasksInOldColumn(column, priority, cb) {
    console.log("column");
    console.log(column);
    this.db.run("UPDATE tasks set priority = priority - 1" +
      " WHERE columnNumber = ? and priority > ?",
      column, priority, cb);
  }

  addSprint(project, number, cb){
    this.db.run("INSERT INTO sprints (number, project) VALUES (?,?)", number, project, cb);
  }

  getSprints(project, cb){
    this.db.all("SELECT * FROM sprints WHERE project = ? ORDER BY number DESC", project, cb);
  }

  moveSprintPBI(id, project, sprintNum, row, cb){
    this.db.run("UPDATE sprintPBIs SET row = ? WHERE id = ? and project = ? and sprint = ?", row, id, project, sprintNum, cb);
  }

  getPercentBreakdownByPBI(pbi, sprint, cb) {
    this.db.all("SELECT tasks.member, SUM(tasks.percent) as 'total' FROM tasks INNER JOIN productBacklogItems ON tasks.pbi = productBacklogItems.id WHERE pbi = ? and sprint = ?  and columnNumber = 3 GROUP BY member",pbi, sprint, cb);
    // this.db.all("SELECT SUM(percent) as percent, username, from tasks where pbi = ? and sprint = ? GROUP BY username", pbi, sprint, cb);
  }
  getProductBacklogItem(id, cb) {
    this.db.get("SELECT * from productBacklogItems where id = ?", id, cb);
  }
  getPercentBreakdownForAllPBIs(project, cb) {
    this.db.all("SELECT sprint, pbi, member, SUM(percent) as percentComplete " +
    "FROM (SELECT sprint, pbi, member, " +
    "CASE " +
    "   WHEN columnNumber < 3 THEN 0 " +
    "   ELSE percent " +
    "  END as percent " +
    "  FROM tasks " +
    "  WHERE project = ? " +
    ") " +
    "GROUP BY sprint, pbi, member ",
     project, cb);
  }
//not done yet
  getPBIsPercentCompleteInAllSprints(project, cb) {
    this.db.all("SELECT p.sprint, i.id, i.description, row, IFNUll(x.percentComplete,0) as percentComplete  " +
    "FROM productBacklogItems i JOIN sprintPBIs p on i.id=p.id and i.project=p.project LEFT OUTER JOIN ( " +
    "SELECT sprint, pbi, sum(percent) as percentComplete " +
    "FROM tasks WHERE columnNumber=3 AND project=? " +
    "GROUP BY sprint, pbi " +
    ") x on x.sprint=p.sprint and x.pbi=p.id " +
    "WHERE i.project=? ORDER BY row ",
    project, project, cb);
  }

  getPercentCompleteForOnePbiInOneSprint(pbi, sprint, cb) {
    this.db.get("SELECT ifnull(sum(percent),0) as percent from tasks" +
    " WHERE pbi = ? AND sprint = ? AND columnNumber = 3",
    pbi, sprint, cb);
  }
}
