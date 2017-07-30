exports.build = function(memberArea) {
	return [
	'<!DOCTYPE html>',
		'<html>',
			'<head>',
				'<title>Group Members</title>',
				'<link rel="stylesheet" href="/assets/style.css"/>',
			'</head>',
			'<body>',
				'<h1>Group Members<img src="/assets/images/logo_team_made.png" alt="Team MADE" align="top" height="125" width="100"/></h1>',
				'<center>',
					'<div id="tableArea"><form method="post" action="/events">{memberArea}</form></div>',
				'</center>',
				'<style>',
					'table {',
						'clear: left;',
						'text-align: center;',
						'border: 2px solid black;',
						'border-collapse: collapse;',
					'}',
					'th, td {',
						'padding: 8px;',
						'border: 2px solid black;',
						'border-collapse: collapse;',
					'}',
					'tr {',
						'border: 2px solid black;',
						'border-collapse: collapse;',
					'}',
				'</style>',
			'</body>',
		'</html>']
	.join('')
	.replace(/{memberArea}/g, memberArea);
};