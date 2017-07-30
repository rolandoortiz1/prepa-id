var qs = require('querystring');
var session = require('express-session');
exports.get = function(req, res) {
	if (req.method == "POST") {
		var body = "";
		req.on("data", function(data) {
			body += data;

			// If there's too much POST data, close the connection.
			// if (body.length > 1e6) {
			// 	request.connection.destroy();
			// }
		});

		req.on("end", function() {
			var post = qs.parse(body);
			session.user = post["username"];
		});
	}
	res.writeHead(302, {
        'Location': '/home',
        'Content-Type': 'text/html'
    });
    res.end();
};