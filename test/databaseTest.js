var assert = require('assert');
var database = require("../database.js");
var sqlite = require("sqlite3").verbose();
var data = new database("testDB");

describe('hooks', function() {

  before(function() {
    var data = new database("testDB");
    data.initialize();
  });

  after(function() {
    data.drop();
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  describe('check database size', function() {
    it('shuold have 3 tables', function() {
      data.getTableNames((err, rows)=> {
        console.log(rows);
        assert.equal(3, rows.length);
      })
    })
  })

  describe('check add User', function() {
    it('should add correctly', function() {
      data.addUser('user', 'pass', 'first', 'last');
      data.getUser('user', (err, row) => {
        console.log(row);
        assert.equal({
          username: 'user',
          password: 'pass',
          firstName: 'first',
          lastName: 'last'
        }, row);
      })
    })
  })

  describe('do tests ever fail?', function() {
    it("not be eqaula", function() {
      assert.equal(2,2);
    })
  })
  // test cases
});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
