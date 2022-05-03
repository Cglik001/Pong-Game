const canvas = document.getElementById("pongGame");
const context = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 400;

const hardBtn = document.getElementById("hardBtn")
const normalBtn = document.getElementById("normalBtn")

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
// draw net
const net = {
  x: canvas.width/2,
  y: 0,
  width: 4,
  height: canvas.height,
  color: "#ffff",
}
//first paddle
const playerOne = new Element({
  x:10,
  y: 155,
  width: 15,
  height: 90,
  color: "#fff",
  gravity: 2,
})

//second paddle

const playerTwo = new Element({
  x:625,
  y:155,
  width: 15,
  height: 90,
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
  context.font = "40px Arial Bold"
  context.fillStyle = "#fff"
  context.fillText(scoreOne, canvas.width/2 - 60, 50)
}

//player two score text
function displayScoreTwo(){
  context.font = "40px Arial Bold"
  context.fillStyle = "#fff"
  context.fillText(scoreTwo, canvas.width/2 + 60, 50)
}




//draw elements
function drawElement(element){
  context.fillStyle = element.color;
  context.fillRect(element.x, element.y, element.width, element.height)
}
////drawElement(playerOne);

//make ball bounce
function ballBounce(){
  if(ball.y + ball.gravity <= 0 || ball.y + ball.gravity + ball.height >= canvas.height ){
    ball.gravity = ball.gravity * -1;
    ball.y += ball.gravity;
    ball.x += ball.speed;
  } else {
    ball.y += ball.gravity;
    ball.x += ball.speed;
  }
  paddleCollision();
  ballwallPoints();
}

//detect paddle collision

function paddleCollision(){
  //fazer a bolinha voltar quando bater no paddle
  if (
     (
      (
        ball.y > playerOne.y
        && ball.y <= playerOne.y + playerOne.height
        )
      && (ball.x === playerOne.x + playerOne.width && ball.speed < 0)) ||
      (
        (ball.y > playerTwo.y &&
         ball.y <= playerTwo.y + playerTwo.height)
          && (ball.x + ball.width === playerTwo.x && ball.speed > 0))) {
    console.log("hit")
    ball.speed = ball.speed * -1;
  }


  //
 /* if(
      (
        (
          ball.y <= playerTwo.y + playerTwo.height
          && ball.y > playerTwo.y
          )
        && (ball.x + ball.width === playerTwo.x && ball.speed > 0)
      )
      ||
      (
        (
          ball.y <= playerOne.y + playerOne.height
          && ball.y > playerOne.y
          )
        && (ball.x === playerOne.x + playerOne.width && ball.speed < 0)
      )
    ) {
      ball.speed = ball.speed * -1;
    } */
  //fazer o player 1 pontuar quando bater fora do paddle do player 2
  //fazer o player 2 pontuar quando bater fora do paddle do player 1
  drawElements();
}

function resetBallPosition() {
      ball.speed = ball.speed * -1;
     // ball.x = 100 + ball.speed;
     // ball.y += ball.gravity
      ball.x = (650/2) + ball.speed
      ball.y = (400/2) + ball.gravity

}

function resetGame() {
  let scoreOne = 0;
  let scoreTwo = 0;
  playerOne.y = 155;
  playerTwo.y = 155;
  resetBallPosition() ;
}

function enableButtons() {
  hardBtn.removeAttribute('disabled')
  normalBtn.removeAttribute('disabled')
}

function disableButtons() {
    hardBtn.setAttribute('disabled', true)
    normalBtn.setAttribute('disabled', true)
}


function ballwallPoints() {
  paddleCollision()
  if (ball.x < (playerOne.x - 10)){
      console.log("linha 128", ball, playerOne)
      scoreTwo += 1;
      resetBallPosition()
    }
  else if (ball.x > (playerTwo.x + (ball.width - 5))){
      scoreOne += 1;
      resetBallPosition()
    }



   drawElements();
}

//detect wall collison
/*function ballWallCollision(){
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
}*/

//draw elements

function drawElements(){
  context.clearRect(0,0, canvas.width, canvas.height)
  drawElement(playerOne);
  drawElement(playerTwo);
  drawElement(ball);
  displayScoreOne();
  displayScoreTwo();
  drawElement(net);
}

function hardGame(){
  ball.speed = 4;
  playerOne.gravity = 6;
  playerTwo.gravity = 6;
}

function normalGame() {
  ball.speed = 1;
  playerOne.gravity = 2;
  playerTwo.gravity = 2;
}

/*function gameWinner() {
  if(scoreOne === 10) {
      this.gameWinner = 'player One Wins!'
  } else if (scoreTwo === 10) {
       this.gameWinner = 'Player Two Wins!'
            }
        }

        return this.gameOver
    }

}*/



function loop(){
  ballBounce();
  paddleCollision();
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
