// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the unit size
const box = 20;

// Create the snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// Create the food
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Define the initial score
let score = 0;

// Control the snake direction
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Check if snake collides with itself or walls
function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height) {
        return true;
    }
    return false;
}

// Draw the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Check if snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    // Add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    // Draw the score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, box, box);
}

// Call draw function every 100 ms
let game = setInterval(draw, 100);
