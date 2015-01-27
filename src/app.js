var express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./backend/projects-db.js'),
    auth = require('./backend/auth/auth.js'),
    app = express();

function noOutput(req, res, err, reply) {
    res.status(err ? 500 : 200).end();
}

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));

// authentication
app.get('/api/auth/validate_token', auth.validate_token(noOutput));
app.post('/api/auth/sign_in',       auth.sign_in(noOutput));
app.post('/api/auth',               auth.register(noOutput));
app.delete('/api/auth/sign_out',    auth.logout(noOutput));

// list projects
app.get('/api/project', auth.authenticate(function(req, res, userId) {
    db.getProjects(userId, function(err, projects) {
        res.status(200).json(projects);
    });
}));

// add project
app.post('/api/project', auth.authenticate(function(req, res, userId) {
    db.addProject(userId, req.body, noOutput.bind(this, req, res));
}));

// remove project
app.delete('/api/project/:project_id', auth.authenticate(function(req, res, userId) {
    db.removeProject(userId, req.params.project_id, noOutput.bind(this, req, res));
}));

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('App listens on http://%s:%s', host, port)
})
