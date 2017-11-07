State1.MainState = function(game){
	var text;
	var platforms; //places for player to jump
	var skyz; //sky background
	var player;	//new variables for player,
	var player_ship; //opponent, and ships
	var movement;
	var opponent;
	var opponent_ship;
	var stars;  // score givers
	var obstacles; //obstacles
	var score = 0; //score counter
	var scoreText; //score display
	var startGameText;
	var collectable; //extra points
	var mouse;
	var click = false;
	var bool = true;
	var timed;
	var bolts;
	var bolt;
	var flames; //array for falling flames
	var music;
  var bballs;
  var fireRate = 100;
  var nextFire = 0;
	//var deathMusic;
};

State1.MainState.prototype = {
	preload: function()
	{
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	//music
	game.load.audio('mainTh','assets/audio/TitleTheme.mp3');
	//interactables
	game.load.spritesheet('mage','assets/player 1.png', 64, 64);						//player1
	game.load.spritesheet('opponent','assets/player 2.png', 64, 64);				//player2 or Ai
	game.load.spritesheet('ship1','assets/ship_1.png', 162, 224); 					//
	game.load.spritesheet('ship2','assets/ship_1.png', 162, 224);						// ships
	game.load.image('bball','assets/projectile.png', 16, 16);					      // baseball
	},
	
	create: function()
	{
		// place your assets
		this.time.reset(); //reset time as that is how we track score as of this version

		//add music/sound files to game
		music = game.add.audio('mainTh');
		music.play('',0,1,true);

		//enable arcade physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//use sky.png as background
		//create group for sky
		skyz = game.add.group();
		var sky = skyz.create(0,0, 'sky');
		//set sky background to fit game screen
		sky.scale.setTo(2,2);																																							//
    // Adding the ships and the player sprites													//
		player_ship = game.add.sprite(game.world.width*.25-100, game.world.height - 500, 'ship1');
		player_ship.scale.setTo(1, 1.5);
		movement = 1;
		opponent_ship = game.add.sprite(game.world.width*.75-100, game.world.height - 500, 'ship2');
		opponent_ship.scale.setTo(1, 1.5);

		//add player to the game
		player = game.add.sprite(game.world.width*.25, game.world.height - 300, 'mage');
		//add opponent to the game
		opponent = game.add.sprite(game.world.width*.75, game.world.height - 300, 'opponent');

		game.world.setBounds(0,0, game.world.width, game.world.height);
    // This keeps player 1 inside the bounds of the ship.
		game.physics.arcade.setBounds(player_ship.x, player_ship.y, player_ship.width , player_ship.height);

		//give the player some Physics
		game.physics.arcade.enable(player);

		player.body.collideWorldBounds = true;
    
    //create a group of bullets
    bballs = game.add.group();
    bballs.enableBody = true;
    bballs.physicsBodyType = Phaser.Physics.ARCADE;
    bballs.createMultiple(50, 'bball');
    bballs.setAll('checkWorldBounds', true);
    bballs.setAll('outOfBoundsKill', true);
    
		//setup for score
		scoreText = game.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'});
	},

	update : function()
	{
    console.log('updating');
		//whole buncha bounds checking to get overlap collision more reasonable for fireballs
		var boundsA = player.getBounds();
		boundsA.scale(.5,.5);
		var bool = true;
		//this if statement merely increases score over time unless bool is altered-- bool is mostly for testing
		if(bool)
		{
			scoreText.text = 'Score: ' + this.game.time.totalElapsedSeconds();
		}
    // Hit baseball when click
    if (game.input.activePointer.isDown)
    {
        fire();
    }
		//player movement controls---arrow keys are used to move
		cursors = game.input.keyboard.createCursorKeys();
		var count = 0;
    // Heres how the player moves
		if(cursors.up.isDown)
		{
			player.body.velocity.y = -100;
		}

		else if(cursors.down.isDown)
		{
			player.body.velocity.y = +100;
		}
		else
		{
			player.body.velocity.y = 0;
		}
		if(cursors.right.isDown)
		{
			player.body.velocity.x = 100;
		}
		else if(cursors.left.isDown )
		{
			player.body.velocity.x = -100;
		}
		else
		{
			player.body.velocity.x = 0;
		}
		
		if (player_ship.y <= 0)
		{
			movement *= -1;
		}
		if (player_ship.y >= 600)
		{
			movement *= -1;
		}
		player.y += movement;
		player_ship.y += movement;
		game.physics.arcade.setBounds(player_ship.x, player_ship.y, player_ship.width , player_ship.height);
	},
  //fire a bullet
  fire: function() {
    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(sprite.x - 8, sprite.y - 8);
        game.physics.arcade.moveToPointer(bullet, 300);
    }
  },
	//changes state on impact with purple bolt or flames
	bolted : function()
	{
		//kill sprites. They will reload upon restart
		bolt.kill();
		music.stop();
		this.state.pause();
		this.state.start('Dead');
	}
};
