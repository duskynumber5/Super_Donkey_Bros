class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create() {
        // text for all credits
        this.add.bitmapText(50, 50, 'arcadeG', 'Credits!', 18)
        this.add.bitmapText(50, 100, 'arcadeB', 'game design & programming:\n\n     Maddison Lobo', 18)
        this.add.bitmapText(50, 200, 'arcadeB', 'background art & sprite art:\n\n     Maddison Lobo', 18)
        this.add.bitmapText(50, 300, 'arcadeB', 'music:\n\n     "Pinball Spring" Kevin MacLeod (incompetech.com)\n     Licensed under Creative Commons: By Attribution 4.0\n     License http://creativecommons.org/licenses/by/4.0/', 18)
        this.add.bitmapText(50, 425, 'arcadeB', 'sfx:\n     Maddison Lobo', 18)
        this.add.bitmapText(50, 500, 'arcadeB', 'tools & tech:\n\n     developed with Phaser.js\n     artwork created with Piskel\n     sfx created with JFXR', 18)
        this.add.bitmapText(50, 625, 'arcadeB', 'special thanks:\n\n     testers :)', 18)
        this.add.bitmapText(50, 750, 'arcadeR', 'press K for menu', 18)

        // define keys
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
    }

    update() {
        // K to go back to menu
        if(Phaser.Input.Keyboard.JustDown(keyK)) {
            this.sound.play('select')
            this.scene.start('menuScene')
        }
    }

}