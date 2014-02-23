/**
 * Game logic
 */

var canvas = document.getElementById("gameCanvas");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

var keyState = {};

window.addEventListener("keydown", doKeyDown, true);
window.addEventListener("keyup", doKeyUp, true);

var context = canvas.getContext("2d");

context.fillStyle = "black";

context.font = GAME_FONTS;

var gameLoop = setInterval(update, TIME_PER_FRAME);

var isRunning = false;
var isGameOver = false;

var blockCounter = 13 * 8;

var bat = new PlayerBat(GAME_WIDTH / 2 - 60, GAME_HEIGHT - 10);

var ball = new GameBall();

var blocks = new Array;

for (var i = 0; i < 13; i++) {
	for (var j = 0; j < 8; j++) {
		blocks.push(new Block(10 + i
				* (BLOCK_WIDTH + VERTICAL_SPACE_BETWEEN_BLOCKS), 10 + j
				* (BLOCK_HEIGHT + HORIZONTAL_SPACE_BETWEEN_BLOCKS)));
	}
}

//-----------------------------------------------------------------------------
function update() {

	context.fillStyle = "#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	if (keyState[37] && bat.x > 0) {
		bat.x -= 5;
	}
	
	if (keyState[39] && bat.x < (GAME_WIDTH - BAT_WIDTH)) {
		bat.x += 5;
	}
	
	if (keyState[38] && !isRunning) {
		ball.release();
		isRunning = true;
	}
	
	if (!isGameOver && blockCounter == 0) {
		stop();
	}
	
	if (isGameOver) {
		context.font = "bold 24px sans-serif";
		context.fillStyle = "black";
		context.fillText("Game Over!", GAME_WIDTH / 2 - 60, GAME_HEIGHT / 2);
	}

	bat.draw(context);
	ball.draw(context);
	ball.detectObjectCollision(bat);
	ball.detectBlockCollision(blocks);
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].draw(context);
	}
}
//-----------------------------------------------------------------------------
function doKeyDown(e) {
	keyState[e.keyCode] = true;
}
//-----------------------------------------------------------------------------
function doKeyUp(e) {
	keyState[e.keyCode] = false;
}

function stop() {
	ball.reset;
	ball.alive = false;
	bat.alive = false;
	isGameOver = true;
}