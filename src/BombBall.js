var BombBall = AbstractBall.extend({
	init: function(x, y, ax, ay) {
		this._super(x, y,  ax, ay);
		this.color = "red";
		this.bombTimer = BOMB_MODE_TIME;
	},
	bottomScreenBehavior: function() {
		if ( this.y >= ( GAME_HEIGHT - this.radius ) ) {
			this.ay *= -1;
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