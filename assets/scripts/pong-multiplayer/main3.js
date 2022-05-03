const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

const hardBtn = document.getElementById("hardBtn")

let scoreOne = 0;
let scoreTwo = 0;


//key movement
window.addEventListener("keypress", doKeyDown, false);

function doKeyDown(e){
  const key = e.key;
  if(key == "w" && playerOne.y - playerOne.gravity > 0){
    playerOne.y -= playerOne.gravity * 4;
  }
  else if ( key == "s" && playerOne.y + playerOne.height + playerOne.gravity < canvas.height){
    playerOne.y += playerOne.gravity * 4;
  }

  if(key == "i" && playerTwo.y - playerTwo.gravity > 0){
  playerTwo.y -= playerTwo.gravity * 4;
  }

  else if ( key == "k" && playerTwo.y + playerTwo.height + playerTwo.gravity < canvas.height){
  playerTwo.y += playerTwo.gravity * 4;
  }


}

class Element {
  constructor(options){
    this.x = options.x
    this.y = options.y
    this.width = options.width
    this.height = options.height
    this.color = options.color
    this.speed = options.speed || 2;
    this.gravity = options.gravity;
  }
}

//first paddle
const playerOne = new Element({
  x:10,
  y:200,
  width: 15,
  height: 80,
  color: "#fff",
  gravity: 2,
})

//second paddle

const playerTwo = new Element({
  x:625,
  y:200,
  width: 15,
  height: 80,
  color: "#fff",
  gravity: 2,
})

//ball

const ball = new Element({
  x:650/2,
  y:400/2,
  width: 15,
  height: 15,
  color: "#20C20E",
  speed: 1,
  gravity: 2
})

//player one score text

function displayScoreOne(){
  context.font = "35px Arial"
  context.fillStyle = "#fff"
  context.fillText(scoreOne, canvas.width/2 - 60, 50)
}

function displayScoreTwo(){
  context.font = "35px Arial"
  context.fillStyle = "#fff"
  context.fillText(scoreTwo, canvas.width/2 + 60, 50)
}

//player two score text


//draw elements
function drawElement(element){
  context.fillStyle = element.color;
  context.fillRect(element.x, element.y, element.width, element.height)
}
////drawElement(playerOne);

//make ball bounce
function ballBounce(){
  if(ball.y + ball.gravity <= 0 || ball.y + ball.gravity >= canvas.height){
    ball.gravity = ball.gravity * -1;
    ball.y += ball.gravity;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  ballWallCollision();
}

//detect paddle collision


//detect wall collison
function ballWallCollision(){
  if(
    ball.y + ball.gravity <= playerTwo.y + playerTwo.height &&
    ball.x + ball.width + ball.speed >= playerTwo.x &&
    ball.y + ball.gravity > playerTwo.y ||
    (ball.y + ball.gravity > playerOne.y &&
    ball.x + ball.speed <= playerOne.x + playerOne.width)
    ){
      ball.speed = ball.speed * -1;
    } else if (ball.x + ball.speed < playerOne.x + playerOne.width){
      console.log("linha 128", ball, playerOne)
      scoreTwo += 1;
      ball.speed = ball.speed * -1;
      ball.x = 100 + ball.speed;
      ball.y += ball.gravity
    } else if (ball.x + ball.speed > playerTwo.x + playerTwo.width){
      scoreOne += 1;
      ball.speed = ball.speed * -1;
      ball.x = 100 + ball.speed;
      ball.y += ball.gravity;
    }
  drawElements();
}

//draw elements

function drawElements(){
  context.clearRect(0,0, canvas.width, canvas.height)
  drawElement(playerOne);
  drawElement(playerTwo);
  drawElement(ball);
  displayScoreOne();
  displayScoreTwo();
}


function loop(){
  ballBounce();
  window.requestAnimationFrame(loop)
}
loop();




/*function drawNet(){
  for(let i=0; i < canvas.height; i+=15){
    drawRect(net.x, net.y + i, net.width, net.height, net.color )
  }

}

const net = {
  x: canvas.width/2 - 2/2,
  y: 0,
  width: 4,
  height: 650,
  color: "#ffff"
}*/


  /*if(ball.x + ball.speed <= 0 || ball.x + ball.speed + ball.width >= canvas.width){
    ball.y += ball.gravity
    ball.speed = ball.speed * -1
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }*/

  /*

    if (
    (
      (ball.y >= playerOne.y && ball.y >= playerOne.y + playerOne.height)
      && (ball.x === playerOne.x + playerOne.width)
      && ball.speed < 0) ||
    (ball.y >= playerTwo.y &&
    ball.y >= playerTwo.y + playerTwo.height &&
    ball.x + ball.width === playerTwo.x && ball.speed > 0)) {
    console.log("hit")
    ball.speed = ball.speed * -1;
  }
  */
