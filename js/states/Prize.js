var Roulette = Roulette || {};

Roulette.PrizeState = {
    init: function ()
    {
        //console.log(Roulette.GameState.money);
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

            this.gift1 = this.add.button(0, 300, 'gift', function ()
            {
                this.text.destroy();
                this.text = this.add.text(150, 50, "Congratulations!\nHere's your prize.", this.style);
                this.gift1.destroy();
                this.gift2.destroy();
                this.gift3.destroy();
                this.emit();
            }, this);
            this.gift2 = this.add.button(240, 300, 'gift', function ()
            {
                this.text.destroy();
                this.text = this.add.text(150, 50, "Congratulations!\nHere's your prize.", this.style);
                this.gift1.destroy();
                this.gift2.destroy();
                this.gift3.destroy();
                this.emit();
            }, this);
            this.gift3 = this.add.button(480, 300, 'gift', function ()
            {
                this.text.destroy();
                this.text = this.add.text(150, 50, "Congratulations!\nHere's your prize.", this.style);
                this.gift1.destroy();
                this.gift2.destroy();
                this.gift3.destroy();
                this.emit();
            }, this);
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

        this.coupon();
    },
    coupon: function ()
    {
        this.coupon = this.add.sprite(this.world.centerX, this.world.centerY, 'coupon');
        this.coupon.anchor.set(0.5);
        this.world.bringToTop(emitter1);
        this.world.bringToTop(emitter2);
        this.world.bringToTop(emitter3);
    }
};