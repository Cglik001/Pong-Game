const canvas = document.getElementById("pong-game-CPU");
const context = canvas.getContext("2d");

//create the user paddle

const user = {
  x: 0,
  y: canvas.height/2 - 100/2,
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0
}

const cpu = {
  x: canvas.width - 10,
  y: canvas.height/2 - 100/2,
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0
}

//create the ball

const ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "WHITE"
}

//draw rectangle function

function drawRect(x,y,w,h,color){
  context.fillStyle = color;
  context.fillRect(x,y,w,h);
}



//draw Circle

function drawCircle(x,y,r,color){
  context.fillStyle = color;
  context.beginPath();
  context.arc(x,y,r,0,Math.PI*2,true);
  context.closePath();
  context.fill();
}

//create the net
const net = {
  x: canvas.width/2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "WHITE"
}

//draw net
function drawNet(){
  for(let i = 0; i <= canvas.height; i+=15){
    drawRect(net.x, net.y + i, net.width, net.height, net.color)
  }
}


//draw Text

function drawText(text,x,y,color){
  context.fillStyle = color;
  context.font = "45px arial"
  context.fillText(text, x, y);
}


// render the game

function render(){
  // clear the canvas
  drawRect(0,0, canvas.width, canvas.height,"BLACK");
  //draw the net
  drawNet();

  //draw score
  drawText(user.score, canvas.width/4, canvas.height/5, "WHITE")
  drawText(cpu.score, 3*canvas.width/4, canvas.height/5, "WHITE")

  //draw the user and cpu paddles
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(cpu.x, cpu.y, cpu.width, cpu.height, cpu.color);

  //draw the circle
  drawCircle(ball.x, ball.y, ball.radius, ball.color)

}
//control the user paddle

canvas.addEventListener("mousemove", movePaddle)

function movePaddle(event){
  let rect = canvas.getBoundingClientRect();

  user.y = event.clientY - rect.top - user.height/2;

}


//collision detection
function collision(b,p){
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  return b.right > p.left && b.bottom > p.top && b.left < b.right &&
  b.top < p.bottom;
}

//reset ball

function resetBall(){
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.speed = 5;
  ball.velocityX = -ball.velocityX;
};

//update : position, move, score, ...

function update(){
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  //simple AI to control the CPU paddle

  let computerLevel = 0.1;
  cpu.y = (ball.y - (cpu.y + cpu.height/2)) * computerLevel;

  if(ball.y + ball.radius > canvas.height || ball.y - radius < 0){
    ball.velocityY = -ball.velocityY;
  }
  let player = (ball.x < canvas.width/2) ? user : cpu;

  if(collision(ball, player)){
    //where the ball hit the player paddle
    let collidePoint = ball.y - (player.y + player.height/2);

    //normalization
     collidePoint = collidePoint/(player.height/2);

     //calculate angle in radian
     let angleRad = collidePoint * (Math.PI/4);

     //X direction of the ball when it's hit
     let direction = (ball.x > canvas.width/2) ? 1 : -1;

     //change velocity x and y
     ball.velocityX = direction * ball.speed + Math.cos(angleRad);
     ball.velocityY = ball.speed + Math.sin(angleRad);

     //everytime the ball hit a paddle, we increase the speed
     ball.speed += 0.1;

     //update the score
     if(ball.x - ball.radius < 0){
       // the computer scores
       cpu.score++;
       resetBall()
     } else if (ball.x + ball.radius > canvas.width){
      // the user win
        user.score++;
        resetBall();
     }

  }


}

// game init
function game(){
  update();
  render();
}


const framePerSecond = 50;
setInterval(game, 1000/framePerSecond)
