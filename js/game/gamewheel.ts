module WheelOfFortune {

    export class GameWheel extends Wheel
    {

        private readonly valueList: Array<number> =      // values of wheel segments starting at 5000 (anti clockwise)
            [
                5000,
                600,
                300,
                700,
                450,
                350,
                800,
                -1,     // lose a turn
                300,
                400,
                600,
                0,      // bankrupt!
                900,
                300,
                500,
                900,
                300,
                400,
                550,
                800,
                500,
                300,
                500,
                600,
            ];

        private segmentTheta: number;                    // the angle in degrees of a value segment

        constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
            super(game, sprite);

            // 1. get the theta of each value segment
            this.segmentTheta = 360 / this.valueList.length;

            // 2. offset sprite's angle by half of a segment's theta (so we have clean angles to work with)
            this.wheelSprite.angle -= this.segmentTheta * 0.5;

            // 3. apply the opposite to the groups's angle for presentation
            this.angle += this.segmentTheta * 0.5;

            // 4. listen to signals
            this.initListeners();
        }

        update() {
            super.update();
        }

        private initListeners()
        {
            let game:Game = <Game>this.game.state.getCurrentState();
            Wheel.onSpinChange.add((spinState:SpinState) => {
                if(spinState == SpinState.Stopped && game.hasStarted)
                {
                    // 1. update score
                    game.gameScore.newScore(this.currentValue());

                    // 2. update backdrop
                }
            });
        }

        /**
         * get current value at angle
         * @returns {number}
         */
        private currentValue(): number {
            return this.valueList[Math.floor(this.angle % 360 / this.segmentTheta)];
        }

        /**
         * get the angle of the value segment
         * @param index : index of valueList
         * @returns {number}
         */
        public valueSegmentTheta(index: number): number {
            return (index * this.segmentTheta) + (this.segmentTheta * 0.5);
        }

        public landOnAngle(d: number): void {
            let w = this.velocityToReach(d);
            let t = (2 * d) / w;

            this.setVelocity(w, t);
            console.log("should take " + t);
        }

        public landOnAngle2(d: number): void {
            let orig_d = d;
            d -= Wheel.IMPULSE_DEGREES + (this.segmentTheta * 0.5);
            let w = this.velocityToReach(d);
            this.applySpin3(w, orig_d);
        }

    }
}