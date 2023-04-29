let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
let speed = 5;
let lastPaintTime = 0;
//snakearray is a snake(snake is an array becaus as snake eat it will grow)
let snakeArr = [
    { x: 13, y: 15 }
]
// food is not an array its an object

food = { x: 6, y: 7 };
let score = 0;


//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function iscollide(snake) {
    //if u bump into urself
    for(let i=1 ;i<snakeArr.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        return true;
        
    }
    //if u bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        return true;
}

function gameEngine() {
    //part1 Updating the snake array(snake) and food

    //update the snake array
    if (iscollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over press any key to restart the game!");
        snakeArr = [{ x: 13, y: 15 }];
        // musicsound.play();
        score = 0;

    }
    // if snake has eaten the food then, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score+=1;
        if(score>highscoreval)
        {
            highscoreval=score;
            localStorage.setItem("highscore" ,JSON.stringify(highscoreval));
            highScoreBox.innerHTML="Hightest Score:" +highscoreval;
        }
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: 2 + Math.round(a + (b - a) * Math.random()), y: 2 + Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part2 display the snake and food

    //display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })


    //display the food


    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);




}








//main logic of game
let highscore=localStorage.getItem("highscore");
if(highscore===null)
{
    highscoreval=0;
    localStorage.setItem("highscore" ,JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore)
    highScoreBox.innerHTML="Hightest Score:" +highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }  //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;

            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})