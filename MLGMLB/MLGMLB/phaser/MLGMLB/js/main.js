//Michael Harrold
//mharrold
//cmpm120
//ENDLESS RUNNER
// main points to menu which points to mainstate which points to dead state which points back to mainstate.
var game = new Phaser.Game(1000, 800, Phaser.AUTO);//, '', { preload: preload, create: create, update: update });
game.state.add('Menu', State1.Menu);
game.state.add('MainState', State1.MainState);
game.state.add('Dead', State1.Dead);
game.state.start('Menu');
