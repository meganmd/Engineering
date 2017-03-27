var assert = require('assert');
var database = require("../database.js");
var sqlite = require("sqlite3").verbose();
var data = new database("testDB");

describe('hooks', function() {

  before(function() {
    var data = new database("testDB");
    data.drop();
    data.initialize();
  });

  after(function() {
    // runs after all tests in this block
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
        assert.equal(2, rows.length);
      })
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
