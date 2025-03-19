class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load everything :D
        this.load.spritesheet('donkey', './assets/donkey.png', {
            frameWidth: 160,
            frameHeight: 130,
            startFrame: 0,
            endFrame: 3,
        })
        this.load.spritesheet('animated_title', './assets/animated_title.png', {
            frameWidth: 800,
            frameHeight: 800,
            startFrame: 0,
            endFrame: 1,
        })
        this.load.image('ball', './assets/ball.png')
        this.load.audio('background', './assets/background.mp3')
        this.load.audio('select', './assets/select.wav')
        this.load.audio('jump', './assets/jump.wav')
        this.load.bitmapFont('arcadeR', 'assets/arcadeRED.png', 'assets/arcadeRED.xml')
        this.load.bitmapFont('arcadeG', 'assets/arcadeGREEN.png', 'assets/arcadeGREEN.xml')
        this.load.bitmapFont('arcadeB', 'assets/arcadeBLUE.png', 'assets/arcadeBLUE.xml')
    }

    create() {
        //this.add.rectangle(0, 0, game.config.width, game.config.height, 0x7bd6e3).setOrigin(0, 0)

        // add drawn title for now
        this.title = this.add.sprite(400, 400, 'animated_title')
        
        // animation
        this.anims.create({
            key: 'animated_title',
            frames: this.anims.generateFrameNumbers('animated_title', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1,
        })

        // play animation
        this.title.anims.play('animated_title')

        // bind keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        // high score
        if (game.carryover > 0) {
            game.highScore = game.carryover
        } else {
            game.highScore = 0
        }
        //console.log(game.highScore)
    }

    update() {
        this.background = this.sound.get('background')
        if(!this.background) {
                this.background = this.sound.add('background', {
                loop: true,
                volume: 0.5,
            })
            this.background.play()
        }
        
        // if user selects play
        if(Phaser.Input.Keyboard.JustDown(keyK)) {
            this.sound.play('select')
            this.scene.start('nameSelectScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.sound.play('select')
            this.scene.start('creditsScene')
        }
    }

}