var template = require('../views/members-template');
var mongo = require('../model/mongo-data');
exports.get = function(req, res) {
	mongo.studentList(function(err, studentList) {
		if (!err) {
			var responseByGroup = [];
			var response = "";
			var group;
			studentList = studentList.results;
			for (var i = 0; i < studentList.length; i++) {
				group = studentList[i].group;
//				if (!responseByGroup[group])
//					responseByGroup[group] = '<h2>' + group + '</h2><table id="' + group + '"><tr><th>Member</th><th>Major</th></tr>';
//				responseByGroup[group] += '<tr><td>' + studentList[i].name + '</td><td>' + studentList[i].major + '</td></tr>';
				
				if (!responseByGroup[group])
					responseByGroup[group] = '<h2>' + group + '</h2><table id="' + group + '"><tr><th>Member</th><th>Major</th><th>Edit</th></tr>';
				responseByGroup[group] += '<tr><td>' + studentList[i].name + '</td><td>' + studentList[i].major + '</td><td><a href="/edit-member?id=' + studentList[i].id + '">Edit</a></td></tr>';
			}

			for (key in responseByGroup)
				response += responseByGroup[key] + "</table>";

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(template.build(response));
			res.end();
		}
		else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(template.build("<p>Error details: " + err + "</p>"));
			res.end();
		}
	});
};