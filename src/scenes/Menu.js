class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    prefabs() {
        // load everything :D
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x7fe3ea).setOrigin(0, 0)

        // add basic title for now

        // ideally add animated title!
    }

    update() {
        // if !background_music
            // play music
            // loop true
        
        // if user selects play
            //this.scene.start('playScene')

        // if user selects credits
            //this.scene.start('creditsScene')
    }

}