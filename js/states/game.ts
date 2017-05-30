module WheelOfFortune{

    import Sprite = Phaser.Sprite;

    export class Game extends Phaser.State
    {
        private wheelGroup: Phaser.Group;
        private wheel: Wheel;
        private arrow: Phaser.Sprite;
        private vanna: Vanna;

        create()
        {
            this.createBG();
            this.createUI();
            this.createVanna();
            this.createGameWheel();
            // debug
        }

        private createBG()
        {
            let bg:Phaser.Image = new Phaser.Image(this.game, 0, 0, 'bg');
            this.game.add.existing(bg);
        }

        private createVanna()
        {
            this.vanna = new Vanna(this.game, this.game.width * 0.5, this.game.height * 0.35, 'vanna');
            this.vanna.scale.setTo(0.8, 0.8);
            this.game.add.existing(this.vanna);
            this.vanna.enter();
        }

        private createUI()
        {
            let podium:Phaser.Sprite = new Phaser.Sprite(this.game, this.game.width / 2, this.game.height, 'podium');
            podium.anchor.setTo(0.5, 1);
            this.game.add.existing(podium);
        }

        private createGameWheel()
        {
            // 1. create a GameWheel
            let sprite:Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, 'wheel');
            sprite.anchor.setTo(0.5, 0.5);

            this.wheel = new GameWheel(this.game, sprite);

            // 2. create a group to hold the wheel
            this.wheelGroup = new Phaser.Group(this.game);
            this.wheelGroup.add(this.wheel)
            this.wheelGroup.centerX = this.game.width * 0.5;
            this.wheelGroup.centerY = this.game.height * 1.05;
            this.wheelGroup.scale.set(1.2, 1);

            // 2. create arrow
            this.arrow = new Phaser.Sprite(this.game, this.game.width / 2, this.wheelGroup.top, 'arrow');
            this.arrow.anchor.setTo(0.5, 0.5);

            // 3. add assets to game
            this.game.add.existing(this.wheelGroup);
            this.game.add.existing(this.arrow);

            // 4. add a simple interaction to spin the wheel
            this.game.input.onDown.add(() => {
                if(Wheel.spinState == SpinState.Stopped) {
                    //(<GameWheel>this.wheel).landOnAngle(720);
                    (<GameWheel>this.wheel).landOnAngle2(360);
                    //this.wheel.landOnAngle(180);
                    //this.wheel.velocityToReach(45);
                    //this.wheel.applySpin3(30);
                    //this.wheel.applySpin2(50);
                    //this.wheel.setVelocity(50);
                    //this.wheel.applySpin(50, 1);
                }
            });
        }


    }

}