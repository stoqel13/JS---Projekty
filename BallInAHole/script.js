let ball   = document.querySelector('.ball');
let wall   = document.querySelector('.wall');
let area = document.querySelector('.area');
let output = document.querySelector('.output');
let tpIn = document.getElementById("tpInTrigger");
let finish = document.getElementById("finishTrigger");
let beta;
let gamma;
let stopTheBall=false;
let finishCount=0;
let startFunctionChangeBallPosition=true;
let startingTime = Date.now();
let finishTime="-";
let ballTopPosition=350;
let ballLeftPosition=40;

function handleOrientation(event) {
    beta = event.beta;
    gamma = event.gamma;
  if(startFunctionChangeBallPosition){
      startFunctionChangeBallPosition=false;
      changeBallPositon();
  }
  
}

function changeBallPositon(){
    setTimeout(function(){
        if(beta<-0.1){
            ballTopPosition-=(0.5*(beta*(-1)));
            if(ballTopPosition<0)ballTopPosition=0;
        }

        if(beta>0.1){
            ballTopPosition+=(0.5*beta);
            if(ballTopPosition>380)ballTopPosition=380;
        }

        if(gamma<-0.1){
            ballLeftPosition-=(0.5*(gamma*(-1)));
            if(ballLeftPosition<0)ballLeftPosition=0;
        }

        if(gamma>0.1){
            ballLeftPosition+=(0.5*gamma);
            if(ballLeftPosition>380)ballLeftPosition=380;
        }
        ball.style.top  = ballTopPosition + "px";
        ball.style.left  = ballLeftPosition + "px";
        checkCollisions();
        document.getElementById("timer").innerHTML="Timer: "+((Date.now()-startingTime)/1000).toFixed(2)+" sec\nBest time: "+finishTime;
        if(stopTheBall)return;
        changeBallPositon();
    },10)  
}



let walls = document.querySelectorAll('.wall');
function checkCollisions(){
    for(i=0;i<walls.length;i++){
        if(isCollision(ball, walls[i])) stopTheBall=true;
    }

    if(isCollision(ball,tpIn)){
        ballLeftPosition=340;
        ballTopPosition=25;
    }

    if(isCollision(ball, finish)){
        stopTheBall=true;
        finishCount++;
        if(finishCount==1)
        finishTime=((Date.now()-startingTime)/1000).toFixed(2);
        else{
          if(((Date.now()-startingTime)/1000)<finishTime) finishTime=((Date.now()-startingTime)/1000).toFixed(2);
        }
    }
}

function isCollision(obj1, obj2){
    let object_1 = obj1.getBoundingClientRect();
    let object_2 = obj2.getBoundingClientRect();
    if (object_1.left < object_2.left + object_2.width  && object_1.left + object_1.width  > object_2.left &&
        object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top)
        return true;
        else return false;
}

function restart(){
    ballLeftPosition=40;
    ballTopPosition=350;
    changeBallPositon();
    startFunctionChangeBallPosition=true;
    stopTheBall=false;
    startingTime = Date.now();
}


window.addEventListener('deviceorientation', handleOrientation);  //starts when device orientation changes