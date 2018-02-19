var Roulette = Roulette || {};

Roulette.game = new Phaser.Game(700, 750, Phaser.AUTO);

Roulette.game.state.add('Boot', Roulette.BootState); 
Roulette.game.state.add('Preload', Roulette.PreloadState); 
Roulette.game.state.add('Game', Roulette.GameState);
Roulette.game.state.add('Prize', Roulette.PrizeState);

Roulette.game.state.start('Boot'); 
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2016*/