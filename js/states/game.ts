module WheelOfFortune{

    import Sprite = Phaser.Sprite;

    export enum GameState{
        Ready,
        Standby,
        Pause
    }

    export class Game extends Phaser.State
    {
        public static state: GameState = GameState.Standby;

        private wheelGroup: Phaser.Group;
        private wheel: Wheel;
        private arrow: Phaser.Sprite;
        private vanna: Vanna;

        public backDrop: BackDrop;
        public gameScore: GameScore;

        // backdrop states


        // booleans
        public hasStarted: boolean = false;

        create()
        {
            // 1. build game
            this.createBG();
            this.createBackDrop();
            this.createPodium();
            this.createVanna();
            this.createGameWheel();

            // 2. init ui
            this.initUI();

            // 2. start game
            this.startGame();
        }

        private startGame()
        {
            this.backDrop.state = this.backDrop.spinState;
        }

        public newScore(value: number): void
        {
            switch(value)
            {
                case 0 :
                    // bankrupt!
                    break;
                case -1 :
                    // lose turn!
                    break;
                case 5000 :
                    // big win!
                    this.backDrop.state = this.backDrop.bigWinState;
                default :
                    this.gameScore.score += value;
                    this.gameScore.updateScore();
                    break;
            }
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

        private createPodium()
        {
            let podium:Phaser.Sprite = new Phaser.Sprite(this.game, this.game.width * 0.5, this.game.height, 'podium');
            podium.anchor.setTo(0.5, 1);
            this.game.add.existing(podium);

            this.gameScore = new GameScore(this.game, this.game.width * 0.5, podium.top + 58);
            this.gameScore.anchor.setTo(0.5, 0.5);
            this.game.add.existing(this.gameScore);
        }

        private createBackDrop()
        {
            this.backDrop = new BackDrop(this.game);
            this.backDrop.centerX = this.game.width * 0.5;
            this.backDrop.centerY = this.game.height * 0.24;
            this.game.add.existing(this.backDrop);
        }


        private createGameWheel()
        {
            // 1. create a GameWheel
            let sprite:Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, 'wheel');
            sprite.anchor.setTo(0.5, 0.5);

            this.wheel = new GameWheel(this.game, sprite);

            // 2. create a group to hold the wheel
            this.wheelGroup = new Phaser.Group(this.game);
            this.wheelGroup.add(this.wheel);
            this.wheelGroup.centerX = this.game.width * 0.5;
            this.wheelGroup.centerY = this.game.height * 1.05;
            this.wheelGroup.scale.set(1.2, 1);

            // 2. create arrow
            this.arrow = new Phaser.Sprite(this.game, this.game.width * 0.5, this.wheelGroup.top, 'arrow');
            this.arrow.anchor.setTo(0.5, 0.5);

            // 3. add assets to game
            this.game.add.existing(this.wheelGroup);
            this.game.add.existing(this.arrow);


        }

        private initUI()
        {
            this.game.input.onDown.add(() => {
                if(Wheel.spinState == SpinState.Stopped && Game.state == GameState.Ready) {

                    // 1. has started?
                    if(!this.hasStarted) this.hasStarted = true;

                    // 2. change game state
                    Game.state = GameState.Standby;

                    // 3. spin wheel

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