/**
 * Game logic
 */

var canvas = document.getElementById("gameCanvas");
canvas.width = GAME_WIDTH + MENU_WIDTH;
canvas.height = GAME_HEIGHT;
canvas.style.cursor = "none";

var pictureOfBat = new Image();
pictureOfBat.src = "img/player_bat.png";

var keyState = {};

window.addEventListener("keydown", doKeyDown, true);
window.addEventListener("keyup", doKeyUp, true);
window.addEventListener("mousemove", doMouseMove, false);
window.addEventListener("click", doClick, false);

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
var numberOfBalls = 0;
reset();

//-----------------------------------------------------------------------------
function update() {

	context.fillStyle = "#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);
	var tryToMoveLeft = keyState[37];
	var tryToMoveRight = keyState[39];
	var isTryingToReset = keyState[82];
	
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

	if (numberOfBalls == 0) {
		menu.loseLife();
		isRunning = false;
		ball = new Array(99);
		ball[0] = new GameBall(BALL_START_POSITION_X, BALL_START_POSITION_Y, 0, 0, 0);
		numberOfBalls = 1;
	}

	menu.draw(context);

	bat.draw(context);
	for (var i = 0; i < numberOfBalls; i++) {
  		ball[i].draw(context);
  		ball[i].detectBatCollision(bat);
		ball[i].detectBlockCollision(blocks);
	}
	for (var i = 0; i < blocks.length; i++) {
		blocks[i].draw(context);
	}
	batMotion = false;
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
	for (var i = 0; i < numberOfBalls; i++) {
  		ball[i].reset();
  		ball[i].alive = false;
	}
	bat.alive = false;
	isGameOver = true;
}

function reset() {
	isRunning = false;
	isGameOver = false;
	blockCounter = 13 * 8;
	menu = new Menu();
	bat = new PlayerBat(GAME_WIDTH / 2 - 60, GAME_HEIGHT - 10);
	ball = new Array(99);
	ball[0] = new GameBall(BALL_START_POSITION_X, BALL_START_POSITION_Y, 0, 0, 0);
	numberOfBalls = 1;
	blocks = new Array;
	for (var i = 0; i < 13; i++) {
		for (var j = 0; j < 8; j++) {
			blocks.push(new Block(10 + i
					* (BLOCK_WIDTH + VERTICAL_SPACE_BETWEEN_BLOCKS), 10 + j
					* (BLOCK_HEIGHT + HORIZONTAL_SPACE_BETWEEN_BLOCKS)));
		}
	}
}

function doMouseMove(e) {
	// bat.x = e.pageX - BAT_WIDTH/2;
	mouseXPosition = e.pageX - BAT_WIDTH/2;
	bat.move(mouseXPosition);
}

function doClick(e) {
	if (!isRunning) {
		for (var i = 0; i < 1; i++) {
			ball[i].release();
		}
		isRunning = true;
	}
}

function purgeBalls(pos) {
	for (var i = pos; i < numberOfBalls - 1; i++) {
		ball[i] = ball[i + 1];
		ball[i].ballID--;
	}
}