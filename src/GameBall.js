var GameBall = GameObject.extend({
	init: function() {
		this._super(0, 0);
		this.reset();
		this.radius = GAME_BALL_RADIUS;
	},
	isBomb: function() {
		return this.bombTimer > 0;
	},
	move: function() {
		if ( this.x >= (GAME_WIDTH - this.radius) || this.x <= this.radius ) {
			this.ax *= -1;
		}
		
		if ( this.y <= this.radius) {
			this.ay *= -1;
		}
		
		if ( this.y >= ( GAME_HEIGHT - this.radius ) ) {
			if (this.isBomb()) {
				this.ay *= -1;
			} else {
				this.reset();
				isRunning = false;
				menu.loseLife();
			}
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
				if (Math.random() < BOMB_MODE_CHANCE) {
					this.startBombMode();
				}
			}
		}
	},
	detectBatCollision: function(bat) {
		if (this.detectObjectCollision(bat) ) {
			if (this.isBomb()) {
				this.reset();
				isRunning = false;
				menu.loseLife();
			} else {
				if (bat.isMovingLeft) {
					this.ax += ACCELERATION_BY_BAT;
				}
				if (bat.isMovingRight) {
					this.ax-= ACCELERATION_BY_BAT;
				}
			}
		}
	},
	reset: function() {
		this.x = BALL_START_POSITION_X;
		this.y = BALL_START_POSITION_Y;
		this.ax = 0;
		this.ay = 0;
		this.bombTimer = 0;
		this.color = "white";
	},
	release: function() {
		this.ax = INIT_BALL_AX;
		this.ay = INIT_BALL_AY;
	},
	draw: function(context) {
		this.displayBall = true;
		if (this.alive) {
			if (this.isBomb()) {
				if (this.bombTimer < END_OF_BOMB_WARN_TIME && this.bombTimer % FLICKER_REPETITION < FLICKER_REPETITION/2) {
					this.displayBall = false;
				}
				this.bombTimer--;
			} else {
				this.color = "white";
			}
			this.move();
			this.drawHelper(context, this.displayBall);
		}
	},
	drawHelper: function(context, bool) {
		if (bool) {
			context.strokeStyle = "black";
			context.fillStyle = this.color;
			context.beginPath();
			context.arc( this.x, this.y, this.radius, 0, 2*Math.PI);
			context.stroke();
			context.fill();
		}
	},
	startBombMode: function() {
		if (!this.isBomb()) {
			this.color = "red";
			this.bombTimer = BOMB_MODE_TIME;
		}
	}
});