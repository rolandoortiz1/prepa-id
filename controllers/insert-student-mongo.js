var template = require('../views/insert-student-template');
var mongo = require('../model/mongo-data');
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
			var student = {
				"id": post["id"],
				"name": post["name"],
				"major": post["department"],
                "group": session.user
			}
			if (post["phone"])
				student["phone"] = post["phone"];
			mongo.insertStudent(function(){}, student);
		});
	}
    
    res.writeHead(302, {
        'Location': '/add-member',
        'Content-Type': 'text/html'
    });
    res.end();
};