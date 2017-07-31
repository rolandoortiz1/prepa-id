var mongo = require('../model/mongo-data');
var session = require('express-session');
var qs = require('querystring');
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
			mongo.groupList(function(err, groupList) {
				var username = post["username"];
				groupList = groupList.results;
				for (var i = 0; i < groupList.length; i++) {
					if (username == "" + groupList[i].name) {
						session.user = username;
						res.writeHead(302, {
							'Location': '/home',
							'Content-Type': 'text/html'
						});
						res.end();
					}
				}
				res.writeHead(302, {
					'Location': '/login',
					'Content-Type': 'text/html'
				});
				res.end();
			});
		});
	}
};