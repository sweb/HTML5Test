var GameBall = AbstractBall.extend({
	init: function(x, y, ax, ay) {
		this._super(x, y, ax, ay);
		this.color = "white";
	},
	move: function() {
		if ( this.x >= (GAME_WIDTH - this.radius) || this.x <= this.radius ) {
			this.ax *= -1;
		}
		
		if ( this.y <= this.radius) {
			this.ay *= -1;
		}
		
		if ( this.y >= ( GAME_HEIGHT - this.radius ) ) {
			this.reset();
			isRunning = false;
			menu.loseLife();
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
				if (Math.random() < BOMB_MODE_CHANCE) {
					this.startBombMode();
				}
			}
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
		this.move();
		this.drawHelper(context, true);
	},
	startBombMode: function() {
		ball = new BombBall(this.x, this.y, this.ax, this.ay);
	}
});