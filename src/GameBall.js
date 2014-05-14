var GameBall = AbstractBall.extend({
	init: function(x, y, ax, ay, ballID) {
		this._super(x, y, ax, ay, ballID);
		this.color = "white";
	},
	bottomScreenBehavior: function() {
		if ( this.y >= ( GAME_HEIGHT - this.radius ) ) {
        this.cleanUpGraphics(context);
        this.alive = false;
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
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.shadowBlur = 0;
      context.drawImage(background, this.oldX - this.radius, 
          this.oldY - this.radius, 2 * this.radius, 2 * this.radius, 
          this.oldX - this.radius, this.oldY - this.radius, 
          2 * this.radius, 2 * this.radius);
			context.drawImage(pictureOfGameBall, this.x - this.radius, this.y - this.radius);
      context.shadowOffsetX = 4;
      context.shadowOffsetY = 4;
      context.shadowBlur = 5;
      this.oldX = this.x;
      this.oldY = this.y;
		}
	},
	startBombMode: function() {
		ball[this.ballID] = new BombBall(this.x, this.y, this.ax, this.ay, this.ballID);
	}
});
