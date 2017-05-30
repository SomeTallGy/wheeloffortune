///<reference path="../node_modules/@types/phaser/phaser.d.ts" />

import Sprite = Phaser.Sprite;

class WheelOfFortuneGame {

    constructor() {
        this.game = new Phaser.Game(416, 740, Phaser.CANVAS, 'content', {
            preload: this.preload,
            create: this.create,
        });
    }

    public game: Phaser.Game;
    private wheel: Wheel;
    private arrow: Phaser.Sprite;

    preload()
    {
        this.game.load.image('wheel', 'image/wheel.png');
        this.game.load.image('arrow', 'image/arrow.png');
    }

    create() {
        // 1. create a GameWheel
        let sprite:Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, 'wheel');
        sprite.anchor.setTo(0.5, 0.5);

        this.wheel = new GameWheel(this.game, sprite);
        this.wheel.centerX = this.game.width * 0.5;
        this.wheel.centerY = this.game.height * 0.5;

        // 2. create arrow
        this.arrow = new Phaser.Sprite(this.game, this.game.width / 2, this.wheel.top, 'arrow');
        this.arrow.anchor.setTo(0.5, 0.5);

        // 3. add assets to game
        this.game.add.existing(this.wheel);
        this.game.add.existing(this.arrow);

        // 4. add a simple interaction to spin the wheel
        this.game.input.onDown.add(() => {
            //(<GameWheel>this.wheel).landOnAngle(720);
            (<GameWheel>this.wheel).landOnAngle2(360);
            //this.wheel.landOnAngle(180);
            //this.wheel.velocityToReach(45);
            //this.wheel.applySpin3(30);
            //this.wheel.applySpin2(50);
            //this.wheel.setVelocity(50);
            //this.wheel.applySpin(50, 1);
        });

        // debug

    }

}

window.onload = () => {
    var game = new WheelOfFortuneGame();
};