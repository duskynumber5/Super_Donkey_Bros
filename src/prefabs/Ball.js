class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)   
        scene.physics.add.existing(this)  

        //this.body.gravity.y = 500
        this.body.setCollideWorldBounds(true)
        this.body.setImmovable(true)

        this.direction = Math.random() < 0.5 ? -1 : 1      // get random direction for start
        this.body.velocity.x = this.direction * 200
        this.body.setBounce(1)
    }

    update() {

    }

}