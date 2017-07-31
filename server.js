var host = "localhost";
//var host = "192.168.43.237"; // Uncomment and change to the correct IP address for outside connections.
var port = 3000;
var http = require("http");
var server = http.createServer(function(req, res) {
	require("./router").get(req, res);
}); // end server()
server.listen(port, host);
console.log("Listening to http://" + host + ":" + port);