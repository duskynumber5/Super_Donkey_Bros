class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 725)

        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x282d2f).setOrigin(0, 0)
        
        let highScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '35px', 
            //backgroundColor: '#F3B141',
            color: '#ffb59e',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        let pScoreConfig = {
            fontFamily: 'Courier',
            fontSize: '35px', 
            //backgroundColor: '#F3B141',
            color: '#58ffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        let numbersConfig = {
            fontFamily: 'Courier',
            fontSize: '40px', 
            //backgroundColor: '#F3B141',
            color: '#e6ff99',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        // add high score (text red (text: 0xffb59e outline: 0xa80203) -- number green (text: 0xe6ff99 outline: 0x038500))
        this.highScore = 0
        this.scoreLeft = this.add.text(60, 50, 'HIGH SCORE', highScoreConfig)
        this.scoreLeft.setStroke('#a80203', 10)
        this.score2Left = this.add.text(30, 100, 'number', numbersConfig)
        this.score2Left.setStroke('#038500', 10)
        
        // add player score w/ chosen name (text blue (text: 0x58ffff outline: 0x049da2) -- number green (text: 0xe6ff99 outline: 0x038500))
        this.pScore = 0
        this.scoreLeft = this.add.text(600, 50, 'NAME', pScoreConfig)
        this.scoreLeft.setStroke('#049da2', 10)
        this.score2Left = this.add.text(550, 100, 'number', numbersConfig)
        this.score2Left.setStroke('#038500', 10)
        
        // add borders (yellow (0xffffd6 outline: 0xb7b713))
        let graphics = this.add.graphics()

        // set fill color
        graphics.fillStyle(0xb7b713, 1) // light yellow fill
        
        // det stroke color 
        graphics.lineStyle(3, 0xffffd6, 1) // dark yellow outline
        
        let dash_length = 20
        let gap_length = 10
        let x1 = 50
        let y1 = 200
        let x2 = 50
        let y2 = 740
        
        while (x1 < 750 && x2 < 750) {
            graphics.fillStyle(0xffffd6, 1);  // light yellow fill
            graphics.lineStyle(3, 0xb7b713, 1); // darker stroke

            graphics.fillRect(x1, y1, dash_length, 6); // fill each dash
            graphics.strokeRect(x1, y1, dash_length, 6); // apply stroke to each dash

            x1 += dash_length + gap_length; // move to next dash position

            graphics.fillRect(x2, y2, dash_length, 6); // fill each dash
            graphics.strokeRect(x2, y2, dash_length, 6); // apply stroke to each dash

            x2 += dash_length + gap_length; // move to next dash position
        }

        this.add.rectangle(387, 220, 10, 505, 0xb7b713).setOrigin(0, 0)
        this.add.rectangle(390, 225, 4, 495, 0xffffd6).setOrigin(0, 0)
        
        // create animations
        this.anims.create({
            key: 'donkeyUp',
            frames: this.anims.generateFrameNumbers('donkey', { start: 0, end: 3, first: 0}),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: 'donkeyDown',
            frames: this.anims.generateFrameNumbers('donkey', { start: 0, end: 3, first: 0}).reverse(),
            frameRate: 10,
            repeat: -1,
        })

        // add donkeys
        this.donkeyRight = new Donkey(this, 580, game.config.height / 1.5, 'donkey').setOrigin(0, 0)
        this.donkeyRight.body.setSize(130, 115).setOffset(50, 40)
        //this.donkeyRight.anims.play('donkeyDown')

        this.donkeyLeft = new Donkey(this, 20, game.config.height / 1.5, 'donkey').setFlipX(true).setOrigin(0, 0)
        this.donkeyLeft.body.setSize(130, 115).setOffset(21, 40)
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