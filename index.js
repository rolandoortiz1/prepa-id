/*
var host = "localhost:27017";
var database = "PREPA_ID";
var MongoClient = require("mongodb").MongoClient;

// Connect to the db
MongoClient.connect("mongodb://" + host + "/" + database, function (err, db) {

	if (err) throw err;

	db.collection("users", function(err, collection) {
		collection.find({}).toArray(function(err, results) {
			path = results;
			console.log(results);
		});
	});
});
*/

var http = require("http"),
path = require("path"),
url = require("url"),
fs = require("fs");

http.createServer(function(request, response) {
	var my_path = url.parse(request.url).pathname;
	var full_path = path.join(process.cwd(),my_path);

	fs.exists(full_path, function(exists) {
		if (!exists) {
			response.writeHeader(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();
		}
		else {
			fs.readFile(full_path, "binary", function(err, file) {
				if (err) {
					response.writeHeader(500, {"Content-Type": "text/plain"});
					response.write(err + "\n");
					response.end();
				}
				else {
					response.writeHeader(200);
					response.write(file, "binary");
					response.end();
				}
			});
		}
	});
}).listen(8080);

console.log("Server Running on 8080");

