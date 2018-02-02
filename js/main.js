var Roulette = Roulette || {};

Roulette.game = new Phaser.Game(700, 750, Phaser.AUTO);

Roulette.game.state.add('Boot', Roulette.BootState); 
Roulette.game.state.add('Preload', Roulette.PreloadState); 
Roulette.game.state.add('Game', Roulette.GameState);
Roulette.game.state.add('Prize', Roulette.PrizeState);

Roulette.game.state.start('Boot'); 