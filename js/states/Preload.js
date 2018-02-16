var Roulette = Roulette || {};

//loading the game assets
Roulette.PreloadState = {
  preload: function() {
    //show loading screen
    /*this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);*/

    //images
    this.load.image('wheel', 'assets/images/wheel.png');
    this.load.image('wheelGlow', 'assets/images/wheelGlow.png');
    this.load.image('wheelCentre', 'assets/images/wheelCenter.png');
    this.load.image('ball', 'assets/images/ball.png');
    this.load.image('spin', 'assets/images/spin.png');
    this.load.image('mark', 'assets/images/marker.png');
      
    this.load.image('blackChip', 'assets/images/chip-black.png');
    this.load.image('redChip', 'assets/images/chip-red.png');
    this.load.image('blueChip', 'assets/images/chip-blue.png');
    this.load.image('greenChip', 'assets/images/chip-green.png');
    this.load.image('whiteChip', 'assets/images/chip-white.png');
 
    this.load.image('black', 'assets/images/black.png');
    this.load.image('red', 'assets/images/red.png');
    this.load.image('even', 'assets/images/even.png');
    this.load.image('odd', 'assets/images/odd.png');
      
    this.load.image('getChip', 'assets/images/get_a_chip.png');
    this.load.image('placeBet', 'assets/images/place_a_bet.png');
    this.load.image('tooMuch', 'assets/images/tooMuch.png');
    this.load.image('win', 'assets/images/winner.png');
    this.load.image('lose', 'assets/images/lose.png');
      
    this.load.image('background', 'assets/images/background.png');
    this.load.image('instructions', 'assets/images/instructions.png');
    this.load.image('start', 'assets/images/startButton.png');
    this.load.image('blackout', 'assets/images/blackout.png');

    this.load.image('finalScreen', 'assets/images/game-page-background.jpg');
    this.load.image('gift', 'assets/images/Gift.png');
    this.load.image('coupon', 'assets/images/coupon.jpg');
      
    this.load.audio('clicker', ['assets/audio/clicker.m4a', 'assets/audio/clicker.mp3', 'assets/audio/clicker.ogg']);
    this.load.audio('throw', ['assets/audio/throw.m4a', 'assets/audio/throw.mp3', 'assets/audio/throw.ogg']);
    this.load.audio('chips', ['assets/audio/chips.m4a', 'assets/audio/chips.mp3', 'assets/audio/chips.ogg']);
    this.load.audio('background', ['assets/audio/background.m4a', 'assets/audio/background.mp3', 'assets/audio/background.ogg']);
    
    //Data
    //Contains boardTiles which are all the single digit tiles, each tile contains a value (the digit), a color (red/black), the asset, x and y values, the board row (1-3) in which it is, and a degree which is the offset from 0 on the wheel for rotations
    //Also contains boardButtons which are the outer board options, each contains an x and y value, an asset, an option for a bottom and top value if it is a range button (19-36), a color, a bets array which hold all the numerical values that this button is true for, and odds the value the bet is multiplied by
      //Odds are x5 for correct single number, x4 for 1/6 chances (1-12 black), x3 for 1/3 chances (row 1), x2 for 1/2 chances (black/red)
    //Also contains chips, each has an x and y value, an asset, and a value which is also the cost
    //Also contains win specs which house the amount of money one needs to reach to win the game
    this.load.text('rouletteData', 'assets/data/rouletteData.json');

  },
  create: function() {
    this.state.start('Game');
  }
};