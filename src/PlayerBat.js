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