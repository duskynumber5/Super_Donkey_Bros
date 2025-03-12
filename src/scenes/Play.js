class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.physics.world.setBounds(0, 210, 800, 530)

        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x282d2f).setOrigin(0, 0)

        // game over flag
        this.gameOver = false
        
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
        if (game.highScore > 0) {   // if there is an existing high score use that one
            this.highScore = game.highScore
        }
        this.scoreLeft = this.add.text(60, 50, 'HIGH SCORE', highScoreConfig)
        this.scoreLeft.setStroke('#a80203', 10) // darker stroke
        this.score2Left = this.add.text(30, 100, this.highScore, numbersConfig)
        this.score2Left.setStroke('#038500', 10) // darker stroke

        // add player score w/ chosen name (text blue (text: 0x58ffff outline: 0x049da2) -- number green (text: 0xe6ff99 outline: 0x038500))
        this.pScore = 0
        this.scoreRight = this.add.text(600, 50, game.playerName.join(''), pScoreConfig)
        this.scoreRight.setStroke('#049da2', 10) // darker stroke
        this.score2Right = this.add.text(550, 100, this.pScore, numbersConfig)
        this.score2Right.setStroke('#038500', 10) // darker stroke
        
        // add borders (yellow (0xffffd6 outline: 0xb7b713))
        let bounds = this.add.graphics()

        // set fill color
        bounds.fillStyle(0xb7b713, 1) // light yellow fill
        
        // det stroke color 
        bounds.lineStyle(3, 0xffffd6, 1) // dark yellow outline
        
        // dash settings
        let dash_length = 20
        let gap_length = 10
        let x1 = 50
        let y1 = 200
        let x2 = 50
        let y2 = 740
        
        while (x1 < 750 && x2 < 750) {
            bounds.fillStyle(0xffffd6, 1)  // light yellow fill
            bounds.lineStyle(3, 0xb7b713, 1) // darker stroke

            bounds.fillRect(x1, y1, dash_length, 6) // fill each dash
            bounds.strokeRect(x1, y1, dash_length, 6) // apply stroke to each dash

            x1 += dash_length + gap_length; // move to next dash position

            bounds.fillRect(x2, y2, dash_length, 6) // fill each dash
            bounds.strokeRect(x2, y2, dash_length, 6) // apply stroke to each dash

            x2 += dash_length + gap_length // move to next dash position
        }

        // center dividers
        this.add.rectangle(399, 220, 10, 505, 0xb7b713).setOrigin(0, 0) // dark outline
        this.add.rectangle(402, 225, 4, 495, 0xffffd6).setOrigin(0, 0) // light fill
        
        // create animations
        this.anims.create({
            key: 'donkeyUp',
            frames: this.anims.generateFrameNumbers('donkey', { start: 0, end: 3, first: 0}),
            frameRate: 10,
        })
        this.anims.create({
            key: 'donkeyDown',
            frames: this.anims.generateFrameNumbers('donkey', { start: 3, end: 0, first: 0}),
            frameRate: 10,
        })

        // add donkeys
        this.donkeyRight = new Donkey(this, 625, game.config.height / 1.5, 'donkey').setFlipX(true).setOrigin(0, 0)
        this.physics.world.enable(this.donkeyRight)
        this.donkeyRight.body.setSize(30, 60).setOffset(35, 65)

        this.donkeyLeft = new Donkey(this, 30, game.config.height / 1.5, 'donkey').setOrigin(0, 0)
        this.physics.world.enable(this.donkeyLeft)
        this.donkeyLeft.body.setSize(30, 60).setOffset(95, 65)  

        // add ball (0xffb59e outline: 0xa80203)
        this.ball = new Ball(this, 378, 359, 'ball').setOrigin(0, 0)
        this.ball.body.setSize(8, 15).setOffset(22, 17)  
        this.ball.body.enable = false

        // bind keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        // collision physics
        this.physics.add.collider(this.ball, this.donkeyLeft, this.handleBounce, null, this)
        this.physics.add.collider(this.ball, this.donkeyRight, this.handleBounce, null, this) 

        // game start
        this.startText = this.add.text(255, 300, 'press K to start', game.redConfig).setStroke('#a80203', 10)
        this.gameStart = false // indicator

    }

    update() {
        if (!this.gameStart) {
            if (Phaser.Input.Keyboard.JustDown(keyK)) {
                this.ball.body.enable = true
                this.gameStart = true
                this.startText.destroy() // get rid of start text
            }
        }

        // if ball off screen delete ball && game over
        if (this.ball.x >= 750 || this.ball.x <= 0) { 
            this.ball.destroy()
            this.gameOver = true    
        }  

        if(this.gameOver) {
            this.add.text(255, 300, 'G A M E  O V E R', game.redConfig).setStroke('#a80203', 10)
            this.add.text(255, 450, 'press D for menu', game.redConfig).setStroke('#a80203', 10)
            this.add.text(240, 550, 'press K to restart', game.redConfig).setStroke('#a80203', 10)

            this.time.delayedCall(1000, () => {
                // back to menu
                if(Phaser.Input.Keyboard.JustDown(keyD)) {
                    game.carryover = this.highScore     // save high score
                    this.sound.play('select')
                    this.scene.start("menuScene")
                }
                if(Phaser.Input.Keyboard.JustDown(keyK)) {
                    game.highScore = this.highScore     // save high score
                    this.sound.play('select')
                    this.scene.restart()
                }
            })
        }

        // update high score
        if (this.highScore < this.pScore) {     // if player beats high score
            this.highScore = this.pScore        
            this.score2Left.text = this.highScore   // update text
        }  

        // if not game over play jump sound && make donkeys jump w/ key presses
        if (!this.gameOver && Phaser.Input.Keyboard.JustDown(keyD)) {  
            this.donkeyLeft.update()
        }
        if (!this.gameOver && Phaser.Input.Keyboard.JustDown(keyK)) {
            this.donkeyRight.update()
        }
        
    }

    handleBounce(ball, donkey) {
        // check if ball can change direction
        if (!ball.hitCooldown) { 
            this.sound.play('jump')
            // reverse X direction & maintain Y arc
            if (donkey == this.donkeyLeft) {
                this.ball.body.velocity.x = (Phaser.Math.Between(250, 400))     // x random velocity
                this.ball.body.velocity.y = (Phaser.Math.Between(-400, 400))     // y random velocity
            }
            else if (donkey == this.donkeyRight) {
                this.ball.body.velocity.x = (-Phaser.Math.Between(250, 400))    // x random velocity
                this.ball.body.velocity.y = (Phaser.Math.Between(-400, 400))    // y random velocity
            }
            
            // increase score & update score
            this.pScore += Phaser.Math.Between(100, 500)
            this.score2Right.text = this.pScore

            // animation
            donkey.anims.play('donkeyUp')
            donkey.anims.play('donkeyDown')
            
            // set cooldown flag
            ball.hitCooldown = true 
    
            // reset cooldown after 100ms to allow another bounce
            this.time.delayedCall(100, () => {
                ball.hitCooldown = false
            })
        }
    }
}