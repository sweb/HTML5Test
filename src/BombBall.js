var BombBall = AbstractBall.extend({
	init: function(x, y, ax, ay, ballID) {
		this._super(x, y,  ax, ay, ballID);
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
			numberOfBalls=0;
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
				ball[this.ballID] = new GameBall(this.x, this.y, this.ax, this.ay, this.ballID);
			}
		}
	},
	reset: function() {
		ball[this.ballID] = new GameBall(BALL_START_POSITION_X, BALL_START_POSITION_Y, 0, 0, this.ballID);
	}
});