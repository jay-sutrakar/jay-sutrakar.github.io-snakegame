var ctx = document.getElementById('ctx').getContext('2d');

var WIDTH = 500;
var HEIGHT = 500;

var snakeList , foodList ,  direction , eaten , intervalVar , score , running;

ctx.font = '20px calibre';
ctx.fillText('Click me to Start the Game ',140,250);
var snakeBody = {
    width : 20,
    height : 20,
    color : 'green'
};

var foodBody = {
    width : 20,
    height : 20,
    color : 'orange'
};

drawSnake = function(sb,i) {
    
    ctx.save();
    if(i===0) {
        ctx.fillStyle = 'black';
    } else {
        ctx.fillStyle = snakeBody.color;
    }
    ctx.fillRect(sb.x,sb.y,snakeBody.width,snakeBody.height);
    ctx.restore();
};

drawFood = function(fb,i) {
    ctx.save();
    ctx.fillStyle = foodBody.color;
    ctx.fillRect(fb.x,fb.y,foodBody.width,foodBody.height);
    ctx.restore();
};

document.onmousedown = function(evt) {
    if(running) {
        running = false;
        clearInterval(intervalVar);
    }
    startGame()
}

document.onkeydown = function(evt) {
    switch(evt.key){
        case 'ArrowLeft':
            if(direction != 2)
                direction = 0;
            break;
        case 'ArrowUp':
            if(direction != 3)
                direction = 1; 
            break;
        case 'ArrowRight':
            if(direction != 0)
                direction = 2;
            break;
        case 'ArrowDown':
            if(direction != 1)
                direction = 3;
            break;
    }
  //  console.log(direction)
}
updateSnakeList = function() {
    for(var i=snakeList.length-1; i>=0; i--) {
        if(direction === 0) {
            if( i === 0) {
                snakeList[i].x = snakeList[i].x - 5;
            }else {
                snakeList[i].x = snakeList[i-1].x;
                snakeList[i].y = snakeList[i-1].y;
            }
        } else if (direction === 1) {
            if( i=== 0) {
                snakeList[i].y = snakeList[i].y - 5;
            }else {
                snakeList[i].x = snakeList[i-1].x;
                snakeList[i].y = snakeList[i-1].y;
            }
        }else if(direction === 2) {
            if( i=== 0) {
                snakeList[i].x = snakeList[i].x + 5;
            }else {
                snakeList[i].x = snakeList[i-1].x;
                snakeList[i].y = snakeList[i-1].y;
            }    
        }else if (direction === 3) {
            if( i === 0) {
                snakeList[i].y = snakeList[i].y + 5;
            }else {
                snakeList[i].x = snakeList[i-1].x;
                snakeList[i].y = snakeList[i-1].y;
            }
        }
    }
}
testCollision = function(rect1,rect2 ) {
    return ((rect1.x <= rect2.x + foodBody.width) && (rect2.x <= rect1.x + snakeBody.width) && 
        (rect1.y <= rect2.y+foodBody.height) && (rect2.y <=rect1.y + snakeBody.height)) ;
}
testCollisionSnake = function(snake1 , snake2) {
    return ((Math.abs(snake1.x - snake2.x) < 5 ) && 
            (Math.abs(snake1.y - snake2.y) < 5 ))
}
checkSnakePosition = function() {
    if(snakeList[0].x < 0 ) {
        snakeList[0].x = 500;
    }
    if(snakeList[0].x > 500 ) {
        snakeList[0].x = 0;
    }
    if(snakeList[0].y < 0 ) {
        snakeList[0].y = 500;
    }
    if(snakeList[0].y > 500 ) {
        snakeList[0].y = 0;
    }
    
}
isGameOver = function () {
    for(var i = 1;i<snakeList.length;i++){
        if(testCollisionSnake(snakeList[0],snakeList[i])){
            clearInterval(intervalVar)
            ctx.fillText('Game Over' ,170,250);
            ctx.fillText('Click to restart the game ',130,280);
            
            return
            // console.log("collision")
        }
    }
}

updateSnakePosition = function () {
    ctx.clearRect(0,0,WIDTH,HEIGHT);
    while(eaten) {
        var x_pos = Math.random() * 485 + 5;
        var y_pos = Math.random() * 485 + 5;
        foodList[0] = {x:x_pos,y:y_pos};
        eaten = false;
    }
    foodList.forEach(drawFood);
    snakeList.forEach(drawSnake);

    if(testCollision(snakeList[0],foodList[0])) {
        foodList = [];
        eaten = true;
        score +=10;
        var new_x,new_y;
        if(direction == 0) {
            new_x = snakeList[0].x - 10;
            new_y = snakeList[0].y;
        }
        else if(direction == 1) {
            new_x = snakeList[0].x;
            new_y = snakeList[0].y - 10;
        }     
        else if(direction == 2) {
            new_x = snakeList[0].x + 10;
            new_y = snakeList[0].y;
        }     
        else if(direction == 3) {
            new_x = snakeList[0].x;
            new_y = snakeList[0].y + 10;
        }     
        snakeList.unshift({x:new_x,y:new_y}); 

    }
    ctx.fillText('Score: '+score,400,25);
    isGameOver()
    checkSnakePosition()
    updateSnakeList();
    
}

startGame = function() {   
    snakeList = [
        {x:220,y:200},
        {x:210,y:200},
        {x:200,y:200}
    ];
    foodList = [];
    direction = 2;
    eaten = true;
    score = 0;
    running = true;
   intervalVar = setInterval(updateSnakePosition,20);
}