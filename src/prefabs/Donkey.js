class Donkey extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)   
        scene.physics.add.existing(this)  
    
        this.body.setCollideWorldBounds(true)
        this.velocity = 10  
    }

    update() {           
        // movement
        if (keyD.isDown || keyK.isDown) {
            if (!this.body.onFloor()) { return }
            this.body.setVelocityY(-1600)
        }
    }
    
    reset() {

    }

}