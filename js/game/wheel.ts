module WheelOfFortune {

    export enum SpinState{ Stopped, Spinning }

    export class Wheel extends Phaser.Group
    {

        // graphics for wheel
        public wheelSprite: Phaser.Sprite;

        // physics attributes of the wheel
        static readonly MASS: number = 10;              // mass in Kgs
        static readonly RADIUS: number = 2;             // radius in meters
        static readonly IMPULSE_DEGREES: number = 45;   // how many degrees of spin will impulse be applied to
        static readonly DRAG: number = -0.5;            // how much negative accelaration in radians / s^2

        private rI: number =                            // rotational inertia (1/2 mass * r^2 :: for a cylinder)
            (Wheel.MASS * 0.5) * (Wheel.RADIUS * Wheel.RADIUS);

        private force: number = 0;                      // tangent force in newtons
        private torque: number = 0;                     // torque - angular work (force * r * sin(90))
        private angular_acceleration: number = 0;       // angular acceleration (torque * rotational inertia)
        private angular_velocity: number = 0;           // angular velocity (angular_acceleration * t(seconds))

        private time_dilation: number = 1;              // value in which physics intervals are scaled

        // bookkeeping attributes
        private target_coasting_time: number = 0;       // targeted coasting time after impulse
        private actual_coasting_time: number = 0;       // actual coasting time after impulse

        // states and signals
        static onSpinChange: Phaser.Signal = new Phaser.Signal();

        private static _spinState: SpinState;
        public static get spinState(): SpinState { return this._spinState; }
        public static set spinState(value: SpinState) {
            if(value == this.spinState)
                return;

            this._spinState = value;
            Wheel.onSpinChange.dispatch(value);
        }


        // ######## constructor ########
        constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
            super(game);
            this.wheelSprite = sprite;
            this.add(sprite);
        }

        update() {
            // 1. update angular velocity
            this.updateAngularVelocity();

            // 2. update angle of wheel
            this.updateAngle();
        }

        /**
         * Calculate and the angle of the wheel
         */
        private updateAngle(): void {

            // 1. Update the angle of the wheel
            let theta: number = this.angular_velocity * this.game.time.physicsElapsed;
            this.angle += Phaser.Math.radToDeg(theta);

            // 2. Bookkeeping
            if (this.target_coasting_time != 0) {
                if (this.angular_velocity > 0)
                    this.actual_coasting_time += this.game.time.physicsElapsed;
                else {
                    this.actual_coasting_time = 0;
                    this.target_coasting_time = 0;
                }
            }
        }

        /**
         * Apply angular impulse to the wheel for t seconds
         * @param n tangent force in newtons
         * @param t for how long in seconds
         */
        public applySpin(n: number, t: number): void {
            console.log("apply " + n + " newtons for " + t + " seconds");

            this.force = n;
            this.updateAngularAcceleration();

            // after t seconds, nullify force
            this.game.time.events.add(Phaser.Timer.SECOND * t, () => {

                // 1. update angular velocity once more as this is happening before the update callback
                this.updateAngularVelocity();

                // 2. nullify force and update acceleration
                this.force = 0;
                this.updateAngularAcceleration();
            });
        }

        /**
         * Apply angular impulse to the wheel until Wheel.IMPULSE_DEGREES is reached
         * @param n
         */
        public applySpin2(n: number): void {
            this.force = n;
            this.updateAngularAcceleration();

            let d_a = Phaser.Math.radToDeg(this.angular_acceleration);
            let t = Math.sqrt((Wheel.IMPULSE_DEGREES * 2) / d_a);  // t = sqrt(2d / accel)

            //console.log("accelerating at " + d_a + " for " + t + " seconds until we reach " + Wheel.IMPULSE_DEGREES + " degrees.");

            this.game.time.events.add(Phaser.Timer.SECOND * t, () => {
                // 1. update angular velocity once more as this is happening before the update callback
                this.updateAngularVelocity();

                // 2. nullify force and update acceleration
                this.force = 0;
                this.updateAngularAcceleration();

                //console.log("velocity after impulse is: " + this.angular_velocity + " at angle: " + this.angle);
            })
        }

        /**
         * Apply angular impulse to the wheel until Wheel.IMPULSE_DEGREES is reached at a targeted velocity of v
         * Solved using the constant acceleration equation Vf = Vi + (a * t)
         * @param v : target velocity
         */
        public applySpin3(w: number, target_d: number): void {
            // 0. store some values first
            var starting_angle = this.angle;

            // 1. solve for t
            let t = (2 * Wheel.IMPULSE_DEGREES) / w;

            // 2. then solve for a
            let d_a = w / t; // accelerations in degrees / s^2
            this.angular_acceleration = Phaser.Math.degToRad(d_a);

            this.game.time.events.add(t * 1000, () => {

                // 1. nullify force
                this.force = 0;
                this.updateAngularAcceleration();

                // 2. now we have some missing bits due to the computer's clock not being as accurate as the universe -- so we make up to land as close as we can to target_d
                let d = target_d - (this.angle - starting_angle); // remaining angular distance
                let w = this.velocityToReach(d);
                let t = (2 * d) / w;

                this.setVelocity(w, t);

                //console.log("traveled " + (this.angle - starting_angle) + " degrees out of " + target_d);
                //console.log("setting velocity to travel to make up remaining " + d);
            })

        }

        /**
         * Applys a flat angular velocity to the wheel
         * @param w
         */
        public setVelocity(w: number, t?: number): void {
            this.angular_velocity = Phaser.Math.degToRad(w);

            /**
             * In an effort to achieve precision, we have to account for the fraction of time
             * that is lost as intervals of physicsElapsed cannot land on the exact time needed
             * thus -- we will squash the physics intervals ever so slightly by a time_dilation value
             * to get a more precise estimation
             */
            if (t != undefined) {
                this.target_coasting_time = t;

                let c = 0;
                let i = this.game.time.physicsElapsed;
                while (c < this.target_coasting_time) {
                    c += i;
                }
                c += i;

                this.time_dilation = this.target_coasting_time / c;

                // debug
                //console.log("dilate time by: " + this.time_dilation);
            }
        }

        /**
         * Return the needed velocity to spin d degrees before stopping
         * @param d : target degrees to spin before stopping
         */
        public velocityToReach(d: number): number {
            // 1. solve for t
            let t = Math.sqrt((2 * Phaser.Math.degToRad(d)) / Math.abs(Wheel.DRAG));

            // 2. solve for v
            return ((2 * d) / t);
        }

        /**
         * Update Torque and Angular Acceleration
         */
        private updateAngularAcceleration(): void {
            // 1. update torque
            this.torque = this.force * Wheel.RADIUS;

            // 2. update angular acceleration
            this.angular_acceleration = this.torque / this.rI;
        }

        /**
         * Update Angular Velocity
         * @param differenceTime : any difference in time that needs to be included in the quantity (for accuracy)
         */
        private updateAngularVelocity(override?: number): void {

            // 1. override angular velocity?
            if (override != undefined) {
                this.angular_velocity = override;
                return;
            }

            // 2. are we accelerating?
            if (this.angular_acceleration != 0)
            {
                this.angular_velocity += this.angular_acceleration * this.game.time.physicsElapsed;
            }

            // 3. coast
            else {
                let drag = Math.abs(Wheel.DRAG * (this.game.time.physicsElapsed * this.time_dilation));

                if (this.angular_velocity - drag > 0) {
                    this.angular_velocity -= drag;
                }
                else if (this.angular_velocity + drag < 0) {
                    this.angular_velocity += drag;
                }
                else {
                    this.angular_velocity = 0;
                }
            }

            // 4. update spin state
            Wheel.spinState = (this.angular_velocity > 0) ? SpinState.Spinning : SpinState.Stopped;
        }
    }
}
