import Vector from "./Vector.js";

function Universe(canvas, bodies) {
	var self = this;
	self.context = canvas.getContext('2d');
	// the gravitational constant
	self.g = 3e-9;
	self.bodies = bodies;
	self.timestamp = null;
	self.run = run;
	self.tick = tick;
	self.resize = resize;
	self.plot = plot;
	self.plotGrid = plotGrid;
	self.tickObjects = tickObjects;
	self.applyGravity = applyGravity;

	function run() {
		requestAnimationFrame(this.tick.bind(this));
	}

	function tick(timestamp) {
		var dt = timestamp - (this.timestamp || timestamp);
		this.timestamp = timestamp;
		
		this.resize();
		this.plot();
		this.tickObjects(dt);
		this.applyGravity(dt);
		
		this.run();
	}
	
	function resize() {
		var canvas = this.context.canvas;
		
		if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;			
		}
	}

	function plot() {
		var canvas = this.context.canvas;
		this.context.clearRect(0, 0, canvas.width, canvas.height);
		this.context.save();
		
		var centre = new Vector(canvas.width, canvas.height).scale(0.5);
		var origin = centre.sub(bodiesCentre(bodies));
		this.context.translate(origin.x, origin.y);

		this.plotGrid(-origin.x, -origin.y);
		this.bodies.forEach(function (body) {
			body.plot(this.context);
		}, this);
		
		this.context.restore();
	}

	function plotGrid(x0, y0) {
		var canvas = this.context.canvas;
		var x1 = x0 + canvas.width;
		var y1 = y0 + canvas.height;
		var s = 100;
		var w = 2;
		this.context.fillStyle = 'white';
		
		for (var x = Math.floor(x0 / s) * s; x < Math.ceil(x1 / s) * s; x += s) {
			for (var y = Math.floor(y0 / s) * s; y < Math.ceil(y1 / s) * s; y += s) {
				this.context.fillRect(x, y, w, w);
			}
		}
	}
	
	function tickObjects(dt) {
		this.bodies.forEach(function (body) {
			body.tick(dt);
		});
	}
	
	function applyGravity(dt) {
		for (var i = 0; i < bodies.length; i++) {
			for (var j = 0; j < bodies.length; j++) {
				if (i !== j) {
					bodies[i].applyGravity(this.g, bodies[j], dt);
				}
			}
		}
	}
	
	function bodiesCentre(bodies) {
		return avg(bodies.map(function (body) { return body.position; }));
	}
	
	function avg(vectors) {
		return vectors
			.reduce(function (u, v) { return u.add(v) })
			.scale(1 / vectors.length);
	}
}

export default Universe;
