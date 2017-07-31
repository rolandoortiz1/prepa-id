var template = require('../views/template-main');
exports.get = function(req, res) {
	if (!err) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(template.build("Error: Page not found", "404 Page not found", "<p>The page you are trying to reach could not be found.</p>"));
		res.end();
	}
	else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(template.build("Error loading page", "Error loading 404 page", "<p>The page you tried to reach could not be found. There was also an error loading this error page. Error details: " + err + "</p>"));
		res.end();
	}
};