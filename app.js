import Body from './Body.js';
import Universe from './Universe.js';

window.onload = run;
	
function run() {
	var canvas = document.getElementById('app');
	var bodies = randomBodies(3, canvas.clientWidth, canvas.clientHeight);
	new Universe(canvas, bodies).run();
}

function randomBodies(n, width, height) {
	var bodies = new Array(n);
	for (var i = 0; i < bodies.length; i++) {
		bodies[i] = randomNonIntersectingBody(width, height, bodies);
	}
	return bodies;
}

function randomNonIntersectingBody(width, height, bodies) {
	var body;
	do {
		body = randomBody(width, height);
	}
	while (intersecting(body, bodies));
	return body;
}

function intersecting(body, bodies) {
	for (var i = 0; i < bodies.length && bodies[i] !== undefined; i++) {
		if (body.isColliding(bodies[i])) {
			return true;
		}
	}
	return false;
}

function randomBody(width, height) {
	var radius = 25 + Math.random() * 25;
	var x = radius + Math.random() * (width - 2 * radius);
	var y = radius + Math.random() * (height - 2 * radius);
	var dx = (Math.random() - 0.5) / 2;
	var dy = (Math.random() - 0.5) / 2;
	var color = '#' + parseInt(Math.random() * 0xFFFFFF).toString(16);

	return new Body(x, y, radius, dx, dy, color);
}
