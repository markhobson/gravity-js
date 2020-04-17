function Universe(bodies) {
	// the gravitational constant
	var g = 3e-9;

	var self = this;
	self.bodies = bodies;
	self.plot = plot;
	self.plotGrid = plotGrid;
	self.tick = tick;
	self.tickObjects = tickObjects;
	self.applyGravity = applyGravity;
	self.centre = centre;

	function plot(context) {
		var transform = context.getTransform();
		this.plotGrid(context, -transform.e, -transform.f);
		
		this.bodies.forEach(function (body) {
			body.plot(context);
		}, this);
	}

	function plotGrid(context, x0, y0) {
		var canvas = context.canvas;
		var x1 = x0 + canvas.width;
		var y1 = y0 + canvas.height;
		var s = 100;
		var w = 2;
		context.fillStyle = 'white';
		
		for (var x = Math.floor(x0 / s) * s; x < Math.ceil(x1 / s) * s; x += s) {
			for (var y = Math.floor(y0 / s) * s; y < Math.ceil(y1 / s) * s; y += s) {
				context.fillRect(x, y, w, w);
			}
		}
	}
	
	function tick(dt) {
		this.tickObjects(dt);
		this.applyGravity(dt);
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
					bodies[i].applyGravity(g, bodies[j], dt);
				}
			}
		}
	}
	
	function centre() {
		return avg(this.bodies.map(function (body) { return body.position; }));
	}
	
	function avg(vectors) {
		return vectors
			.reduce(function (u, v) { return u.add(v) })
			.scale(1 / vectors.length);
	}
}

export default Universe;
