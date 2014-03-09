var Menu = Class.extend({
	init: function() {
		this.x = GAME_WIDTH;
		this.y = 0;
		this.w = MENU_WIDTH;
		this.h = GAME_HEIGHT;
		this.color = "#000";
		this.score = 0;
		this.lives = 3;
	},
	draw: function(context) {
		context.strokeStyle = "black";
		context.lineWidth = 1;
		context.strokeRect(this.x, this.y, this.w, this.h);
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.w, this.h);
		this.drawScore(context);
		this.drawLives(context);
	},
	drawScore: function(context) {
		context.font = "bold 24px sans-serif";
		context.fillStyle = "white";
		context.fillText("Score: " + this.score, this.x + 20, this.y + 30);
	},
	drawLives: function(context) {
		context.font = "bold 24px sans-serif";
		context.fillStyle = "red";
		context.fillText("Lives:" + this.lives, this.x + 20, this.y + 60);
	},
	increaseScore: function() {
		this.score++;
	},
	loseLife: function() {
		this.lives--;
		if (this.lives <= 0) {
			stop();
		}
	}
});