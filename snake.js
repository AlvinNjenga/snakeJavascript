const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Create the unit
const box = 32;

// Load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Load audio files

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"


// Make the snake!

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box,
}

// Create the food 

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Create the score variable

let score = 0;

// Control the snake!

let d;

document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode;

    if(key == 37 && d != "RIGHT"){
        right.play();
        d = "LEFT";
    } else if(key == 38 && d != "DOWN"){
        down.play();
        d = "UP";
    } else if(key == 39 && d != "LEFT"){
        left.play();
        d = "RIGHT";
    } else if(key == 40 && d != "UP"){
        up.play();
        d = "DOWN";
    }
    console.log(d);
}
// Checks for collision of snake head & body

function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        } 
    }
    return false;
}

// Draw everything to canvas

function draw() {
    ctx.drawImage(ground, 0, 0);
    
    for( let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // Old head position
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // If snake eats food

    if(snakeX == food.x && snakeY == food.y){
        eat.play();
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    } else {
        //remove the tail
        snake.pop();
    }

    // Directions
    
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // Add new head

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // Game over

    if(snakeX < box || snakeX > 17 * box || 
        snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
            dead.play();
            clearInterval(game);
        }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Sans-serif";
    ctx.fillText(score, 2.2*box, 1.65*box);
}

// Call draw function 10 times a second

let game = setInterval(draw, 100);