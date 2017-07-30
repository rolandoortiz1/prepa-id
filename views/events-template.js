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
					'<div id="eventArea"><form method="post" action="/events">{eventArea}</form></div>',
				'</center>',
				'<style>',
					'div {',
						'font-size: 20px;',
					'}',
					'#eventArea {',
						'column-count: 3;',
					'}',
				'</style>',
			'</body>',
		'</html>']
	.join('')
	.replace(/{eventArea}/g, eventArea);
};