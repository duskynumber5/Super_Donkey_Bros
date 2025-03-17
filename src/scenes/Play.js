class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.physics.world.setBounds(0, 210, 800, 530)

        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x282d2f).setOrigin(0, 0)

        // game over flag
        this.gameOver = false

        // add high score (text red (text: 0xffb59e outline: 0xa80203) -- number green (text: 0xe6ff99 outline: 0x038500))
        this.highScore = 0
        if (game.highScore > 0) {   // if there is an existing high score use that one
            this.highScore = game.highScore
        }
        this.scoreLeft = this.add.bitmapText(60, 50, 'arcadeR', 'HIGH SCORE', 35)
        this.score2Left = this.add.bitmapText(30, 100, 'arcadeG', this.highScore, 40)

        // add player score w/ chosen name (text blue (text: 0x58ffff outline: 0x049da2) -- number green (text: 0xe6ff99 outline: 0x038500))
        this.pScore = 0
        this.scoreRight = this.add.bitmapText(600, 50, 'arcadeB', game.playerName.join(''), 35)
        this.score2Right = this.add.bitmapText(550, 100, 'arcadeG', this.pScore, 40)
        
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
        this.donkeyRight.setPipeline('Light2D')

        this.donkeyLeft = new Donkey(this, 30, game.config.height / 1.5, 'donkey').setOrigin(0, 0)
        this.physics.world.enable(this.donkeyLeft)
        this.donkeyLeft.body.setSize(30, 60).setOffset(95, 65)  
        this.donkeyLeft.setPipeline('Light2D')

        // pipeline FX on to make barries make donkeys glow
        this.lights.enable()
        this.lights.addLight(50, 200, 1000).setColor(0xffb59e).setIntensity(2)
        this.lights.addLight(735, 200, 1000).setColor(0xffb59e).setIntensity(2)
        this.lights.addLight(50, 740, 1000).setColor(0xffb59e).setIntensity(2)
        this.lights.addLight(735, 740, 1000).setColor(0xffb59e).setIntensity(2)

        // add ball (0xffb59e outline: 0xa80203)
        this.ball = new Ball(this, 378, 359, 'ball').setOrigin(0, 0)
        this.ball.body.setSize(8, 15).setOffset(22, 17)  
        this.ball.body.enable = false

        // Create a particle emitter
        this.particles = this.add.particles('ball')

        this.emitter = this.add.particles(25, 25, 'ball', {
            speed: 50, 
            lifespan: 300,
            scale: { start: 0.5, end: 0 }, // Shrinks over time
            blendMode: 'ADD' // Glowing effect
        })

        // Attach the emitter to the ball
        this.emitter.startFollow(this.ball)

        // bind keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        // collision physics
        this.physics.add.collider(this.ball, this.donkeyLeft, this.handleBounce, null, this)
        this.physics.add.collider(this.ball, this.donkeyRight, this.handleBounce, null, this) 

        // game start
        this.startText = this.add.bitmapText(255, 300, 'arcadeR', 'press K to start', 30)
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
            this.add.bitmapText(225, 300, 'arcadeR', 'G A M E  O V E R', 30)
            this.add.bitmapText(245, 450, 'arcadeR', 'press D for menu', 30)
            this.add.bitmapText(230, 550, 'arcadeR', 'press K to restart', 30)

            this.time.delayedCall(500, () => {
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