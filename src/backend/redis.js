var redis = require('redis'),
    connection = null;

exports.connect = function() {
  if (!connection) {
    connection = redis.createClient(6379, process.env.redis_host || 'localhost');
  }
  return connection;
}
