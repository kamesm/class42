class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage(car1image);
    car2 = createSprite(300,200);
    car2.addImage(car2image);
    car3 = createSprite(500,200);
    car3.addImage(car3image);
    car4 = createSprite(700,200);
    car4.addImage(car4image);
    cars = [car1, car2, car3, car4];

    pastFinished = false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();

    if(allPlayers !== undefined){
      //var display_position = 100;
            //background(rgb(198,135,103));
            image(trackImage, 0, -(displayHeight*4), displayWidth, displayHeight*5);

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 + (index*200) + allPlayers[plr].xPos;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        textSize(15);
        textAlign(CENTER);
        text(allPlayers[plr].name, cars[index-1].x, cars[index-1].y + 75);

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    //if(keyIsDown(UP_ARROW) && player.index !== null){
      //player.distance +=10;
      //player.update();
      //console.log(player.distance);
    //}

    if(player.distance < 3640){
      if(keyIsDown(38) && player.index !== null){
        yvel = yvel + 0.9;
        if(keyIsDown(37)){
          xvel = xvel - 0.2;
        }
        if(keyIsDown(39)){
          xvel = xvel + 0.2;
        }
      }
      else if(keyIsDown(38) && yvel > 0 && player.index !== null){
        yvel = yvel - 0.1;
        xvel = xvel * 0.9;
      }
      else{
        yvel = yvel * 0.9;
        xvel = xvel * 0.9;
      }
    }
    else if(pastFinished === false){
        yvel *= 0.7;
        xvel *= 0.7;
        Player.updateFinishedPlayers();
        player.place = finishedPlayers;
        player.update();
        pastFinished = true;
    }
    else{
      yvel *= 0.8;
      xvel *= 0.8;

    }

    player.xPos = player.xPos + xvel;
    xvel = xvel * 0.9;

    player.distance  += yvel;
    yvel = yvel * 0.9;
    
    player.update();

    //if(player.distance > 3640){
      //gameState = 2;
    //}
    drawSprites();
  }

  displayRanks(){
    camera.position.y = 0;
    camera.position.x = 0;
    imageMode(CENTER);
    Player.getPlayerInfo();
    image(goldImage,0,-100,250,300);
    image(silverImage,displayWidth/4,-100 + displayHeight/10,225,270);
    image(bronzeImage,displayWidth/-4,-100 + displayHeight/10,200,240);
  }
}
