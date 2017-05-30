module WheelOfFortune {

    export class Preloader extends Phaser.State {
        preload() {
            this.game.load.image('wheel', 'image/wheel.png');
            this.game.load.image('podium', 'image/podiums.png');
            this.game.load.image('arrow', 'image/arrow.png');
            this.game.load.image('bg', 'image/bg.jpg');
            this.game.load.image('logo', 'image/wof_logo.png');
            this.game.load.image('click_play', 'image/click_play.png');
            this.game.load.image('vanna', 'image/vanna-white.png');
        }

        create() {
            this.initStates();

            this.game.state.start("Game");
        }

        initStates() {
            this.game.state.add("Boot", Boot);
            this.game.state.add("Game", Game);
        }

        setScale() {

        }
    }
}