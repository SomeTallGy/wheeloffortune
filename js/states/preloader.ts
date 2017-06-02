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
            this.game.load.image('spin_bdg', 'image/click_to_spin.png');
            this.game.load.image('spin_hl', 'image/click_to_spin_hl.png');
            this.game.load.image('bigWin', 'image/big_win.png');
            this.game.load.image('applause', 'image/applause.png');
            this.game.load.image('bankrupt', 'image/bankrupt.png');
            this.game.load.image('lose_a_turn', 'image/lose_a_turn.png');
        }

        create() {
            this.initStates();
            this.setScale();

            this.game.state.start("Game");
        }

        initStates() {
            this.game.state.add("Boot", Boot);
            this.game.state.add("Game", Game);
        }

        setScale() {
            this.game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        }
    }
}