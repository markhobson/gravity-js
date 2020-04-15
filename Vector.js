function Vector(x, y) {
	var self = this;
	self.x = x;
	self.y = y;
	self.add = add;
	self.sub = sub;
	self.scale = scale;
	self.unit = unit;
	self.mod = mod;
	self.dot = dot;
	
	function add(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}
	
	function sub(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	}
	
	function scale(s) {
		return new Vector(this.x * s, this.y * s);
	}
	
	function unit() {
		return this.scale(1 / this.mod());
	}
	
	function mod() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	
	function dot(v) {
		v = v || this;
		return this.x * v.x + this.y * v.y;
	}
}

export default Vector;
