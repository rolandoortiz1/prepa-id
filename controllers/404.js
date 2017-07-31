var template = require('../views/template-main');
exports.get = function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(template.build("Error: Page not found", "404 Page not found", "<p>The page you are trying to reach could not be found.</p>"));
	res.end();
};