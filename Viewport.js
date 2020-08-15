import Vector from "./Vector.js";

function Viewport(canvas, universe) {
	var maxDt = 100;
	
	var self = this;
	self.context = canvas.getContext('2d');
	self.universe = universe;
	self.position = null;
	self.speed = 0.01;
	self.timestamp = null;
	self.run = run;
	self.tick = tick;
	self.plot = plot;
	self.move = move;
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
		if (this.position == null)
		{
			this.move(0);
		}
		
		this.plot();
		this.universe.tick(dt);
		this.move(dt);
		
		this.run();
	}
	
	function plot() {
		var canvas = this.context.canvas;
		this.context.clearRect(0, 0, canvas.width, canvas.height);
		this.context.save()
		this.context.translate(this.position.x, this.position.y);
		
		this.universe.plot(this.context);
		
		this.context.restore();
	}
	
	function move(dt) {
		var centre = new Vector(canvas.width, canvas.height).scale(0.5);
		var target = centre.sub(this.universe.centre());
		
		var t = Math.min(this.speed * dt, 1);
		this.position = (this.position || target).lerp(target, t);
	}
	
	function resize() {
		var canvas = this.context.canvas;
		
		if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;			
		}
	}
}

export default Viewport;
