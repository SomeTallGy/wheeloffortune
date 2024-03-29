module WheelOfFortune{

    import Sprite = Phaser.Sprite;

    export enum GameState{
        Ready,
        Standby
    }

    export class Game extends Phaser.State
    {
        public static state: GameState = GameState.Standby;

        private wheelGroup: Phaser.Group;
        private wheel: Wheel;
        private arrow: Phaser.Sprite;

        public podium: Phaser.Sprite;

        public vanna: Vanna;
        public backDrop: BackDrop;
        public gameScore: GameScore;
        public debugCheat: DebugCheat;


        // scaling values
        public static podium_scale:number = 1;

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

            // 3. init debug
            this.initDebug();

            // 4. start game
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
                    this.backDrop.state = this.backDrop.bankruptState;
                    this.gameScore.score = 0;
                    this.gameScore.updateScore();
                    break;
                case -1 :
                    // lose turn!
                    this.backDrop.state = this.backDrop.loseATurnState;
                    break;
                case 5000 :
                    // big win!
                    this.backDrop.state = this.backDrop.bigWinState;
                    this.gameScore.score += value;
                    this.gameScore.updateScore();
                    break;
                default :
                    this.backDrop.state = this.backDrop.spinState;
                    this.gameScore.score += value;
                    this.gameScore.updateScore();
                    break;
            }
        }

        private createBG()
        {
            let bg:Phaser.Image = new Phaser.Image(this.game, 0, 0, 'bg');
            // stretch to fit screen dimensions
            bg.scale.x /= bg.right / this.game.width;
            bg.scale.y /= bg.bottom / this.game.height;
            this.game.add.existing(bg);
        }

        private createVanna()
        {
            this.vanna = new Vanna(this.game, this.game.width * 0.5, this.podium.top - (90 * Game.podium_scale), 'vanna');
            this.vanna.scale.setTo((0.8 * Game.podium_scale), (0.8 * Game.podium_scale));
            this.game.add.existing(this.vanna);
            this.vanna.enter();
        }

        private createPodium()
        {
            this.podium = new Phaser.Sprite(this.game, this.game.width * 0.5, this.game.height, 'podium');
            this.podium.anchor.setTo(0.5, 1);

            // scale up the podium if required
            if(this.podium.width < this.game.width)
            {
                Game.podium_scale = this.game.width / this.podium.width;
                this.podium.scale.setTo(Game.podium_scale, Game.podium_scale);
            }


            this.game.add.existing(this.podium);

            this.gameScore = new GameScore(this.game, this.game.width * 0.5, this.podium.top + (58 * Game.podium_scale));
            this.gameScore.anchor.setTo(0.5, 0.5);
            this.gameScore.scale.setTo(Game.podium_scale);
            this.game.add.existing(this.gameScore);

            this.gameScore.updateScore();
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
            this.wheelGroup.scale.setTo(1.2 * Game.podium_scale, Game.podium_scale);


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

                    if(this.debugCheat.text == "")
                    {
                        let gameWheel = <GameWheel>this.wheel;
                        let force = 60 + (20 * Math.random());
                        gameWheel.spinWithForce(force);

                        console.log('spinning wheel with '+force+" newtons of force");
                    }
                    else
                    {
                        let gameWheel = <GameWheel>this.wheel;
                        gameWheel.spinToAngle(gameWheel.valueSegmentTheta(this.debugCheat.cheatValue)+360);

                        console.log('CHEAT: spinning wheel to '+(gameWheel.valueSegmentTheta(this.debugCheat.cheatValue)+360)+" degrees");

                        this.debugCheat.text = "";
                    }


                    //gameWheel.spinToAngle(gameWheel.valueSegmentTheta(0)+360);

                    //this.wheel.landOnAngle(180);
                    //this.wheel.velocityToReach(45);
                    //this.wheel.applySpin3(30);
                    //this.wheel.applySpin2(50);
                    //this.wheel.setVelocity(50);
                    //this.wheel.applySpin(50, 1);
                }
            });
        }

        private initDebug()
        {
            this.debugCheat = new DebugCheat(this.game, this.game.width * 0.5, this.game.height - 20);
            this.debugCheat.anchor.setTo(0.5, 0.5);
            this.game.add.existing(this.debugCheat);
        }

    }

}