var template = require('../views/members-template');
var mongo = require('../model/mongo-data');
exports.get = function(req, res) {
	mongo.studentList(function(err, studentList) {
		if (!err) {
			var responseByEvent = [];
			var response = "";
			var attendance = {};
			var members = []; // keys: groups, values: number of members
			var groups = [];
			var group;
			var time;
			var limit;
			var limits = {
				
			}; // Every property will be the name of an event and the value will the be the time limit.
			studentList = studentList.results;
			for (var i = 0; i < studentList.length; i++) { // Iterate over the list of students.
				group = studentList[i].group;
				if (!members[group]) // If the value for the group has not been initialized yet, initialize it.
					members[group] = 0;
				members[group]++; // Increment the number of members for the given group by 1.
				for (property in studentList[i]) { // Iterate over every property the document has.
					if (property != "id" && property != "name" && property != "_id" && property != "group") { // If the property is not any of these values, it must be an event.
						if (!attendance[property]) {
							attendance[property] = {};
							responseByEvent[property] = '<h3>' + property + '</h3><table id="' + property + '"><tr><th>Group</th><th>Attendance</th><th>Percentage</th></tr>';
						}
						if (!attendance[property][group])
							attendance[property][group] = 0;
						time = new Date(studentList[i][property]); // The value from studentList[i] is the time, which is used to create a Date object.
						limit = new Date(limits[property]); // Create a Date object with the time limit.
						if (time <= limit) // If within the time limit, increment the count.
							attendance[property][group]++;
					}
				}
				if (!responseByEvent[group])
					responseByEvent[group] = '<h3>' + group + '</h3><table id="' + group + '"><tr><th>Member</th><th>Major</th></tr>';
				responseByEvent[group] += '<tr><td>' + studentList[i].name + '</td><td>' + studentList[i].major + '</td></tr>';
			}
			
			for (event in attendance) {
				if (!responseByEvent[event])
					responseByEvent[event] = '<h3>' + event + '</h3><table id="' + event + '"><tr><th>Group</th><th>Attendance</th><th>Percentage</th></tr>';
				
			}

			for (key in responseByEvent)
				response += responseByEvent[key] + "</table>";

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