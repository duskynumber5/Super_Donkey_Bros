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
        this.load.image('ball', './assets/ball.png')
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x7bd6e3).setOrigin(0, 0)

        // add basic title for now
        this.add.text(300, 400, 'Super Donkey Bros.')
        this.add.text(300, 500, 'press K to play')
        this.add.text(300, 600, 'press D for credits')

        // ideally add animated title!

        // bind keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        // high score
        if (game.carryover > 0) {
            game.highScore = game.carryover
        } else {
            game.highScore = 0
        }
        console.log(game.highScore)
    }

    update() {
        // if !background_music
            // play music
            // loop true
        
        // if user selects play
        if(Phaser.Input.Keyboard.JustDown(keyK)) {
            this.scene.start('nameSelectScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.scene.start('creditsScene')
        }
    }

}