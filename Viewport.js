import Vector from "./Vector.js";

function Viewport(canvas, universe) {
	var maxDt = 100;
	
	var self = this;
	self.context = canvas.getContext('2d');
	self.universe = universe;
	self.timestamp = null;
	self.run = run;
	self.tick = tick;
	self.plot = plot;
	self.resize = resize;

	function run() {
		requestAnimationFrame(this.tick.bind(this));
	}

	function tick(timestamp) {
		var dt = timestamp - (this.timestamp || timestamp);
		this.timestamp = timestamp;
		// cap time delta to prevent huge movements after process sleeps
		dt = Math.min(dt, maxDt);
		
		this.resize();
		this.plot();
		this.universe.tick(dt);
		
		this.run();
	}
	
	function plot() {
		var canvas = this.context.canvas;
		this.context.clearRect(0, 0, canvas.width, canvas.height);
		this.context.save();
		
		var centre = new Vector(canvas.width, canvas.height).scale(0.5);
		var origin = centre.sub(this.universe.centre());
		this.context.translate(origin.x, origin.y);
		
		this.universe.plot(this.context);
		
		this.context.restore();
	}
	
	function resize() {
		var canvas = this.context.canvas;
		
		if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;			
		}
	}
}

export default Viewport;
