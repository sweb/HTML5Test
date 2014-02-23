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
var Menu = Class.extend({
	init: function() {
		this.x = GAME_WIDTH;
		this.y = 0;
		this.w = MENU_WIDTH;
		this.h = GAME_HEIGHT;
		this.color = "#000";
		this.score = 0;
		this.lives = 3;
	},
	draw: function(context) {
		context.strokeStyle = "black";
		context.lineWidth = 1;
		context.strokeRect(this.x, this.y, this.w, this.h);
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.w, this.h);
		this.drawScore(context);
		this.drawLives(context);
	},
	drawScore: function(context) {
		context.font = "bold 24px sans-serif";
		context.fillStyle = "white";
		context.fillText("Score: " + this.score, this.x + 20, this.y + 30);
	},
	drawLives: function(context) {
		context.font = "bold 24px sans-serif";
		context.fillStyle = "red";
		context.fillText("Lives:" + this.lives, this.x + 20, this.y + 60);
	},
	increaseScore: function() {
		this.score++;
	},
	loseLife: function() {
		this.lives--;
		if (this.lives <= 0) {
			stop();
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
		this.isMovingLeft = false;
		this.isMovingRight = false;
	},
	motionToLeft: function(on) {
		if (on && this.x > 0) {
			this.isMovingLeft = true;
			this.x -= 5;
		} else {
			this.isMovingLeft = false;
		}
	},
	motionToRight: function(on) {
		if (on && this.x < (GAME_WIDTH - BAT_WIDTH)) {
			this.isMovingRight = true;
			this.x += 5;
		} else {
			this.isMovingRight = false;
		}
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
			menu.loseLife();
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
				menu.increaseScore();
			}
		}
	},
	detectBatCollision: function(bat) {
		if (this.detectObjectCollision(bat) ) {
			if (bat.isMovingLeft) {
				this.ax--;
			}
			if (bat.isMovingRight) {
				this.ax++;
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