class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load everything :D
        this.load.spritesheet('donkey', './assets/donkey.png', {
            frameWidth: 200,
            frameHeight: 200,
            startFrame: 0,
            endFrame: 3,
        })
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x7fe3ea).setOrigin(0, 0)

        // add basic title for now

        // ideally add animated title!

        // bind keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
    }

    update() {
        // if !background_music
            // play music
            // loop true
        
        // if user selects play
            this.scene.start('playScene')

        // if user selects credits
            //this.scene.start('creditsScene')
    }

}