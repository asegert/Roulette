var Roulette = Roulette || {};

Roulette.BootState = {
  init: function() {
    //Begins audio
    this._manageAudio('init', this);
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
    //assets we'll use in the loading screen
    //this.load.image('bar', 'assets/images/preloader-bar.png');
  },
  create: function() {
    this.state.start('Preload');
  },
   _manageAudio: function(mode, game) 
    {
		if(mode == 'init') 
        {
			Roulette._audioStatus = true;
			Roulette._soundClick = game.add.audio('audio-click');
		}
		else if(mode == 'switch') 
        {
			Roulette._audioStatus = !Roulette._audioStatus;
		}
		if(Roulette._audioStatus) 
        {
			Roulette._audioOffset = 0;
		}
		else 
        {
			Roulette._audioOffset = 4;
		}
	}
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2016*/