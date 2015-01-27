var _ = require('underscore'),
    client = require('./redis.js').connect();

exports.addProject = function(userId, project, callback) {
    client.incr("next_project_id", function(err, projectId) {
        client.multi()
            .rpush("projects:" + userId, projectId)
            .hset("project:" + userId + ":" + projectId, "project", JSON.stringify(project))
            .exec(callback);
    });
};

exports.getProjects = function(userId, callback) {
    client.lrange("projects:" + userId, 0, -1, function(err, projectIds) {
        var multi = client.multi();
        _.each(projectIds, function(projectId) {
            multi.hget("project:" + userId + ":" + projectId, "project");
        });
        multi.exec(function (err, replies) {
            if (replies) {
                callback(err, _.object(projectIds, _.map(replies, JSON.parse)));
            } else {
                callback(err, replies);
            }
        });
    })
};

exports.removeProject = function(userId, projectId, callback) {
    client.multi()
        .lrem("projects:" + userId, 0, projectId)
        .del("project:" + userId + ":" + projectId)
        .exec(callback);
};
