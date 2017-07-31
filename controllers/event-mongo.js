var template = require('../views/events-template');
var mongo = require('../model/mongo-data');
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
			mongo.insertScan(function(){}, post["event"], post["studentID"]);
		});
	}

	mongo.eventList(function(err, eventList) {
		if (!err) {
			// var eventsByDay = {};
			var responseByDay = [];
			var response = "";
			var day;
			eventList = eventList.results;
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
			res.write(template.build(response + '<input type="submit" value="Submit">'));
			res.end();
		}
		else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(template.build("<p>Error details: " + err + "</p>"));
			res.end();
		}
	});
};