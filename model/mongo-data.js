var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;
var DB = require('../db.js');
var host = "localhost",
	port = 27017,
	useDB = "PREPA_ID";
// var server = new Server(host, port, {auto_reconnect: true});
// var db = new Db("PREPA_ID", server);
var onErr = function(err, callback) {
	db.close();
	callback(err);
};

exports.eventList = function(callback) {
	var database = new DB;
	database.connect("mongodb://" + host + ":" + port + "/" + useDB)
	.then(
		function() {
			database.find("events", {})
			.then(
				function(events) {
					database.close();
					console.log("Successfully found events.");
					callback("", events);
				},
				function(error) {
					database.close();
					console.log("Failed to find events: " + error);
				}
			);
		},
		function() {
			database.close();
			resultObject = {
				"success": false,
				"error": "Database connection error: " + error
			}
			// res.json(resultObject);
			console.log(resultObject.error);
			callback(resultObject.error)
		}
	);

	// db.open(function(err, db) {
	// 	if (!err) {
	// 		db.collection("events", function(err, collection) {
	// 			if (!err) {
	// 				collection.find({}).toArray(function(err, events) {
	// 					if (!err) {
	// 						db.close();
	// 						var eventCount = events.length;
	// 						if (eventCount > 0) {
	// 							var json = "";
	// 							for (var i = 0; i < events.length; i++) {
	// 								// json += '{"name":"'+ events[i].name +'"}';
	// 								json += '{"name":"'+ events[i].name +'", "day":' + events[i].day + '}';
	// 								if (i < eventCount - 1)
	// 									json += ',';
	// 							}
	// 							json = '{"events":[' + json + ']}';
	// 							console.log(json + "\n");
	// 							callback("", JSON.parse(json));
	// 						}
	// 					}
	// 					else
	// 						onErr(err, callback);
	// 				}); //end collection.find 
	// 			}
	// 			else {
	// 				onErr(err, callback);
	// 			}
	// 		}); //end db.collection
	// 	}
	// 	else {
	// 		onErr(err, callback);
	// 	}
	// }); // end db.open
};

exports.insertStudent = function(callback, studentObj) {
	var database = new DB;
	var student = studentObj;
	console.log("Object: " + JSON.stringify(studentObj) + "\tVariable: " + JSON.stringify(student));
	database.connect("mongodb://" + host + ":" + port + "/" + useDB)
	.then(
		function() { // On successful connection
			console.log("Object in .then(): " + JSON.stringify(studentObj));
			return database.addDocument("students", studentObj)
			.then(
				function() {
					database.close();
					console.log("Student Successfully inserted.");
				},
				function(error) {
					database.close();
					console.log("Student was not inserted.\n" + error);
				}
			);
		},
		function(error) { // If the connection fails
			database.close();
			resultObject = {
				"success": false,
				"error": "Database connection error: " + error
			}
			// res.json(resultObject);
			console.log(resultObject.error);
			callback(resultObject.error);
		}
	);

	// db.open(function(err, db) {
	// 	if (!err) {
	// 		console.log("- Successfully opened DB.\n");
	// 		db.collection("students", function(err, collection) {
	// 			console.log("- Successfully in Students collection.\n");
	// 			if (!err) {
	// 				collection.insertOne(studentObj, function(err, res) {
	// 					if (!err) {
	// 						console.log("Record inserted:\n" + JSON.stringify(studentObj));
	// 						db.close();
	// 					}
	// 					else
	// 						onErr(err, callback);
	// 				}); //end collection.find 
	// 			}
	// 			else {
	// 				onErr(err, callback);
	// 			}
	// 		}); //end db.collection
	// 	}
	// 	else {
	// 		onErr(err, callback);
	// 	}
	// }); // end db.open

	// db.open(function(err, db) {
	// 	if (!err) {
	// 		console.log("- Successfully opened DB.\n");
	// 		db.collection("students", function(err, collection) {
	// 			console.log("- Successfully in Students collection.\n");
	// 			if (!err) {
	// 				collection.insertOne(studentObj, function(err, res) {
	// 					if (err) throw err;
	// 					console.log("Record inserted:\n" + JSON.stringify(studentObj));
	// 					db.close();
	// 				});
	// 			}
	// 			else {
	// 				onErr(err, callback);
	// 			}
	// 		});
	// 	}
	// 	else {
	// 		onErr(err, callback);
	// 	}
	// });
};

exports.insertScan = function(callback, event, studentID) {
	var database = new DB;
	var date = new Date();
	database.connect("mongodb://" + host + ":" + port + "/" + useDB)
	.then(
		function() { // On successful connection
			// var scan = {
			// 	"event": event,
			// 	"studentID": studentID,
			// 	"time": date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
			// };
			// console.log("Scan in .then(): " + JSON.stringify(scan));
			// return database.addDocument("scans", scan)
			// .then(
			// 	function() {
			// 		database.close();
			// 		console.log("Scan successfully inserted.");
			// 	},
			// 	function(error) {
			// 		database.close();
			// 		console.log("Scan was not inserted: " + error);
			// 	}
			// );
			studentID = parseInt(studentID);
			var object = {};
			object[event] = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
			return database.setNewFields("students", {"id": studentID}, object)
			.then(
				function() {
					database.close();
					console.log("Scan successfully inserted.");
				},
				function(error) {
					database.close();
					console.log("Scan was not inserted: " + error);
				}
			);
		},
		function(error) { // If the connection fails
			database.close();
			resultObject = {
				"success": false,
				"error": "Database connection error: " + error
			}
			// res.json(resultObject);
			console.log(resultObject.error);
			callback(resultObject.error);
		}
	);
};

exports.studentList = function(callback) {
	var database = new DB;
	database.connect("mongodb://" + host + ":" + port + "/" + useDB)
	.then(
		function() {
			database.find("students", {})
			.then(
				function(students) {
					database.close();
					console.log("Successfully found students.");
					callback("", students);
				},
				function(error) {
					database.close();
					console.log("Failed to find students: " + error);
				}
			);
		},
		function() {
			database.close();
			resultObject = {
				"success": false,
				"error": "Database connection error: " + error
			}
			// res.json(resultObject);
			console.log(resultObject.error);
			callback(resultObject.error)
		}
	);
};