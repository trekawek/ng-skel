var bcrypt = require('bcrypt'),
    client = require('../redis.js').connect();

exports.addUser = function(login, password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            client.incr("next_user_id", function(err, id) {
                client.multi()
                    .hset("users", login, id)
                    .hmset("user:" + id, "login", login, "hash", hash)
                    .exec(callback);
            });
        });
    });
};

exports.userExists = function(login, callback) {
    client.hget("users", login, callback);
};

exports.getUserId = function(login, password, callback) {
    client.hget("users", login, function(err, userId) {
        if (userId == null) {
            callback(err, null);
            return;
        }
        client.hget("user:" + userId, "hash", function(err, hash) {
            bcrypt.compare(password, hash, function(err, result) {
                if (result) {
                    callback(err, userId);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};