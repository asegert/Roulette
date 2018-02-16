//Sets up game
var Roulette = Roulette || {};

Roulette.GameState = {

    init: function ()
    {
        //Data from the JSON file
        this.allData = JSON.parse(this.game.cache.getText('rouletteData'));
        //Tracks number of spins
        this.spins = 0;
        //Holds the current chip being 'bet'
        this.chip = null;
        //Holds all 'bets' allowing multiple bets to be placed
        this.bets = [];
        //Holds all placed 'bets' so the chips can be removed from the board at the end of the round
        this.betChips = [];
        //Initial money used to place 'bets'
        this.money = 100;
        //Boolean to check if the wheel is spinning
        this.isSpinning = false;
        //Current seconds of game play
        //Used as an offset for the time the wheel spends spinning
        this.currSeconds = 0;
        //Boolean for if the ball has been 'thrown' onto the wheel
        this.ballThrown = false;
        //Boolean for if the ball has hit the wheel
        this.ballLocation = false;
        //Boolean for new round
        //Indicates wheel and adjoining elements need reset
        this.newRound = false;
    },
    create: function ()
    {
        //Create Sounds
        Roulette._clicker = this.add.audio('clicker');
        Roulette._throw = this.add.audio('throw');
        Roulette._chips = this.add.audio('chips');
        Roulette._background = this.add.audio('background');
        //Displays text to the player
        this.alerts = this.add.sprite(200, 450, null);
        //Sets color of the 'table'
        this.background = this.add.sprite(0, 0, "background");
        this.background.width = 700;
        this.background.height = 750;
        //Group of tiles for the 'betting' board
        this.boardTiles = this.add.group();
        //Group of chips that can be 'bet'
        this.chipTiles = this.add.group();
        //Creates 'betting' board
        this.tilizeBoard();
        //Creates chips to bet with
        this.addChips();
        //Initializes the wheel glow
        this.wheelGlow = this.add.sprite(205, 180, 'wheelGlow');
        this.wheelGlow.anchor.setTo(0.5);
        this.wheelGlow.alpha = 0;
        //Initializes the wheel - will be reinitialized each round to reset rotation
        this.createWheel();
        this.alerts.destroy();
        //Initializes the ball - will be reinitialized each round to reset throwing animation
        this.createBall();
        //Initializes the mark/tracker for the 'slot' the ball falls into - will be reinitialized each round to reset rotation
        this.setMark();
        //Initializes the chip cursor so an asset (the chip) can be attached to the cursor
        this.chipCursor = this.add.sprite(43, 43, null);
        //Text to tell the player how much money he has
        this.moneyText = this.add.text(204, 370, ("Your money: $" + this.money), { fill: '#fff' });
        this.moneyText.anchor.setTo(0.5, 0.5);
        //Starts instruction sequence
        this.instruct();
    },
    createWheel: function ()
    {
        //Creates texture for wheel
        this.wheel = this.add.sprite(204, 179, 'wheel');
        this.wheel.anchor.setTo(0.5, 0.5);
        this.wheel.inputEnabled = true;
        this.wheel.events.onInputDown.add(function ()
        {
            //Checks that a 'bet' has been placed before spinning
            if (this.bets.length === 0)
            {
                this.alerts.destroy();
                this.alerts = this.add.sprite(200, 450, 'placeBet');
            }
            else
            {
                //Add to spins
                this.spins++;
                //If it has input must not be allowed on the board or chips as all bets should be placed
                this.boardTiles.inputEnabled = false;
                this.chipTiles.inputEnabled = false;
                //Wheel spins and ball is thrown
                this.wheelSpin();
                this.isSpinning = true;
                this.ballThrown = true;
                //Updates seconds elapsed
                this.currSeconds = this.time.totalElapsedSeconds();
                //After 5 seconds the wheel should cease spinning
                this.time.events.add(Phaser.Timer.SECOND * 5, this.computeBets, this);
            }
        }, this);
        //Creates spinner (center of wheel)
        this.spinner = this.add.sprite(120, 96, 'wheelCentre');
        this.spinner.inputEnabled = true;
        //Allows same as wheel-this allows anywhere on the wheel to trigger a spin
        this.spinner.events.onInputDown.add(function ()
        {
            if (this.bets.length === 0)
            {
                this.alerts.destroy();
                this.alerts = this.add.sprite(200, 450, 'placeBet');
            }
            else
            {
                this.spins++;
                this.boardTiles.inputEnabled = false;
                this.chipTiles.inputEnabled = false;
                this.wheelSpin();
                this.isSpinning = true;
                this.ballThrown = true;
                this.currSeconds = this.time.totalElapsedSeconds();
                this.time.events.add(Phaser.Timer.SECOND * 5, this.computeBets, this);
            }
        }, this);
    },
    createBall: function ()
    {
        //Creates the ball texture
        this.ball = this.add.sprite(0, 90, 'ball');
        this.ball.scale.setTo(2, 2);
        //Sets a pivot so the ball can 'roll' around the spinner
        this.ball.pivot.y = 50;
        this.ball.anchor.set(0.5);
        //Throwing animation
        this.ballThrow = this.add.tween(this.ball);
        this.ballThrow.to({ x: 203, y: 180 }, 700, Phaser.Easing.BounceOut);
        this.ballThrowSize = this.add.tween(this.ball.scale);
        this.ballThrowSize.to({ x: 1, y: 1 }, 700, Phaser.Easing.Linear.None);
        //Once the ball is thrown it has landed on the wheel
        this.ballThrow.onComplete.addOnce(function ()
        {
            this.ballLocation = true;
        }, this);
    },
    instruct: function ()
    {
        Roulette._background.play('', 0, 1, true);
        //Disable input so game can't be played
        this.wheel.inputEnabled = false;
        this.spinner.inputEnabled = false;
        this.chipTiles.forEach(function (chip)
        {
            chip.inputEnabled = false;
        });
        this.boardTiles.forEach(function (board)
        {
            board.inputEnabled = false;
        });
        //'Blackout' the game screen
        this.blackout = this.add.sprite(0, 0, 'blackout');
        this.blackout.alpha = 0.7;
        this.blackout.width = 700;
        this.blackout.height = 750;
        //Display instructions
        this.instructions = this.add.sprite(30, 70, 'instructions');
        //Button to start game play
        this.start = this.add.button(430, 350, 'start');
        this.start.scale.setTo(0.5, 0.5);
        //When game play should start
        this.start.events.onInputDown.add(function ()
        {
            //Enable input for gameplay
            this.wheel.inputEnabled = true;
            this.spinner.inputEnabled = true;
            this.chipTiles.forEach(function (chip)
            {
                chip.inputEnabled = true;
            });
            this.boardTiles.forEach(function (board)
            {
                board.inputEnabled = true;
            });
            //Remove instruction elements that overlay the game
            this.blackout.destroy();
            this.instructions.destroy();
            this.start.destroy();
        }, this);
    },
    setMark: function ()
    {
        //Creates the mark/tracker for the 'slot' the ball will stop at
        this.mark = this.add.sprite(203, 180, null);
        this.mark.pivot.y = 90;
        this.mark.visible = true;
        this.mark.anchor.set(0.5);
    },
    tilizeBoard: function ()
    {
        //Creates the 'betting' board
        var tile = this.add.sprite(400, 300, 'black');
        //Gives tile it's data
        tile.data = this.allData.boardButtons[2];
        console.log(tile.data);
        //Adds to group
        this.boardTiles.add(tile);
        //If selected allow betting
        tile.inputEnabled = true;
        tile.events.onInputDown.add(function (tile)
        {
            this.bet(tile);
        }, this);
        
        var tile = this.add.sprite(400, 400, 'red');
        //Gives tile it's data
        tile.data = this.allData.boardButtons[0];
        console.log(tile.data);
        //Adds to group
        this.boardTiles.add(tile);
        //If selected allow betting
        tile.inputEnabled = true;
        tile.events.onInputDown.add(function (tile)
        {
            this.bet(tile);
        }, this);
        
        var tile = this.add.sprite(400, 500, 'even');
        //Gives tile it's data
        tile.data = this.allData.boardButtons[1];
        console.log(tile.data);
        //Adds to group
        this.boardTiles.add(tile);
        //If selected allow betting
        tile.inputEnabled = true;
        tile.events.onInputDown.add(function (tile)
        {
            this.bet(tile);
        }, this);
        
        var tile = this.add.sprite(400, 600, 'odd');
        //Gives tile it's data
        tile.data = this.allData.boardButtons[3];
        console.log(tile.data);
        //Adds to group
        this.boardTiles.add(tile);
        //If selected allow betting
        tile.inputEnabled = true;
        tile.events.onInputDown.add(function (tile)
        {
            this.bet(tile);
        }, this);
    },
    addChips: function ()
    {
        //Adds chips to the side
        for (var i = 0; i < this.allData.chips.length; i++)
        {
            var tile = new Phaser.Sprite(this.game, this.allData.chips[i].x, this.allData.chips[i].y, this.allData.chips[i].asset);
            //Give chip it's data  
            tile.data = this.allData.chips[i];
            //Add to group
            this.chipTiles.add(tile);
            //When selected call chip select
            tile.inputEnabled = true;
            tile.events.onInputDown.add(function (tile)
            {
                this.chipSelect(tile);
            }, this);

            //Create text for the chip with it's cost/value
            this.add.text(this.allData.chips[i].x + 90, this.allData.chips[i].y, this.allData.chips[i].value, { fill: '#fff' });
        }
    },
    chipSelect: function (chip)
    {
        //If a new round has started reinitialize the wheel, ball, and mark
        if (this.newRound)
        {
            this.alerts.destroy();
            this.wheel.destroy();
            this.createWheel();
            this.ball.destroy();
            this.createBall();
            this.mark.destroy();
            this.setMark();
            this.newRound = false;
        }
        //If there is not enough available money to use the chip alert the player
        if ((this.money - chip.data.value) < 0)
        {
            this.alerts.destroy();
            this.alerts = this.add.sprite(200, 450, 'tooMuch');
        }
        else
        {
            Roulette._chips.play();
            this.alerts.destroy();
            //Set the chip to the selected chip
            this.chip = chip.data;
            //Adjust the money value
            this.money -= this.chip.value;
            //Remove the previous money display
            this.moneyText.kill();
            //Show new value
            this.moneyText = this.add.text(204, 370, ("Your money: $" + this.money), { fill: '#fff' });
            this.moneyText.anchor.setTo(0.5, 0.5);
            //Dim the chips since one is already in play
            this.chipTiles.alpha = 0.5;
            //Attach the chip asset to the cursor
            this.chipCursor = this.add.sprite(43, 43, this.chip.asset);
            //Adjust the size
            this.chipCursor.scale.setTo(0.5);
            //Add the chip to the list of chips being bet
            this.betChips[this.betChips.length] = this.chipCursor;
        }
    },
    bet: function (tile)
    {
        //If the game is not played on desktop manually update the chip
        if (!this.input.activePointer.isMouse)
        {
            if (this.betChips[this.betChips.length - 1] != undefined)
            {
                this.betChips[this.betChips.length - 1].position.x = tile.data.x;
                this.betChips[this.betChips.length - 1].position.y = tile.data.y;
            }
        }
        //'Drop' the chip being 'bet'
        this.chipCursor = this.add.sprite(43, 43, null);
        //Un-dim the chips
        this.chipTiles.alpha = 1;
        //If a bet is being placed without a chip alert the player
        if (this.chip === null)
        {
            this.alerts.destroy();
            this.alerts = this.add.sprite(200, 450, 'getChip');
        }
        else
        {
            Roulette._chips.play();
            //Add the varying bet values
            //Single numbers
            if (tile.data.bets === undefined)
            {
                this.bets[this.bets.length] = [[tile.data.value], this.chip.value, 5];
            }
            //Header (0)
            else if (tile.data.bets === null)
            {
                this.bets[this.bets.length] = [[tile.data.value], this.chip.value, 5];
            }
            //Side options
            else
            {
                this.bets[this.bets.length] = [tile.data.bets, this.chip.value, tile.data.odds];
            }
            //Animation to make the wheel glow
            this.wheelTween = this.add.tween(this.wheelGlow).to({ alpha: 1 }, 150, "Linear", true, 0, -1);
            this.wheelTween.yoyo(true, 150);
            this.time.events.add(Phaser.Timer.SECOND * 2.1, function ()
            {
                this.wheelTween.stop();
                this.wheelGlow.alpha = 0;
            }, this);
        }
        //Resets the chip
        this.chip = null;
    },
    wheelSpin: function ()
    {
        if (!this.isSpinning)
        {
            Roulette._clicker.play();
            //Calculates random 'ball' to choose
            var num = Math.floor(Math.random() * 36);
            //Stores data of the selection
            this.ballSelected = this.allData.boardTiles[num];
            //Sets the rotation of the mark and the ball with the offset for the selected 'ball'
            //Offset is the offset from 0
            this.mark.rotation = this.mark.rotation + this.ballSelected.degree;
            this.ball.rotation = this.mark.rotation;
        }
    },
    computeBets: function ()
    {
        //Ensure the wheel is not spinning
        this.isSpinning = false;
        //Checks if any bets placed correspond to the number of the selection
        for (var i = 0; i < this.bets.length; i++)
        {
            for (var j = 0; j < this.bets[i][0].length; j++)
            {
                if (this.ballSelected.value === (this.bets[i][0][j] + 1))
                {
                    //Add to the money: value of chip used to bet * odds
                    this.money += (this.bets[i][1] * this.bets[i][2]);
                }
            }
        }
        //Reset money to display the new value
        this.moneyText.kill();
        this.moneyText = this.add.text(204, 370, ("Your money: $" + this.money), { fill: '#fff' });
        this.moneyText.anchor.setTo(0.5, 0.5);

        //Remove all previously bet chips from the board
        this.betChips.forEach(function (chip)
        {
            chip.destroy();
        });
        //Allow input again
        this.boardTiles.inputEnabled = true;
        this.chipTiles.inputEnabled = true;
        //Clear bets for next round
        this.bets = [];
        //Indicate a new round has begun so elements can be reset
        this.newRound = true;
    },
    update: function ()
    {
        if (this.game.device.desktop)
        {
            //Keeps track of the cursor's position so the chip can update
            this.chipCursor.position.set(this.input.activePointer.worldX - 10, this.input.activePointer.worldY - 10);
        }
        else
        {
            //Keeps track of the cursor's position so the chip can update - mobile
            this.chipCursor.position.set(this.input.pointer1.worldX - 10, this.input.pointer1.worldY - 10);
        }
        //Keep the cursor image above all other assets
        this.world.bringToTop(this.chipCursor);

        //If the wheel is spinning
        if (this.isSpinning)
        {
            //Calculate rotations
            //Negative = counter clockwise
            //0.07 - (totaltTimeGone-secondsBeforeWheelSpin (1-5)/100)
            this.wheel.rotation -= (0.07 - ((this.time.totalElapsedSeconds() - this.currSeconds) / 100));
            this.mark.rotation -= (0.07 - ((this.time.totalElapsedSeconds() - this.currSeconds) / 100));
            //4.4735 is used as the ball rotation is also effected by the wider pivot that decends the ball as it spins, this offsets it so it can meet up with the marker
            this.ball.rotation -= ((4.4735 / this.ball.pivot.y) - ((this.time.totalElapsedSeconds() - this.currSeconds) / 100));
            //When the ball pivot is close to 80-the mark's pivot make it equal to the mark
            if (this.ball.pivot.y < 81.1 && this.ball.pivot.y > 79.9)
            {
                this.ball.pivot.y = 80;
                this.ball.rotation = this.mark.rotation;
            }
            //If the ball is not close to the mark update the pivot point
            else
            {
                this.ball.pivot.y += 0.101;
            }
        }
        //If the ball is ready to be thrown
        if (this.ballThrown)
        {
            //Start the throwing animation
            this.ballThrow.start();
            //Adjust the ball size when thrown
            this.ballThrowSize.start();
            Roulette._throw.play();
            //Ball no longer needs thrown
            this.ballThrown = false;
        }
        //Checks that the wheel has stopped spinning and the pivot has not finished (0) or started (50) yet
        if (!this.isSpinning && this.ball.pivot.y != 50 && this.ball.pivot.y != 0)
        {
            //Sets the pivot to be 0 as ball has stopped
            //Serves as indication of ball stopping and prevents it from continuing to rotate when 'rolling' into the 'slot'
            this.ball.pivot.y = 0;
            //Stop the rotation
            this.ball.rotation = 0;
            //Make the ball invisible
            this.ball.visible = false;
            //Recreate the ball
            //MUST be done to reset the ball's position as position is not updated with the rotation therefore any movement begins from the original 'landing' location
            this.ball = this.add.sprite(this.ball.worldPosition.x, this.ball.worldPosition.y, 'ball');
            this.ball.anchor.set(0.5);
            //Animation for the ball to 'roll' into the 'slot'
            this.ballFall = this.add.tween(this.ball);
            this.ballFall.to({ x: this.mark.worldPosition.x, y: (this.mark.worldPosition.y) }, 700, Phaser.Easing.BounceOut);
            this.ballFall.start();
        }
        //Goes through all chips if there is not enough money to select it it is dimmed
        this.chipTiles.forEach(function (chip)
        {
            if (Roulette.GameState.money < chip.data.value)
            {
                chip.alpha = 0.5;
            }
            else
            {
                chip.alpha = 1;
            }
        });
        //If enough spins has occured
        if (this.spins >= 3 && !this.isSpinning)
        {
            this.alerts.destroy();
            this.alerts = this.add.sprite(200, 450, 'win');
            this.state.start('Prize');
            
        }
        //If there is no money and a new round has begun, in other words there is no money, but bets are placed that could give money, then the player loses
        else if (this.money == 0 && this.newRound)
        {
            this.alerts.destroy();
            this.alerts = this.add.sprite(200, 450, 'lose');
            this.state.start('Prize');
        }
    }
};