module WheelOfFortune
{
    export class BackDrop extends Phaser.Group
    {
        public factory: BackDropFactory;

        public spinState:BackDropState;
        public spinningState:BackDropState;
        public bigWinState:BackDropState;
        public bankruptState:BackDropState;
        public loseATurnState:BackDropState;

        private _state:BackDropState;

        public get state():BackDropState{ return this._state; }
        public set state(value:BackDropState)
        {
            this._state = value;
            this._state.execute();
        }

        constructor(game: Phaser.Game)
        {
            super(game);

            // start up the factory
            this.factory = new BackDropFactory(this);

            // init states
            this.initStates();
        }

        public initStates()
        {
            this.spinState = new BackDropSpinState(this);
            this.spinningState = new BackDropSpinningState(this);
            this.bigWinState = new BackDropBigWinState(this);
            this.bankruptState = new BackDropBankruptState(this);
            this.loseATurnState = new BackDropLoseATurnState(this);

        }
    }
}