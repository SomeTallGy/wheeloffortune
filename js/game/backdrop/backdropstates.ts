module WheelOfFortune
{
    export abstract class BackDropState {

        protected backdrop:BackDrop;

        private _graphicShown:BackDropGraphic;
        protected get graphicShown():BackDropGraphic{ return this._graphicShown; }
        protected set graphicShown(value: BackDropGraphic)
        {
            if(this._graphicShown != undefined)
                this._graphicShown.dispose(); // dispose the old graphic

            this._graphicShown = value;
        }

        constructor(backdrop: BackDrop)
        {
            this.backdrop = backdrop;
        }

        abstract execute():void
    }


    ///////////////// Spin State //////////////////
    export class BackDropSpinState extends BackDropState {

        constructor(backdrop: BackDrop)
        {
            super(backdrop);
        }

        public execute():void
        {
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(BackDropGraphicType.Spin);
            this.graphicShown.show(()=>{
                Game.state = GameState.Ready;
            });
            Wheel.onSpinChange.add(this.onSpinChange, this);
        }

        private onSpinChange(spinState: SpinState)
        {
            if(spinState == SpinState.Spinning){
                this.graphicShown.flash(()=>{
                    this.graphicShown.hide(()=>{
                        this.backdrop.state = this.backdrop.spinningState;
                    });
                });
                Wheel.onSpinChange.remove(this.onSpinChange);
            }
        }

    }

    ///////////////// Spinning State //////////////////
    export class BackDropSpinningState extends BackDropState {

        constructor(backdrop: BackDrop)
        {
            super(backdrop);
        }

        public execute():void
        {
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(BackDropGraphicType.Spinning);
            this.graphicShown.show();
            Wheel.onSpinChange.add(this.onSpinChange, this);
        }

        private onSpinChange(spinState: SpinState)
        {
            if(spinState == SpinState.Stopped){
                this.graphicShown.hide();
                Wheel.onSpinChange.remove(this.onSpinChange);
            }
        }

    }

    ///////////////// Big Win State //////////////////
    export class BackDropBigWinState extends BackDropState {

        constructor(backdrop: BackDrop)
        {
            super(backdrop);
        }

        public execute():void
        {
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(BackDropGraphicType.BigWin);
            this.graphicShown.show();

            this.backdrop.game.time.events.add(Phaser.Timer.SECOND * 2.3, ()=>{
                this.graphicShown.hide(()=>{
                    this.backdrop.state = this.backdrop.spinState;
                })
            })
        }

    }


    ///////////////// Bankrupt State //////////////////
    export class BackDropBankruptState extends BackDropState {

        constructor(backdrop: BackDrop)
        {
            super(backdrop);
        }

        public execute():void
        {
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(BackDropGraphicType.Bankrupt);
            this.graphicShown.show();

            // hide vanna
            (<Game>this.backdrop.game.state.getCurrentState()).vanna.exit();

            this.backdrop.game.time.events.add(Phaser.Timer.SECOND * 2.3, ()=>{
                this.graphicShown.hide(()=>{
                    // show vanna
                    (<Game>this.backdrop.game.state.getCurrentState()).vanna.enter();
                    this.backdrop.state = this.backdrop.spinState;
                })
            })
        }

    }


    ///////////////// Lose A Turn State //////////////////
    export class BackDropLoseATurnState extends BackDropState {

        constructor(backdrop: BackDrop)
        {
            super(backdrop);
        }

        public execute():void
        {
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(BackDropGraphicType.LoseATurn);
            this.graphicShown.show();

            // hide vanna
            (<Game>this.backdrop.game.state.getCurrentState()).vanna.exit();

            this.backdrop.game.time.events.add(Phaser.Timer.SECOND * 2.3, ()=>{
                this.graphicShown.hide(()=>{
                    // show vanna
                    (<Game>this.backdrop.game.state.getCurrentState()).vanna.enter();
                    this.backdrop.state = this.backdrop.spinState;
                })
            })
        }

    }


}