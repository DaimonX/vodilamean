var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost:27017/vodilamean',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://vodila:vodilamean@ds033380.mongolab.com:33380/vodilamean',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }

}
