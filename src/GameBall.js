var GameBall = AbstractBall.extend({
	init: function(x, y, ax, ay, ballID) {
		this._super(x, y, ax, ay, ballID);
		this.color = "white";
	},
	bottomScreenBehavior: function() {
		if ( this.y >= ( GAME_HEIGHT - this.radius ) ) {
			purgeBalls(this.ballID);
			numberOfBalls--;
		}
	},
	individualCollisionLogic: function() {
		if (Math.random() < BOMB_MODE_CHANCE) {
			this.startBombMode();
		}

		if (Math.random() < SPLIT_BALL_CHANCE) {
			ball[numberOfBalls] = new GameBall(this.x, this.y, this.ax, this.ay, numberOfBalls);
			numberOfBalls++;
		}
	},
	detectBatCollision: function(bat) {
		if (this.detectObjectCollision(bat) ) {
			if (bat.isMovingLeft) {
				this.ax += ACCELERATION_BY_BAT;
			}
			if (bat.isMovingRight) {
				this.ax-= ACCELERATION_BY_BAT;
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
		this.ax = INIT_BALL_AX;
		this.ay = INIT_BALL_AY;
	},
	draw: function(context) {
		if (this.alive) {
			this.move();
			this.drawHelper(context, true);
		}
	},
	startBombMode: function() {
		ball[this.ballID] = new BombBall(this.x, this.y, this.ax, this.ay, this.ballID);
	}
});