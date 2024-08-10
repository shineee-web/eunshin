const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverMessage = document.getElementById('gameOverMessage');

const scale = 20; // size of each segment
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
let snakeLength = 1;
let food = {};
let direction = 'RIGHT';
let nextDirection = 'RIGHT';
let gameOver = false;

function setup() {
    document.addEventListener('keydown', changeDirection);
    resetGame();
    setInterval(gameLoop, 100);
}

function resetGame() {
    snake = [{ x: 10 * scale, y: 10 * scale }];
    snakeLength = 1;
    direction = 'RIGHT';
    nextDirection = 'RIGHT';
    spawnFood();
    gameOver = false;
    gameOverMessage.style.display = 'none'; // Hide game over message
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') { // Left arrow key
        nextDirection = 'LEFT';
    } else if (key === 38 && direction !== 'DOWN') { // Up arrow key
        nextDirection = 'UP';
    } else if (key === 39 && direction !== 'LEFT') { // Right arrow key
        nextDirection = 'RIGHT';
    } else if (key === 40 && direction !== 'UP') { // Down arrow key
        nextDirection = 'DOWN';
    }
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale
    };
}

function gameLoop() {
    if (gameOver) {
        gameOverMessage.style.display = 'block'; // Show game over message
        return;
    }

    direction = nextDirection;
    moveSnake();
    checkCollision();
    draw();
}

function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= scale;
    if (direction === 'DOWN') head.y += scale;
    if (direction === 'LEFT') head.x -= scale;
    if (direction === 'RIGHT') head.x += scale;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        snakeLength++;
        spawnFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
}

setup();
