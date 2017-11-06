State1.MainState = function(game){
	var text;
	var platforms; //places for player to jump
	var skyz; //sky background
	/*var trees; //tree details
	var tree1;
	var treeArr;*/
	var player;											//   new variables for player,
	var player_ship;								//	 opponent, and ships
	var movement;
	var opponent;										//
	var opponent_ship;							//
	var stars;// score givers
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
	//var deathMusic;
};

State1.MainState.prototype = {
	preload: function()
	{
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	//different types of trees
	/*game.load.image('tree','assets/spr_tree.png');
	game.load.image('treeE','assets/spr_treee.png');
	game.load.image('treeTwo','assets/spr_tree2.png');*/
	//music
	game.load.audio('mainTh','assets/audio/TitleTheme.mp3');
	//interactables
	game.load.spritesheet('mage','assets/player 1.png', 64, 64);						//player1
	game.load.spritesheet('opponent','assets/player 2.png', 64, 64);				//player2 or Ai
	game.load.spritesheet('ship1','assets/ship_1.png', 162, 224); 					//
	game.load.spritesheet('ship2','assets/ship_1.png', 162, 224);						// ships
	//game.load.spritesheet('flame','assets/spritesheets/flameball-32x32.png', 32, 32); //falling fireballs
	//game.load.spritesheet('bolt','assets/spritesheets/projectile.png', 13, 13);	//moving obstacle that kills you
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
		sky.scale.setTo(2,2);


		/*//yay background trees
		treeArr = [game.add.sprite(30, game.world.height - 330, 'tree')];
		treeArr[0].scale.setTo(4,4);
		var count2;
		var wid = -30;
		//loops to create different rows of trees for some measure of perspective
		for(var count = 1; count < 13; count++)
		{
			treeArr.push(game.add.sprite(count*95, game.world.height - 330, 'tree'));
			treeArr[count].scale.setTo(4,4);
			count2 = count +1;
		}
		while(count2 < 26)
		{
			treeArr.push(game.add.sprite(wid, game.world.height - 295, 'treeTwo'));
			treeArr[count2].scale.setTo(3.75,3.75);
			count2++;
			wid += 95;
		}*/
		// create a group of platforms using platforms var
		/*platforms = game.add.group();

		//give the platforms physics
		platforms.enableBody = true;

		//create the ground
		var ground = platforms.create(0, game.world.height - 64, 'ground');

		//scale the ground to work with game width
		ground.scale.setTo(3, 2);

		//make the ground non moving
		ground.body.immovable = true;*/

//																																								//
//																																								//
//								Adding the ships and the player sprites													//
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

//																														 //
// 			This keeps player 1 inside the bounds of the ship.		//
		game.physics.arcade.setBounds(player_ship.x, player_ship.y, player_ship.width , player_ship.height);

		//give the player some Physics
		game.physics.arcade.enable(player);

		player.body.collideWorldBounds = true;

		//create array to keep track of fireball sprites and initialize all the objects in the game world out of sight
		/*flames = [game.add.sprite(game.world.width-400, 0, 'flame')];
		game.physics.arcade.enable(flames[0]);
		flames[0].scale.setTo(3,3);
		flames[0].animations.add('down',[0,1,2,3], 10, true);*/

		//loop to create the objects
		/*var iter = 1;
		while (iter < 5)
		{
			flames.push(game.add.sprite(iter * 250, 0, 'flame'));
			flames[iter].scale.setTo(3,3);
			game.physics.arcade.enable(flames[iter]);
			//flames[iterater].scale.setTo(4,4);
			flames[iter].animations.add('down',[0,1,2,3], 10, true);
			iter++;
		}
		//creating left travelling killer bolt
		bolts = game.add.group();
		bolts.enableBody = true;
		game.physics.arcade.enable(bolts);
		bolt = bolts.game.add.sprite(game.world.width + 200,game.world.centerY/2, 'bolt');
		bolt.enableBody = true;
		game.physics.arcade.enable(bolt);
		bolt.scale.setTo(3,3);
		bolt.animations.add('left', [4,3,2,1,0], 10, true);
		*/
		//setup for score
		scoreText = game.add.text(16,16, 'Score: 0', {fontSize: '32px', fill: '#000'});
	},

	update : function()
	{
		//collision checks
		//var hitPlatform = game.physics.arcade.collide(player, platforms);
		//game.physics.arcade.overlap(player, bolt, this.bolted, null, this); //calls bolted() upon overlap. this kills player and changes state.
		//game.physics.arcade.overlap(player,flames, this.bolted, null, this);

		//whole buncha bounds checking to get overlap collision more reasonable for fireballs
		var boundsA = player.getBounds();
		boundsA.scale(.5,.5);
		/*var boundsB = flames[0].getBounds();
		var boundsC = flames[1].getBounds();
		var boundsD = flames[2].getBounds();
		var boundsE = flames[3].getBounds();
		var boundsF = flames[4].getBounds();*/
		/*if (Phaser.Rectangle.intersects(boundsA, boundsB) ||Phaser.Rectangle.intersects(boundsA, boundsC) || Phaser.Rectangle.intersects(boundsA, boundsD) || Phaser.Rectangle.intersects(boundsA, boundsE) || Phaser.Rectangle.intersects(boundsA, boundsF))
		{
				game.physics.arcade.overlap(player, flames, this.bolted, null, this);
				//this.bolted;
		}*/
				//end of collision checking

		var bool = true;
		//this if statement merely increases score over time unless bool is altered-- bool is mostly for testing
		if(bool)
		{
			scoreText.text = 'Score: ' + this.game.time.totalElapsedSeconds();
		}
		//player movement controls---arrow keys are used to move
		cursors = game.input.keyboard.createCursorKeys();

		//where the animations are managed
		//player.animations.play('right');
		//bolt.animations.play('left');
		var count = 0;
		/*while (count < flames.length) //initialize falling flame animations
		{
			flames[count].animations.play('down');
			count++;
		}*/
//																												//
//																												//
//									Heres how the player moves						//
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

		//difficulty modifier If/elseif/else branch
		/*count = 0;
		if (game.time.totalElapsedSeconds() < 15) //as seconds increase, everything begins moving faster
		{
			bolt.x -=2;
			count = 0;
			while (count< flames.length)
			{
				flames[count].y +=4;
				flames[count].x -=1;
				count++;
			}
			count = 0;
			/*while (count < treeArr.length)
			{
				treeArr[count].x -= 4;
				count++;
			}
		}
		else if (game.time.totalElapsedSeconds() > 14 && game.time.totalElapsedSeconds() < 25) //each else if is checking for a specific amt of time passed and increases speed of all things
		{
			bolt.x -= 4;
			count = 0;
			while (count< flames.length)
			{
				flames[count].y +=4;
				flames[count].x -=1;
				count++;
			}
			count = 0;
			/*while (count < treeArr.length)
			{
				treeArr[count].x -= 6;
				count++;
			}*/
		//}
		/*else if (game.time.totalElapsedSeconds() > 24 && game.time.totalElapsedSeconds() < 35)
		{
			bolt.x -= 8;
			count = 0;
			while (count< flames.length)
			{
				flames[count].y +=4;
				flames[count].x -=2;
				count++;
			}
			count = 0;*/
			/*while (count < treeArr.length)
			{
				treeArr[count].x -= 8;
				count++;
			}
		}
		else if (game.time.totalElapsedSeconds() > 34 && game.time.totalElapsedSeconds() < 50)
		{
			bolt.x -= 10;
			count = 0;
			while (count< flames.length)
			{
				flames[count].y +=5;
				flames[count].x -=3;
				count++;
			}
			count = 0;
			/*while (count < treeArr.length)
			{
				treeArr[count].x -= 10;
				count++;
			}
		}
		else
		{
			bolt.x -= 20
			count = 0;
			while (count< flames.length)
			{
				flames[count].y +=6;
				flames[count].x -=4;
				count++;
			}
			count = 0;
			/*while (count < treeArr.length)
			{
				treeArr[count].x -= 19;
				count++;
			}
		}*/
		//end of challenge modifiers
		//where world wrapping is specified for all items except player
		//game.world.wrap(bolt, 800, false);
		//count = 0;
		/*while (count < treeArr.length)
		{
			game.world.wrap(treeArr[count],120,false);
			count++;
		}*/
		//count = 0;
		/* while (count < flames.length)
		{
			game.world.wrap(flames[count], count*500);
			count++;
		} */

		/* var Rand = Math.random();// used to randomize location of bolt when it re-enters the screen
		if(bolt.x < -400)
		{
			//check for out of bounds
			if (Rand >= .5 && bolt.y >0)
			{
				bolt.y -= Rand*300;
			}
			else if (Rand < .5 && bolt.y < 1000)
			{
				bolt.y += Rand * 300;
			}
			else if (bolt.y < 0)
			{
				bolt.y += 500;
			}
			else
			{
				bolt.y -=500;
			}
		}
		else //used to adjust the flight path of the bolt while on screen
		{
			var current = bolt.x;
			if (Rand >= .5)
			{
				bolt.y -= 2;
			}
			else
			{
				bolt.y += 2;
			}
		} */
		/*Switch = true;
		if (player_ship.y <= 100)
		{
			Switch = false;
		}
		else if (player_ship.y >= 900)
		{
			Switch = true;
		}
		if(Switch)
		{
			player_ship.y -= 1;
			//game.physics.arcade.setBounds(player_ship.x, player_ship.y, player_ship.width , player_ship.height);
			
		}
		if(Switch == false)
		{
			player_ship.y += 1;
		}*/
		
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
