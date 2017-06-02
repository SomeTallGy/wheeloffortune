///<reference path="../node_modules/@types/phaser/phaser.d.ts" />
///<reference path="../node_modules/@types/pixi/pixi.d.ts" />

module WheelOfFortune{

    export class WheelOfFortuneGame {

        public game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(416, 740, Phaser.CANVAS, 'content', {create: this.create});
            //this.game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'content', {create: this.create});  // for testing different dimensions
        }

        create() {
            this.game.state.add("Preloader", Preloader, true);
        }

    }

    window.onload = () => {
        new WheelOfFortuneGame();
    };

}
