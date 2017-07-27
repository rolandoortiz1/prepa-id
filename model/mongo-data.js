var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;
var host = "localhost",
	port = 27017;
var server = new Server(host, port, {auto_reconnect: true});
var db = new Db("PREPA_ID", server);
var onErr = function(err, callback) {
	db.close();
	callback(err);
};

exports.eventList = function(callback) {
	db.open(function(err, db) {
		if (!err) {
			db.collection("events", function(err, collection) {
				if (!err) {
					collection.find({}).toArray(function(err, events) {
						if (!err) {
							db.close();
							var eventCount = events.length;
							if (eventCount > 0) {
								var json = "";
								for (var i = 0; i < events.length; i++) {
									// json += '{"name":"'+ events[i].name +'"}';
									json += '{"name":"'+ events[i].name +'", "day":' + events[i].day + '}';
									if (i < eventCount - 1)
										json += ',';
								}
								json = '{"events":[' + json + ']}';
								console.log(json + "\n");
								callback("", JSON.parse(json));
							}
						}
						else
							onErr(err, callback);
					}); //end collection.find 
				}
				else {
					onErr(err, callback);
				}
			}); //end db.collection
		}
		else {
			onErr(err, callback);
		}
	}); // end db.open
};

exports.insertStudent = function(callback, studentObj) {
	db.open(function(err, db) {
		if (!err) {
			console.log("- Successfully opened DB.\n");
			db.collection("students", function(err, collection) {
				console.log("- Successfully in Students collection.\n");
				if (!err) {
					collection.insertOne(studentObj, function(err, res) {
						if (!err) {
							console.log("Record inserted:\n" + JSON.stringify(studentObj));
							db.close();
						}
						else
							onErr(err, callback);
					}); //end collection.find 
				}
				else {
					onErr(err, callback);
				}
			}); //end db.collection
		}
		else {
			onErr(err, callback);
		}
	}); // end db.open

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