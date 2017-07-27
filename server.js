var host = "localhost";
var port = 3000;
var http = require("http");
var server = http.createServer(function(req, res) {
	require("./router").get(req, res);
}); // end server()
server.listen(port, host);
console.log("Listening to http://" + host + ":" + port);