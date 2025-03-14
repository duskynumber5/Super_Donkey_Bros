class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene")
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x282d2f).setOrigin(0, 0)
        this.hello = this.add.bitmapText(220, 100, 'arcadeB', 'hi ' + game.playerName.join('') + '!', 75)
        this.directions = this.add.bitmapText(140, 450, 'arcadeR', 'hit the ball back and forth', 30)
        this.controls = this.add.bitmapText(160, 300, 'arcadeR', 'rapidly press D and K to', 30)
        this.controls = this.add.bitmapText(185, 350, 'arcadeR', 'make each donkey jump', 30)
        this.play = this.add.bitmapText(235, 600, 'arcadeR', 'press K to play!', 30)

        //key binds
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyK)) {
            this.sound.play('select')
            this.scene.start('playScene')
        }
    }
}