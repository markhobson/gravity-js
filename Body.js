import Vector from './Vector.js';

function Body(x, y, radius, dx, dy, color) {
	var self = this;
	self.position = new Vector(x, y);
	self.radius = radius;
	self.mass = mass(radius, 1);
	self.velocity = new Vector(dx, dy);
	self.color = color;
	self.plot = plot;
	self.tick = tick;
	self.isColliding = isColliding;
	self.distance = distance;
	self.applyGravity = applyGravity;
	
	function mass(radius, density) {
		var volume = 4 * Math.PI * radius * radius * radius / 3;
		return volume * density;
	}
	
	function plot(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.ellipse(this.position.x, this.position.y, this.radius, this.radius, 0, 0, 2 * Math.PI);
		context.fill();
	}

	function tick(dt) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
	}
	
	function isColliding(body) {
		return this.distance(body) <= this.radius + body.radius;
	}
	
	function distance(body) {
		return this.position.sub(body.position).mod();
	}
	
	function applyGravity(g, body) {
		// obtain unit vector in direction of body
		var d = body.position.sub(this.position).unit();
		
		// Newton's law of universal gravitation
		var r = this.distance(body);
		var f = g * this.mass * body.mass / r * r;
		
		// Newton's second law
		var a = d.scale(f / this.mass);
		
		// apply change in velocity
		this.velocity = this.velocity.add(a);
	}
}

export default Body;
