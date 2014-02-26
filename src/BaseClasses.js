var Game = Class.extend({
	init: function() {
		this.hasStarted = false;
	},
	start: function() {
		this.hasStarted = true;
	},
	stop: function() {
		this.hasStarted = false;
	}
});

//-----------------------------------------------------------------------------
var GameObject = Class.extend({
	init: function(x, y) {
		this.x = x;
		this.y = y;
		this.alive = true;
	}
});

//-----------------------------------------------------------------------------
var Rectangle = GameObject.extend({
	init: function(x, y) {
		this._super(x, y);
	},
	draw: function(context) {
		if (this.alive) {
			context.strokeStyle = "black";
			context.lineWidth = 1;
			context.strokeRect(this.x, this.y, this.w, this.h);
			context.fillStyle = this.color;
			context.fillRect(this.x, this.y, this.w, this.h);
		}
	}
});