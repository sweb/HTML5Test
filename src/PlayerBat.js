var PlayerBat = Rectangle.extend({
	init: function(x, y) {
		this._super(x, y);
		this.w = BAT_WIDTH;
		this.h = BAT_HEIGHT;
		this.color = "#000";
		this.isMovingLeft = false;
		this.isMovingRight = false;
		this.pastPositions = new Array();
		this.pastPositions.push(this.x);
		this.pastPositions.push(this.x);
		this.pastPositions.push(this.x);
	},
	draw: function(context) {
		//this._super(context);
		if (this.alive) {
			context.drawImage(pictureOfBat, this.x, this.y);
		}
		this.pastPositions[0] = this.pastPositions[1]; 
		this.pastPositions[1] = this.pastPositions[2];
		this.pastPositions[2] = this.x;

		if (this.pastPositions[2] < this.pastPositions[1] && this.pastPositions[1] < this.pastPositions[0] && (this.pastPositions[0] - this.pastPositions[2] >= 10) ) {
			this.isMovingLeft = true;
		} else {
			this.isMovingLeft = false;
		}

		if (this.pastPositions[2] > this.pastPositions[1] && this.pastPositions[1] > this.pastPositions[0] && (this.pastPositions[2] - this.pastPositions[0] >= 10) ) {
			this.isMovingRight = true;
		} else {
			this.isMovingRight = false;
		}
	},
	move: function(pos) {
		if (pos > 0 && pos < (GAME_WIDTH - BAT_WIDTH)) {
			this.x = pos;
		}
	}
});