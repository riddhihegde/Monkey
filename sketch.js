var PLAY=0;
var END=1;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0,jungle,jungleImage,invisibleGround,game,overImage;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("pop.webp");
  overImage = loadImage("gameOver.png");
 
}



function setup() {
 createCanvas(600,400);
  
  jungle = createSprite(600,200,600,400);
  jungle.scale=2.5;
  jungle.addImage("sanika",jungleImage);
  jungle.x = jungle.width/2;
  jungle.velocityX = -4;
  
  monkey = createSprite(100,330,50,60);
  monkey.scale = 0.15;
  monkey.addAnimation("key",monkey_running);
  
  invisibleGround = createSprite(100,369,400,10);
  invisibleGround.visible = false;
  
  game = createSprite(200,200,20,10);
  game.addImage(overImage);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
  background("white");
  
   
  
  
  if(mousePressedOver(game)){
    reset();
    if (jungle.x<0){
   jungle.x=jungle.width/2;
  }
    game.visible=false; 
    
    
  }
  
  
   if(gameState === PLAY){
     game.visible=false;
     monkey.visible=true;
     
  if (jungle.x<0){
   jungle.x=jungle.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -10;
  }
  if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -13;
  }
  
  monkey.velocityY = monkey.velocityY + 0.5;
   }
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score=score+2;
  }
  
  if(gameState===END){
    //monkey.destroy(); 
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    game.visible=true;
    monkey.visible=true;
    survivalTime=0;
  }
  
  if(obstacleGroup.isTouching(monkey)){
      gameState = END;
     jungle.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround);
  
   obstacles();
  spawnBanana();
  
    drawSprites();
  
  
 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score, 300,50);
  
//stroke("black");
//textSize(20);
//fill("black");
//survivalTime=Math.ceil(frameCount/frameRate());
//text("Survival Time:"+ survivalTime, 100,50 ); 

 
  
  
  
}

function spawnBanana() {
  if (frameCount % 60 === 0) {
     banana = createSprite(600,400,40,10);
     banana.addImage(bananaImage);
     banana.y = Math.round(random(200,60))
     banana.scale = 0.1;
     banana.velocityX = -8;
     banana.lifetime = 200;
     banana.depth = monkey.depth
     monkey.depth = monkey.depth + 1;
     foodGroup.add(banana);
    }
}
function obstacles() {
  
  if (frameCount % 60 === 0) {
    obstacle = createSprite(400,330,10,40);
    obstacle.velocityX = -8;
   
    var ran = Math.round(random(1,1))
    switch(ran)
    {
      case 1: obstacle.addImage(obstacleImage); 
      break;
      case 2:  obstacle.addImage(obstacleImage);
      break;  
      case 3:  obstacle.addImage(obstacleImage);
      break; 
      case 4:  obstacle.addImage(obstacleImage);
      break;
      case 5:  obstacle.addImage(obstacleImage);
      break;  
      case 6:  obstacle.addImage(obstacleImage);
      break;  
      default:
      break;  
        
     }  
    obstacle.scale=0.20;
    obstacle.depth = monkey.depth
    monkey.depth = monkey.depth + 1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    
    }
}

function reset(){
  
  gameState=PLAY;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
   
  
 }


