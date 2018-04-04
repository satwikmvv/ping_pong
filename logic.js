var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;

var player1Score = 0;
var player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 20;
const AI_DIFFICULTY = 2;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

window.onload =  function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var fps = 60;
    setInterval(function(){
                            moveEverything();
                            drawEverything();
                          }, 1000/fps);

    canvas.addEventListener('mousemove',
         function(evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });
}

// ball reset position after scoring
function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

// AI
function AI() {
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
        if (paddle2YCenter < ballY -35) {
          paddle2Y += AI_DIFFICULTY;
        }
        else  if (paddle2YCenter > ballY+35){
          paddle2Y -= AI_DIFFICULTY;
        }
}

function moveEverything() {
    AI();

    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // manual acceleration for ball if needed
//    ballSpeedX = ballSpeedX + 1;
    if(ballX < 0) {

        if(ballY>paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        }
        else {
            ballReset();
            player2Score ++;
        }
    }
    if(ballX > canvas.width) {

        if(ballY>paddle2Y && ballY<paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        }
        else {
            ballReset();
            player1Score ++;
        }
    }
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if(ballY > canvas.height -  10) {
        ballSpeedY = -ballSpeedY;
    }

}

function drawEverything() {

//    canvas
    colorRect(0,0,canvas.width,canvas.height,'black');

//    left player
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'blue');

//    computer player
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'red');

//    ball
    colorCircle(ballX,ballY,10,'white');

    canvasContext.fillText("You:" + player1Score,200,100);
    canvasContext.fillText("computer:" + player2Score,canvas.width - 200,100);

}

function colorCircle(centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}

function colorRect(leftX,topY,width,height,drawColor)  {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}
