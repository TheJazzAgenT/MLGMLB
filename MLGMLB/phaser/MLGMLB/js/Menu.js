var State1 = {};

//code and file for the first menu state
State1.Menu = function(game){
	var text1;
	var text2;
};
//menu state prototype
State1.Menu.prototype = {

	create: function(){
		//Start text
		text1 = this.add.text(game.world.centerX-150, game.world.centerY, 'CLICK HERE TO START', {fill:'#ffffff'});
		text1.inputEnabled = true; //click on this text to start the game
		text1.events.onInputDown.add(this.MainState, this); //enable clicking on the text and state change
		
		
	},
	MainState: function(){//function for changing state over to the main play state
		this.state.start('MainState');
	}
};