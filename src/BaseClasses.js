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

//-----------------------------------------------------------------------------
var AbstractBall = GameObject.extend({
	init: function(x, y, ax, ay) {
		this._super(x, y);
		this.ax = ax;
		this.ay = ay;
		this.radius = GAME_BALL_RADIUS;
	},
	drawHelper: function(context, isShowing) {
		if (isShowing && this.alive) {
			context.strokeStyle = "black";
			context.fillStyle = this.color;
			context.beginPath();
			context.arc( this.x, this.y, this.radius, 0, 2*Math.PI);
			context.stroke();
			context.fill();
		}
	},
	detectObjectCollision: function(obj) {
		if ((this.x + this.radius) >= obj.x && (this.x - this.radius) <= (obj.x + obj.w) && 
				(this.y + this.radius) >= obj.y && (this.y - this.radius) <= (obj.y + obj.h) && obj.alive) {
			this.ay *= -1;
			return true;
		}
		return false;
	}
});	