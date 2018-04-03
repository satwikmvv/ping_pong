var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;

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
    setInterval(drawEverything, 1000/fps);
    
    canvas.addEventListener('mousemove', 
                           function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });
}

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
//    ballSpeedX = ballSpeedX + 1;
    if(ballX < 0) {
//        
        if(ballY>paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        }
        else {
            ballReset();
        }
    }
    if(ballX > canvas.width -  10) {
        ballSpeedX = -ballSpeedX;
    }
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if(ballY > canvas.height -  10) {
        ballSpeedY = -ballSpeedY;
    }

}

function drawEverything() {
    moveEverything();
    
//    canvas
    colorRect(0,0,canvas.width,canvas.height,'black'); 
    
//    left player
    colorRect(0,paddle1Y,10,PADDLE_HEIGHT,'blue');
    
//    computer player
    colorRect(canvas.width-10,paddle2Y,10,PADDLE_HEIGHT,'red');
    
//    ball
    colorCircle(ballX,ballY,10,'white');
    
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