var Game = Class.extend({
	init: function() {
		this.hasStarted = false;
	},
	start: function() {
		this.hasStarted = true;
	},
	stop: function() {
		this.hasStarted = false;
	}
});

//-----------------------------------------------------------------------------
var GameObject = Class.extend({
	init: function(x, y) {
		this.x = x;
		this.y = y;
    this.w = 0;
    this.h = 0;
		this.alive = true;
	}
});

//-----------------------------------------------------------------------------
var Rectangle = GameObject.extend({
	init: function(x, y) {
		this._super(x, y);
	},
	draw: function(context, img, background, oldX, oldY) {
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    context.drawImage(background, oldX, oldY, this.w + 7, this.h + 7, oldX, 
      oldY, this.w + 7, this.h + 7);
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
    context.shadowBlur = 5;
		if (this.alive) {
			context.drawImage(img, this.x, this.y);
		}
	}
});	
