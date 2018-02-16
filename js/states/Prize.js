var Roulette = Roulette || {};

Roulette.PrizeState = {
    init: function ()
    {
        if(Roulette.Round != 3)
        {
            this.time.events.add(Phaser.Timer.SECOND * 6, function()
            {
                this.state.start('Game');
            }, this);
        }
    },
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'finalScreen');

        this.style = {
            font: '40px Arial',
            align: 'center',
            fill: '#ffffff'
        };

        if (Roulette.GameState.money > 0)
        {
            this.text = this.add.text(40, 50, "You Win!\nYou got $" + Roulette.GameState.money + "\nCash in Your Chips for Your Prize!", this.style);
            this.emit();
        }
        else
        {
            this.text = this.add.text(50, 50, "You lost all your money.\nHere's your consolation prize.", this.style);
            this.emit();
        }
    },
    emit: function ()
    {
        emitter1 = this.add.emitter(this.world.centerX, 0, 250);
        emitter1.makeParticles('blackChip');

        emitter2 = this.add.emitter(this.world.centerX, 0, 250);
        emitter2.makeParticles('blueChip');

        emitter3 = this.add.emitter(this.world.centerX, 0, 250);
        emitter3.makeParticles('redChip');

        emitter4 = this.add.emitter(this.world.centerX, 0, 250);
        emitter4.makeParticles('greenChip');

        emitter5 = this.add.emitter(this.world.centerX, 0, 250);
        emitter5.makeParticles('whiteChip');

        emitter1.start(true, 5000, null, 40);
        emitter2.start(true, 5000, null, 40);
        emitter3.start(true, 5000, null, 40);
        emitter4.start(true, 5000, null, 40);
        emitter5.start(true, 5000, null, 40);

        this.coupon = this.add.sprite(this.world.centerX, this.world.centerY, 'coupon');
        this.coupon.anchor.set(0.5);
        this.world.bringToTop(emitter1);
        this.world.bringToTop(emitter2);
        this.world.bringToTop(emitter3);
    }
};