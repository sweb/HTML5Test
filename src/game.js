/**
 * Game logic
 */

var canvas = document.getElementById("gameCanvas");
canvas.width = GAME_WIDTH + MENU_WIDTH;
canvas.height = GAME_HEIGHT;

var keyState = {};

window.addEventListener("keydown", doKeyDown, true);
window.addEventListener("keyup", doKeyUp, true);

var context = canvas.getContext("2d");

context.fillStyle = "black";

context.font = GAME_FONTS;

var gameLoop = setInterval(update, TIME_PER_FRAME);

var isRunning;
var isGameOver;
var blockCounter ;
var menu ;
var bat ;
var ball ;
var blocks;
reset();

//-----------------------------------------------------------------------------
function update() {

	context.fillStyle = "#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);
	var tryToMoveLeft = keyState[37];
	var tryToMoveRight = keyState[39];
	var isTryingToReset = keyState[82];
	
	bat.motionToLeft(tryToMoveLeft);
	bat.motionToRight(tryToMoveRight);
	
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
		if (isTryingToReset) {
			reset();
		}
	}

	menu.draw(context);

	bat.draw(context);
	ball.draw(context);
	ball.detectBatCollision(bat);
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

function reset() {
	isRunning = false;
	isGameOver = false;
	blockCounter = 13 * 8;
	menu = new Menu();
	bat = new PlayerBat(GAME_WIDTH / 2 - 60, GAME_HEIGHT - 10);
	ball = new GameBall();
	blocks = new Array;
	for (var i = 0; i < 13; i++) {
		for (var j = 0; j < 8; j++) {
			blocks.push(new Block(10 + i
					* (BLOCK_WIDTH + VERTICAL_SPACE_BETWEEN_BLOCKS), 10 + j
					* (BLOCK_HEIGHT + HORIZONTAL_SPACE_BETWEEN_BLOCKS)));
		}
	}
}