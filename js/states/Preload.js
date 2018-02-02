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
    this.load.image('table', 'assets/images/table.png');
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
      
    this.load.image('1', 'assets/images/1.png');
    this.load.image('2', 'assets/images/2.png');
    this.load.image('3', 'assets/images/3.png');
    this.load.image('4', 'assets/images/4.png');
    this.load.image('5', 'assets/images/5.png');
    this.load.image('6', 'assets/images/6.png');
    this.load.image('7', 'assets/images/7.png');
    this.load.image('8', 'assets/images/8.png');
    this.load.image('9', 'assets/images/9.png');
    this.load.image('10', 'assets/images/10.png');
    this.load.image('11', 'assets/images/11.png');
    this.load.image('12', 'assets/images/12.png');
    this.load.image('13', 'assets/images/13.png');
    this.load.image('14', 'assets/images/14.png');
    this.load.image('15', 'assets/images/15.png');
    this.load.image('16', 'assets/images/16.png');
    this.load.image('17', 'assets/images/17.png');
    this.load.image('18', 'assets/images/18.png');
    this.load.image('19', 'assets/images/19.png');
    this.load.image('20', 'assets/images/20.png');
    this.load.image('21', 'assets/images/21.png');
    this.load.image('22', 'assets/images/22.png');
    this.load.image('23', 'assets/images/23.png');
    this.load.image('24', 'assets/images/24.png');
    this.load.image('25', 'assets/images/25.png');
    this.load.image('26', 'assets/images/26.png');
    this.load.image('27', 'assets/images/27.png');
    this.load.image('28', 'assets/images/28.png');
    this.load.image('29', 'assets/images/29.png');
    this.load.image('30', 'assets/images/30.png');
    this.load.image('31', 'assets/images/31.png');
    this.load.image('32', 'assets/images/32.png');
    this.load.image('33', 'assets/images/33.png');
    this.load.image('34', 'assets/images/34.png');
    this.load.image('35', 'assets/images/35.png');
    this.load.image('36', 'assets/images/36.png');
      
    this.load.image('1-12b', 'assets/images/1-12b.png');
    this.load.image('1-12r', 'assets/images/1-12r.png');
    this.load.image('1-18', 'assets/images/1-18.png');
    this.load.image('13-24b', 'assets/images/13-24b.png');
    this.load.image('13-24r', 'assets/images/13-24r.png');
    this.load.image('19-36', 'assets/images/19-36.png');
    this.load.image('25-36b', 'assets/images/25-36b.png');
    this.load.image('25-36r', 'assets/images/25-36r.png');
      
    this.load.image('black', 'assets/images/black.png');
    this.load.image('red', 'assets/images/red.png');
    this.load.image('even', 'assets/images/even.png');
    this.load.image('odd', 'assets/images/odd.png');
      
    this.load.image('1st', 'assets/images/1st.png');
    this.load.image('2nd', 'assets/images/2nd.png');
    this.load.image('3rd', 'assets/images/3rd.png');
      
    this.load.image('header', 'assets/images/header.png');
      
    this.load.image('getChip', 'assets/images/get_a_chip.png');
    this.load.image('placeBet', 'assets/images/place_a_bet.png');
    this.load.image('tooMuch', 'assets/images/tooMuch.png');
    this.load.image('win', 'assets/images/winner.png');
    this.load.image('lose', 'assets/images/lose.png');
      
    this.load.image('background', 'assets/images/background.png');
    this.load.image('instructions', 'assets/images/instructions.png');
    this.load.image('start', 'assets/images/startButton.png');
    this.load.image('blackout', 'assets/images/blackout.png');
      
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