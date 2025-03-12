class Controls extends Phaser.Scene {
    constructor() {
        super("controlsScene")
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x282d2f).setOrigin(0, 0)
        this.hello = this.add.text(175, 100, 'hi ' + game.playerName.join('') + '!', game.blueConfig)
        this.hello.setStroke('#049da2', 10)
        this.directions = this.add.text(155, 450, 'hit the ball back and forth', game.redConfig)
        this.directions.setStroke('#a80203', 10)
        this.controls = this.add.text(175, 300, 'rapidly press D and K to', game.redConfig)
        this.controls.setStroke('#a80203', 10)
        this.controls = this.add.text(200, 350, 'make each donkey jump', game.redConfig)
        this.controls.setStroke('#a80203', 10)
        this.play = this.add.text(250, 600, 'press K to play!', game.redConfig)
        this.play.setStroke('#a80203', 10)

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