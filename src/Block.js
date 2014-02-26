var Block = Rectangle.extend({
	init: function(x, y) {
		this._super(x, y);
		this.w = BLOCK_WIDTH;
		this.h = BLOCK_HEIGHT;
		this.color = "#FFF";
	}
});