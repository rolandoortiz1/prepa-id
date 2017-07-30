var qs = require('querystring');
var session = require('express-session');
exports.get = function(req, res) {
	delete session.user;
	res.writeHead(302, {
        'Location': '/login',
        'Content-Type': 'text/html'
    });
    res.end();
};