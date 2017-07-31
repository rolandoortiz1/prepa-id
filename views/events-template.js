exports.build = function(eventArea) {
	return [
	'<!DOCTYPE html>',
		'<html>',
			'<head>',
				'<title>Event Attendance</title>',
				'<link rel="stylesheet" href="/assets/style.css"/>',
			'</head>',
			'<body>',
				'<h1>Freshmen Week Event Attendance<img src="/assets/images/logo_team_made.png" alt="Team MADE" align="top" height="125" width="100"/></h1>',
				'<center>',
					'<div id="eventArea"><form method="post" action="/events">{eventArea}<input type="text" name="studentID"></form></div>',
                    '<a href="/home">Home</a>',
				'</center>',
				'<style>',
					'div {',
						'font-size: 20px;',
					'}',
					'#eventArea {',
						'column-count: 2;',
					'}',
                    'a {',
						'color: white;',
                        'background-color: green;',
						'text-decoration: none;',
                        'padding: 7px;',
                    '}',
				'</style>',
			'</body>',
		'</html>']
	.join('')
	.replace(/{eventArea}/g, eventArea);
};