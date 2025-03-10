// Maddison Lobo
// Super Donkey Bros
// 15 hours

// screen size and add scenes
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    autoCenter: true,
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu, Credits, NameSelect, Controls, Play ],
}

// make game!
let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyD, keyK