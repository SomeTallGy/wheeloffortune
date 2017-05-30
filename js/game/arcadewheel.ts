class ArcadeWheel extends Phaser.Group {

    // graphics for wheel
    public wheelSprite:Phaser.Sprite;

    // ######## constructor ########
    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game)
        this.wheelSprite = sprite;
        this.add(sprite);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.enable(this.wheelSprite, Phaser.Physics.ARCADE);
        this.wheelSprite.body.angularDrag = 50;

    }

    update() {

    }

    public landOnAngle(d: number): void
    {
        let w = this.velocityToReach(d);
        //let t = (2 * d) / w;

        this.wheelSprite.body.angularVelocity = w;
    }

    public velocityToReach(d: number): number
    {
        // 0. solve for a
        let a = this.wheelSprite.body.angularDrag;

        // 1. solve for t
        let t = Math.sqrt( (2 * Phaser.Math.degToRad(d)) / a);

        // 2. solve for v
        return ((2 * d) / t);
    }

}