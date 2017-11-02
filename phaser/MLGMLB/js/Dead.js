//DEADSTATE

State1.Dead = function(game)
{
	var endText;
	var restartText
	var deathMusic;
};

State1.Dead.prototype = {
	preload: function()
	{
		game.load.audio('deathTh', 'assets/audio/archon.mp3');
	},
	create: function()
	{
		this.game.stage.backgroundColor = "#051efa";
		deathMusic = game.add.audio('deathTh');
		deathMusic.play();
		endText = this.add.text(this.world.centerX-100, this.world.centerY, 'DEAD', {fill: '#ffffff'});
		restartText = this.add.text(this.world.centerX-200, this.world.centerY + 100, 'Click here to restart', {fill: '#fff'});
		restartText.inputEnabled = true;
		restartText.events.onInputDown.add(this.go,this);
	},
	go: function()
	{
		deathMusic.stop();
		this.state.start('MainState');
	}
};