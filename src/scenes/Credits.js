class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create() {
        // text for all credits
        this.add.text(300, 400, 'insert text here!')
        this.add.text(300, 700, 'press K for menu')

        // define keys
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
    }

    update() {
        // K to go back to menu
        if(Phaser.Input.Keyboard.JustDown(keyK)) {
            this.scene.start('menuScene')
        }
    }

}