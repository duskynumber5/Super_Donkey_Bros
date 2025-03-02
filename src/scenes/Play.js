class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x282d2f).setOrigin(0, 0)

        // add high score (text red (text: 0xffb59e outline: 0xa80203) -- number green (text: 0xe6ff99 outline: 0x038500))

        // add player score w/ chosen name (text blue (text: 0x58ffff outline: 0x049da2) -- number green (text: 0xe6ff99 outline: 0x038500))

        // add borders (yellow (0xffffd6 outline: 0xbab601))

        // add donkeys

        // add ball (0xffb59e outline: 0xa80203)
    }

    update() {
        // if player score > high score
            // update high score to match player score

        // ball movement
            // if ball off screen 
                // delete ball
                // game over
            // if donkey hit ball
                // reverse direction w/ random velocity
                // add 100? to score
        
        // look for user input
            // if yes call donkey update
            // play jump sound
            // play animation?
        
    }

}