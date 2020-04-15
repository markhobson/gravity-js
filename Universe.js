function Universe(canvas, bodies) {
	var self = this;
	self.context = canvas.getContext('2d');
	// the gravitational constant
	self.g = 1e-13;
	self.bodies = bodies;
	self.timestamp = null;
	self.run = run;
	self.tick = tick;
	self.resize = resize;
	self.plot = plot;
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
		this.applyGravity();
		
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

		this.bodies.forEach(function (body) {
			body.plot(this.context);
		}, this);
	}

	function tickObjects(dt) {
		this.bodies.forEach(function (body) {
			body.tick(dt);
		});
	}
	
	function applyGravity() {
		for (var i = 0; i < bodies.length; i++) {
			for (var j = 0; j < bodies.length; j++) {
				if (i !== j) {
					bodies[i].applyGravity(this.g, bodies[j]);
				}
			}
		}
	}
}

export default Universe;
