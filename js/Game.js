class Game {
  constructor(){}
  
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
        player.index = playerCount;
      }
      form1 = new Form()
      form1.display();
    }
  }

   play(){
    form1.hide();
    text("Game Start", 180, 100);
    Player.getPlayerInfo();
    //console.log(allPlayers);
    var displayPlayers = 120;
    if(allPlayers!== undefined){
    for(var i in allPlayers){
    text(allPlayers[i].name+":"+ allPlayers[i].distance, 100, displayPlayers);
    displayPlayers +=20;
    }
  }
  if(keyDown(UP_ARROW)){
    player.distance +=20;
    player.update();
  }
  }
}
