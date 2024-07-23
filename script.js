const board = document.getElementById("board");
const startBtn = document.getElementById("startBtn");
const logo = document.getElementById("snake-logo");

let snake = [{ x: 10, y: 10 }];
let food = generateFoodLocation(); // GENERATE THE FOOD LOCATION ONE TIME
let direction = "up"; // BY DEFAULT GO UP FIRST
let gameInterval = "";

function draw() {
    board.innerHTML = ''

    drawSnake();
    drawFood();
}

function drawSnake() {

    snake.forEach((segment) => {
        let snakeDiv = document.createElement("div");
        snakeDiv.className = "snake";

        snakeDiv.style.gridColumn = segment.x;
        snakeDiv.style.gridRow = segment.y;

        board.append(snakeDiv)
    })
}

function drawFood() {
    let foodDiv = document.createElement("div");
    foodDiv.className = "food";

    foodDiv.style.gridColumn = food.x;
    foodDiv.style.gridRow = food.y;

    board.append(foodDiv)
}

function generateFoodLocation() {

    let x = Math.floor(Math.random() * 20) + 1;
    let y = Math.floor(Math.random() * 20) + 1;

    return { x, y };
}

function move() {
    let headOfSnake = { ...snake[0] };

    switch (direction) {
        case "up":
            headOfSnake.y--; break;
        case "down":
            headOfSnake.y++; break;
        case "right":
            headOfSnake.x++; break;
        case "left":
            headOfSnake.x--; break;
        default: break;
    }

    // {10,8}, {10,9}
    // checkCollision(headOfSnake);

    // console.log(snake)

    snake.unshift(headOfSnake);

    checkCollision(headOfSnake);

    //===== IF THE SNAKE'S HEAD EAT THE FOOD =====
    if (headOfSnake.x == food.x && headOfSnake.y == food.y) {
        food = generateFoodLocation(); // GENERATE A RANDOM LOCATION FOR THE FOOD
        clearInterval(gameInterval);

        gameInterval = setInterval(() => {
            draw();
            move();
        }, 200);

    } else {
        snake.pop();
    }

}

function checkCollision(headOfSnake) {
    // console.log("headOfSnake.x : " + headOfSnake.x + " headOfSnake.y : " + headOfSnake.y)
    console.log("snake.filter((item, i) => i != 0 && item.x == headOfSnake.x && item.y == headOfSnake.y).length == 1 : ", snake.filter((item, i) => i != 0 && item.x == headOfSnake.x && item.y == headOfSnake.y).length == 1)

    if (headOfSnake.x < 0 || headOfSnake.y < 0 || headOfSnake.x > 20 || headOfSnake.y > 20) {
        board.innerHTML = ''

        //===== BACK TO START PAGE =====
        startBtn.style.display = "block";
        logo.style.display = "block";

        //=====RESET INTERVAL=====
        clearInterval(gameInterval);
        direction = 'left';

    } else if (snake.filter((item, i) => i != 0 && item.x == headOfSnake.x && item.y == headOfSnake.y).length == 1 && snake.length != 1) {
        board.innerHTML = ''

        //===== BACK TO START PAGE =====
        startBtn.style.display = "block";
        logo.style.display = "block";

        //=====RESET INTERVAL=====
        clearInterval(gameInterval);
        direction = 'left';
    }
}

function handleKeyPress(event) {
    let key = event.key;

    switch (key) {
        case "ArrowRight": direction = "right"; break;
        case "ArrowLeft": direction = "left"; break;
        case "ArrowUp": direction = "up"; break;
        case "ArrowDown": direction = "down"; break;
        default: break;
    }
}

function startGame() {
    //===== HIDE THE LOGO AND THE START BUTTON =====
    startBtn.style.display = "none";
    logo.style.display = "none";

    snake = [{ x: 10, y: 10 }];
    food = generateFoodLocation();
    console.log("snake : ", snake)

    //==== START THE GAME LOGIC =====
    gameInterval = setInterval(() => {
        draw();
        move();
    }, 200);
}

document.addEventListener("keydown", handleKeyPress)
startBtn.addEventListener("click", startGame)
