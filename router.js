const path = require("path"),
	fs = require("fs"),
	url = require("url"),
	express = require("express"),
	app = express();

// app.use(express.static(path.join(__dirname, "public"))); // Serve static files automatically.

// app.get("/", function(req, res) {
// 	fs.readFile("public/home.html", "binary", function(err, file) {
// 		res.writeHeader(200);
// 		res.write(file, "binary");
// 		res.end();
// 	});
// });

exports.get = function(req, res) {
	req.requrl = url.parse(req.url, true);
	var path = req.requrl.pathname;
	console.log("Getting " + __dirname + path);
	if (/.(css)$/.test(path)) {
		res.writeHead(200, {'Content-Type': 'text/css'});
		fs.readFile(__dirname + path, 'utf8', function(err, data) {
			if (err) throw err;
			res.write(data, 'utf8');
			res.end();
		});
	}
	else if (/.(png)$/.test(path) || /.(jpg)$/.test(path) || /.(jpeg)$/.test(path)) {
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
				fs.readFile("public/home.html", "binary", function(err, file) {
					res.writeHeader(200);
					res.write(file, "binary");
					res.end();
				});
				break;
			case "/login": require('./controllers/login').get(req, res); break;
			case "/addStudent": require('./controllers/insert-student-mongo.js').get(req, res); break;
			case "/events": require('./controllers/event-mongo.js').get(req, res); break;
			case "/favicon.ico": app.get('/favicon.ico', function(req, res) {res.status(204);}); break; // Get a favicon
			default: require('./controllers/404').get(req, res); break;
		}
	}
};