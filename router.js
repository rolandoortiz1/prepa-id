const path = require('path'),
	fs = require('fs'),
	url = require('url'),
	express = require('express'),
    session = require('express-session');
	app = express();

exports.get = function(req, res) {
	req.requrl = url.parse(req.url, true);
	var path = req.requrl.pathname;
	if (/.(css)$/.test(path)) {
		res.writeHead(200, {'Content-Type': 'text/css'});
		fs.readFile(__dirname + path, 'utf8', function(err, data) {
			if (err) throw err;
			res.write(data, 'utf8');
			res.end();
		});
	}
	else if (/.(png)$/.test(path) || /.(PNG)$/.test(path) || /.(jpg)$/.test(path) || /.(jpeg)$/.test(path)) {
		var img = fs.readFileSync(__dirname + path);
		res.writeHead(200, {'Content-Type': 'image/gif'});
		fs.readFile(__dirname + path, 'utf8', function(err, data) {
			if (err) throw err;
			res.end(img, 'binary');
		});
	}
	else {
		switch(path) {
			case "/":
			case "/home":
				if (session.user) {
					fs.readFile("public/home.html", "binary", function(err, file) {
						res.writeHeader(200);
						res.write(file, "binary");
						res.end();
					});
                    break;
				}
			case "/login":
				fs.readFile("public/login.html", "binary", function(err, file) {
					res.writeHeader(200);
					res.write(file, "binary");
					res.end();
				});
				break;
			case "/add-member":
				fs.readFile("public/addmember.html", "binary", function(err, file) {
					res.writeHeader(200);
					res.write(file, "binary");
					res.end();
				});
				break;
			case "/insert-student": require('./controllers/insert-student-mongo.js').get(req, res); break;
			case "/members": require('./controllers/members-mongo.js').get(req, res); break;
			case "/edit-member/:id": require('./controllers/edit-members-mongo.js').get(req, res); break;
			case "/events": require('./controllers/event-mongo.js').get(req, res); break;
			case "/standings": require('./controllers/standings-mongo.js').get(req, res); break;
			case "/favicon.ico": app.get('/favicon.ico', function(req, res) {res.status(204);}); break; // Set a favicon at some point.
			case "/submit-login": require('./scripts/login.js').get(req, res); break;
			case "/logout": require('./scripts/logout.js').get(req, res); break;
			default: require('./controllers/404').get(req, res); break;
        }
	}
};