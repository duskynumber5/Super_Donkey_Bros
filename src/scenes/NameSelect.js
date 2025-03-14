class NameSelect extends Phaser.Scene {
    constructor() {
        super("nameSelectScene")
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x282d2f).setOrigin(0, 0)

        // title text
        this.title = this.add.bitmapText(195, 50, 'arcadeB', 'enter your name!', 35)

        //alphabet
        game.alphabet = []
        game.alphabet.push('_')
        for (let i = 65; i <= 90; i++) {
            game.alphabet.push(String.fromCharCode(i))      // get an array w/ alphabet and '_'
        }
        //console.log(game.alphabet)

        // actual name text lol
        this.currentLetter = 0
        this.currentSlot = 0

        // array to store player name
        game.playerName = []

        // each letter slot + stroke
        this.slot1 = this.add.bitmapText(125, 300, 'arcadeB', game.alphabet[this.currentLetter], 100)
        this.slot2 = this.add.bitmapText(275, 300, 'arcadeB', game.alphabet[this.currentLetter], 100)
        this.slot3 = this.add.bitmapText(425, 300, 'arcadeB', game.alphabet[this.currentLetter], 100)
        this.slot4 = this.add.bitmapText(575, 300, 'arcadeB', game.alphabet[this.currentLetter], 100)

        // instructions text + stroke
        this.instructions = this.add.bitmapText(150, 500, 'arcadeR', 'press D to cycle letters\n    and K to select', 30)

        //key binds
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

    }

    update() { 
        // if name full or if counter reached then to go play scene
        if(this.currentSlot > 3) {
            this.instructions.x = 85    // change location
            this.instructions.text = '    press D to restart or\n        K to confirm'   // change instructions
            if (Phaser.Input.Keyboard.JustDown(keyD)) {
                this.sound.play('select')
                for(let i = 0; i < 4; i++) {        // reset all slots to '_'
                    this.currentSlot = i
                    this.slots[this.currentSlot].text = game.alphabet[this.currentLetter]
                }
                this.currentLetter = 0
                this.currentSlot = 0
                game.playerName = []        // reset player name
                this.instructions.x = 40        // new position 
                this.instructions.text = '     press D to cycle letters\n         and K to select'     // new instructions
            }
            if (Phaser.Input.Keyboard.JustDown(keyK)) {
                this.sound.play('select')
                this.scene.start('controlsScene')       // proceed to control scene
            }
        }

        this.slots = [this.slot1, this.slot2, this.slot3, this.slot4]       // array of slots    

        // ADD NEW INDICATOR FOR SLOTS
        if (this.currentSlot < 4) {
            //this.slots[this.currentSlot].setStroke('#FFFFFF', 10)
        }

        // detect input for change letter
        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            this.sound.play('select')
            //console.log(this.currentSlot)
            if(this.currentLetter < 26) {
                this.slots[this.currentSlot].text = game.alphabet[this.currentLetter += 1]      // cycle through alphabet
            } else {
                this.currentLetter = 1
                this.slots[this.currentSlot].text = game.alphabet[this.currentLetter]      // if hit end, restart at 'A'
            }
        }

        // detect input for select letter/next letter
        if(Phaser.Input.Keyboard.JustDown(keyK)) {      // once player moves to new slot
            this.sound.play('select')
            if(this.currentLetter > 0) {   
                game.playerName.push(game.alphabet[this.currentLetter])     // if there is a letter add letter
            } else {
                game.playerName.push(' ')       // if its '_' then add a space
            }
            //console.log(game.playerName)

            // update highlight
            //this.slots[this.currentSlot].setStroke('#049da2', 10)
            this.currentSlot += 1           // next slot  
            this.currentLetter = 0          // start at first letter
        }
    }
}