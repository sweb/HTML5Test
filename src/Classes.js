/**
 * Contains classes
 */

//-----------------------------------------------------------------------------
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
var PlayerBat = Rectangle.extend({
	init: function(x, y) {
		this._super(x, y);
		this.w = BAT_WIDTH;
		this.h = BAT_HEIGHT;
		this.color = "#000";
	}
});

//-----------------------------------------------------------------------------
var Block = Rectangle.extend({
	init: function(x, y) {
		this._super(x, y);
		this.w = BLOCK_WIDTH;
		this.h = BLOCK_HEIGHT;
		this.color = "#FFF";
	}
});

//-----------------------------------------------------------------------------
var GameBall = GameObject.extend({
	init: function() {
		this._super(0, 0);
		this.reset();
		this.radius = GAME_BALL_RADIUS;
	},
	move: function() {
		if ( this.x >= (GAME_WIDTH - this.radius) || this.x <= this.radius ) {
			this.ax *= -1;
		}
		
		if ( this.y <= this.radius) {
			this.ay *= -1;
		}
		
		if ( this.y >= ( GAME_HEIGHT - this.radius )) {
			this.reset();
			isRunning = false;
		}
		
		this.x += this.ax;
		this.y += this.ay;
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
			}
		}
	},
	reset: function() {
		this.x = BALL_START_POSITION_X;
		this.y = BALL_START_POSITION_Y;
		this.ax = 0;
		this.ay = 0;
	},
	release: function() {
		this.ax = 2;
		this.ay = -4;
	},
	draw: function(context) {
		if (this.alive) {
			this.move();
			context.strokeStyle = "black";
			context.fillStyle = "white";
			context.beginPath();
			context.arc( this.x, this.y, this.radius, 0, 2*Math.PI);
			context.stroke();
			context.fill();
		}
	}
});