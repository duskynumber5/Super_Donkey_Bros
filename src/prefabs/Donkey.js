class Donkeys extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)   
        scene.physics.add.existing(this)  
    
        this.body.setCollideWorldBounds(true)
        this.velocity = 350

        this.body.setSize(32, 32).setOffset(0, 0)
    }

    update() {   
        let Vector = new Phaser.Math.Vector2(0,0)
        
        // movement
        if (keyJUMPLEFT.isDown || keyJUMPRIGHT.isDown) {
            playerVector.y = -1
        }

        // apply movement
        this.setVelocity(this.velocity * playerVector.y)

        // animation
        this.player.play(donkeyKick, true)

    }
    
    reset() {

    }

}