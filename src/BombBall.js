var BombBall = AbstractBall.extend({
	init: function(x, y, ax, ay) {
		this._super(x, y,  ax, ay);
		this.color = "red";
		this.bombTimer = BOMB_MODE_TIME;
	},
	move: function() {
		if ( this.x >= (GAME_WIDTH - this.radius) || this.x <= this.radius ) {
			this.ax *= -1;
		}
		if ( this.y <= this.radius) {
			this.ay *= -1;
		}
		if ( this.y >= ( GAME_HEIGHT - this.radius ) ) {
			this.ay *= -1;
		}
		this.x += this.ax;
		this.y += this.ay;
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
			this.reset();
			isRunning = false;
			menu.loseLife();
		}
	},
	draw: function(context) {
		this.displayBall = true;
		if (this.alive) {
			if (this.bombTimer < END_OF_BOMB_WARN_TIME && this.bombTimer % FLICKER_REPETITION < FLICKER_REPETITION/2) {
				this.displayBall = false;
			}
			this.bombTimer--;
			this.move();
			this.drawHelper(context, this.displayBall);
			if (this.bombTimer == 0) {
				ball = new GameBall(this.x, this.y, this.ax, this.ay);
			}
		}
	},
	reset: function() {
		ball = new GameBall(BALL_START_POSITION_X, BALL_START_POSITION_Y, 0, 0);
	}
});