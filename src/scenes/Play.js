class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 700)

        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x282d2f).setOrigin(0, 0)

        // add high score (text red (text: 0xffb59e outline: 0xa80203) -- number green (text: 0xe6ff99 outline: 0x038500))

        // add player score w/ chosen name (text blue (text: 0x58ffff outline: 0x049da2) -- number green (text: 0xe6ff99 outline: 0x038500))
        
        // add borders (yellow (0xffffd6 outline: 0xbab601))
        
        // create animations
        this.anims.create({
            key: 'donkeyUp',
            frames: this.anims.generateFrameNumbers('donkey', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'donkeyDown',
            frames: this.anims.generateFrameNumbers('donkey', { start: 0, end: 3}).reverse(),
            frameRate: 10,
            repeat: -1,
        })

        // add donkeys
        this.donkeyRight = new Donkey(this, 580, game.config.height / 1.5, 'donkey').setOrigin(0,0)
        this.donkeyRight.body.setSize(130, 110).setOffset(50, 40)
        //this.donkeyRight.anims.play('donkeyDown')

        this.donkeyLeft = new Donkey(this, 20, game.config.height / 1.5, 'donkey').setFlipX(true).setOrigin(0,0)
        this.donkeyLeft.body.setSize(130, 110).setOffset(20, 40)
        //this.donkeyLeft.anims.play('donkeyUp')

        // add ball (0xffb59e outline: 0xa80203)

        // bind keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

    }

    update() {
        // if player score > high score
            // update high score to match player score

        // ball movement
            // if ball off screen 
                // delete ball
                // game over
            // if donkey hit ball
                // reverse direction w/ random velocity
                // add 100? to score
        
        // look for user input
            // if yes call donkey update
            // play jump sound
            // play animation?
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.donkeyLeft.update()
        }
        if (Phaser.Input.Keyboard.JustDown(keyK)) {
            this.donkeyRight.update()
        }
        
    }

}