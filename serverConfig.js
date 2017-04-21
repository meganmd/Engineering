var serverConfig = {};

serverConfig.database = {
  development: 'exampleDB',
  test: 'testDB'
};
serverConfig.port = {
  development: '3001',
  test: '3002'
}

module.exports = serverConfig;
