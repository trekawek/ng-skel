var crypto = require('crypto'),
    session = require('./session.js'),
    db = require('./users-db.js')
    TTL = 15;

function extractAuthHeaders(req, callback) {
    var token = req.get('access-token');
    session.getSession(token, callback);
}

function addAuthHeaders(res, userId, clientId, callback) {
    var newToken = crypto.randomBytes(64).toString('hex'),
        expiry = Math.ceil(new Date().getTime()/1000 + TTL * 60);

    if (!clientId) {
        clientId = crypto.randomBytes(64).toString('hex');
    }

    session.addSession(newToken, userId, clientId, TTL * 60, function(err, reply) {
        if (reply) {
            res.set('access-token', newToken);
            res.set('token-type', 'Bearer');
            res.set('client', clientId);
            res.set('expiry', expiry);
            res.set('uid', userId);
        }
        if (callback) {
            callback(err, reply);
        }
    });
}

function authenticate(req, res, onSuccess) {
    extractAuthHeaders(req, function(err, userId, clientId) {
        if (userId) {
            addAuthHeaders(res, userId, clientId, function(err, reply) {
                if (reply) {
                    onSuccess(userId, clientId);
                } else {
                    res.status(403).end();
                }
            });
        } else {
            res.status(403).end();
        }
    });
}

exports.validate_token = function (callback) {
    return function(req, res) {
        authenticate(req, res, callback.bind(this, req, res, null));
    }
};

exports.sign_in = function (callback) {
    return function(req, res) {
        var d = req.body;
        db.getUserId(d.email, d.password, function(err, userId) {
            if (userId) {
                addAuthHeaders(res, userId, null, callback.bind(this, req, res));
            } else {
                res.status(404).json({msg: 'invalid user or password'});
            }
        });
    }
};

exports.register = function(callback) {
    return function(req, res) {
        var d = req.body;

        db.userExists(d.email, function(err, userExists) {
            if (userExists) {
                res.status(409).json({msg: 'user exists'});
            } else {
                db.addUser(d.email, d.password, callback.bind(this, req, res));
            }
        });
    };
};

exports.logout = function(callback) {
    return function(req, res) {
        extractAuthHeaders(req, callback.bind(this, req, res));
    };
};

exports.authenticate = function(onSuccess) {
    return function(req, res) {
        authenticate(req, res, onSuccess.bind(this, req, res));
    };
};