var client = require('../redis.js').connect();

exports.getSession = function(token, callback) {
    client.multi()
        .hmget("token:" + token, "userId", "clientId")
        .del("token:" + token)
        .exec(function(err, reply) {
            if (typeof callback == 'function') {
                if (reply[0]) {
                    callback(err, reply[0][0], reply[0][1]);
                } else {
                    callback(err, null);
                }
            }
        });
};

exports.addSession = function(token, userId, clientId, ttl, callback) {
    client.multi()
        .hmset("token:" + token, "userId", userId, "clientId", clientId)
        .expire("token:" + token, ttl)
        .exec(callback);
};