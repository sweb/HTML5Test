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
	},
	detectBlockCollision: function(blocks) {
		for (var i = 0; i < blocks.length; i++) {
			if (this.detectObjectCollision(blocks[i])) {
				blocks[i].alive = false;
				blockCounter--;
				menu.increaseScore();
				this.individualCollisionLogic();
			}
		}
	},
	individualCollisionLogic: function() {

	},
	move: function() {
		if ( this.x >= (GAME_WIDTH - this.radius) || this.x <= this.radius ) {
			this.ax *= -1;
		}
		if ( this.y <= this.radius) {
			this.ay *= -1;
		}
		this.bottomScreenBehavior();
		
		this.x += this.ax;
		this.y += this.ay;
	},
	bottomScreenBehavior: function() {

	}
});	