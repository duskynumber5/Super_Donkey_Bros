class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 725)

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
        let graphics = this.add.graphics()

        // set fill color
        graphics.fillStyle(0xb7b713, 1) // light yellow fill
        
        // det stroke color 
        graphics.lineStyle(3, 0xffffd6, 1) // dark yellow outline
        
        // dash settings
        let dash_length = 20
        let gap_length = 10
        let x1 = 50
        let y1 = 200
        let x2 = 50
        let y2 = 740
        
        while (x1 < 750 && x2 < 750) {
            graphics.fillStyle(0xffffd6, 1)  // light yellow fill
            graphics.lineStyle(3, 0xb7b713, 1) // darker stroke

            graphics.fillRect(x1, y1, dash_length, 6) // fill each dash
            graphics.strokeRect(x1, y1, dash_length, 6) // apply stroke to each dash

            x1 += dash_length + gap_length; // move to next dash position

            graphics.fillRect(x2, y2, dash_length, 6) // fill each dash
            graphics.strokeRect(x2, y2, dash_length, 6) // apply stroke to each dash

            x2 += dash_length + gap_length // move to next dash position
        }

        // center dividers
        this.add.rectangle(387, 220, 10, 505, 0xb7b713).setOrigin(0, 0) // dark outline
        this.add.rectangle(390, 225, 4, 495, 0xffffd6).setOrigin(0, 0) // light fill
        
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
        this.donkeyRight.body.setSize(30, 80).setOffset(35, 35)

        this.donkeyLeft = new Donkey(this, 30, game.config.height / 1.5, 'donkey').setOrigin(0, 0)
        this.physics.world.enable(this.donkeyLeft)
        this.donkeyLeft.body.setSize(30, 80).setOffset(95, 35)

        // add ball (0xffb59e outline: 0xa80203)
        this.ball = new Ball(this, 390, 359, 'ball').setOrigin(0, 0)
        this.ball.body.setSize(8, 15).setOffset(22, 17)    

        // bind keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

    }

    update() {
        if(this.gameOver) {
            this.add.text(400, 400, 'game over :(')
            this.add.text(400, 500, 'press D for menu')
            this.add.text(400, 600, 'press K to restart')

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
        }

        // update high score
        if (this.highScore < this.pScore) {     // if player beats high score
            this.highScore = this.pScore        
            this.score2Left.text = this.highScore   // update text
        }

        // if ball off screen delete ball && game over
        if (this.ball.x > 750 || this.ball.x < 0) { 
            this.ball.destroy()
            this.gameOver = true    
        }  

        // collision physics
        this.physics.add.collider(this.ball, this.donkeyLeft)
        this.physics.add.collider(this.ball, this.donkeyRight)            

        // check for collisions and handle is true
        if(this.checkCollision(this.donkeyLeft.body, this.ball) && this.ball.x > 30) {
            this.handleBounce(this.ball, this.donkeyLeft) 
        }
        if(this.checkCollision(this.donkeyRight.body, this.ball) && this.ball.x < 625) {
            this.handleBounce(this.ball, this.donkeyRight)
        }
        
        // if not game over play jump sound && make donkeys jump w/ key presses
        if (!this.gameOver && Phaser.Input.Keyboard.JustDown(keyD)) {  
            this.sound.play('jump')
            this.donkeyLeft.update()
        }
        if (!this.gameOver && Phaser.Input.Keyboard.JustDown(keyK)) {
            this.sound.play('jump')
            this.donkeyRight.update()
        }
        
    }

    // check collisions
    checkCollision(donkey, ball) {
        // simple AABB checking
        if (donkey.x < ball.x + ball.width &&
            donkey.x + donkey.width > ball.x &&
            donkey.y < ball.y + ball.height &&
            donkey.height + donkey.y > ball.y) {
                return true
        } else {
            return false
        }
    }

    handleBounce(ball, donkey) {
        // check if ball can change direction
        if (!ball.hitCooldown) { 
            // reverse X direction & maintain Y arc
            if (donkey == this.donkeyLeft) {
                this.ball.body.velocity.x = (Phaser.Math.Between(250, 600))     // random velocity
            }
            else if (donkey == this.donkeyRight) {
                this.ball.body.velocity.x = (-Phaser.Math.Between(250, 600))    // random velocity
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