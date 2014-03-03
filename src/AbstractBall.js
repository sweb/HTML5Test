//-----------------------------------------------------------------------------
var AbstractBall = GameObject.extend({
	init: function(x, y, ax, ay, ballID) {
		this._super(x, y);
		this.ax = ax;
		this.ay = ay;
		this.radius = GAME_BALL_RADIUS;
		this.correctionAlreadyHappened = false;
		this.ballID = ballID;
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
		var leftBorderOfBall = (this.x + this.radius);
		var rightBorderOfBall = (this.x - this.radius);
		var topBorderOfBall = (this.y + this.radius);
		var bottomBorderOfBall = (this.y - this.radius);

		if (leftBorderOfBall >= obj.x && rightBorderOfBall <= (obj.x + obj.w) && 
				topBorderOfBall >= obj.y && bottomBorderOfBall <= (obj.y + obj.h) && obj.alive) {
			var yBeforeLastMove = this.y - this.ay;
			var hasVerticalHitBefore = ((yBeforeLastMove + this.radius) >= obj.y) && ((yBeforeLastMove - this.radius) <= (obj.y + obj.h));
			var xBeforeLastMove = this.x - this.ax;
			var hasHorizontalHitBefore = ((xBeforeLastMove + this.radius) >= obj.x) && ((xBeforeLastMove - this.radius) <= (obj.x + obj.w) );
			if (this.ay < 0 && !this.correctionAlreadyHappened && !hasVerticalHitBefore) {
				this.y += ((obj.y + obj.h) - bottomBorderOfBall) *2;
				this.ay *= -1;
			} else if (this.ay > 0 && !this.correctionAlreadyHappened && !hasVerticalHitBefore) {
				this.y += (obj.y - topBorderOfBall) *2;
				this.ay *= -1;
			}

			if (this.ax > 0 && !this.correctionAlreadyHappened && !hasHorizontalHitBefore) {
				this.x -= (obj.x - leftBorderOfBall) * 2;
				this.ax *= -1;
			} else if (this.ax < 0 && !this.correctionAlreadyHappened && !hasHorizontalHitBefore) {
				this.x -= ((obj.x + obj.w) - rightBorderOfBall) * 2;
				this.ax *= -1;
			}
			this.correctionAlreadyHappened = true;
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
			diffToLeft = this.x - this.radius;
			diffToRight = (GAME_WIDTH - this.radius) - this.x;
			if (diffToLeft < 0) {
				this.x -= diffToLeft * 2;
			}
			if (diffToRight < 0) {
				this.x += diffToRight * 2;
			}
		}
		if ( this.y <= this.radius) {
			this.ay *= -1;
			diffToTop = this.y - this.radius;
			this.y -= diffToTop * 2;
		}
		this.bottomScreenBehavior();
		
		this.x += this.ax;
		this.y += this.ay;
		this.correctionAlreadyHappened = false;
	},
	bottomScreenBehavior: function() {

	}
});