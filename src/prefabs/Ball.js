class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)   
        scene.physics.add.existing(this)  

        this.body.allowGravity = false
        this.body.setCollideWorldBounds(false)
        this.body.setImmovable(true)

        this.body.velocity.x = 300
        this.body.velocity.y = 0
        this.body.setBounce(1, 1)
    }

    update() {

    }

}