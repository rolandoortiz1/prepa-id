var template = require('../views/events-template');
var data = require('../model/mongo-data');
exports.get = function(req, res) {
	// data.insertStudent({"id": 0, "name": "Test Testerson", "major": "ICOM"});
	data.eventList(function(err, eventList) {
		if (!err) {
			var eventsByDay = {};
			var responseByDay = [];
			var response = "";
			var day;
			eventList = eventList.events;
			for (var i = 0; i < eventList.length; i++) {
				day = eventList[i].day;
				// if (!eventsByDay.hasOwnProperty("day" + day))
				// 	eventsByDay["day" + day] = [];
				// eventsByDay["day" + day].push(eventList[i].name);
				// Will probably delete one of these two seeing as they're currently redundant.
				if (!responseByDay[day])
					responseByDay[day] = '<div id="day' + day + '">Day ' + day + ' Events:';
				responseByDay[day] += '<input type="radio" name="event" value="' + eventList[i].name + '">' + eventList[i].name;
			}

			for (key in responseByDay)
				response += responseByDay[key] + "</div>";

			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(template.build(response));
			res.end();
		}
		else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(template.build("Oh dear", "Database error", "<p>Error details: " + err + "</p>"));
			res.end();
		}
	});
};