"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var WheelOfFortune;
(function (WheelOfFortune) {
    var Wheel = (function (_super) {
        __extends(Wheel, _super);
        // ######## constructor ########
        function Wheel(game, sprite) {
            var _this = _super.call(this, game) || this;
            //static readonly DRAG: number          = 20;    // amount of degrees/second lost every second after spinning
            _this.rI = (Wheel.MASS * 0.5) * (Wheel.RADIUS * Wheel.RADIUS);
            _this.force = 0; // tangent force in newtons
            _this.torque = 0; // torque - angular work (force * r * sin(90))
            _this.angular_acceleration = 0; // angular acceleration (torque * rotational inertia)
            _this.angular_velocity = 0; // angular velocity (angular_acceleration * t(seconds))
            // bookkeeping attributes
            _this.total_theta = 0; // how many radians has wheel spun;
            _this.impulse_time = 0; // how long has impulse ran
            _this.target_coasting_time = 0;
            _this.actual_coasting_time = 0;
            _this.time_dilation = 1;
            // booleans
            _this.isImpulsing = false; // are we impulsing?
            _this.wheelSprite = sprite;
            _this.add(sprite);
            return _this;
        }
        Wheel.prototype.update = function () {
            // 1. update angular velocity
            this.updateAngularVelocity();
            // 2. update angle of wheel
            this.updateAngle();
            // 3. bookkeeping
            /*if(this.isImpulsing == true)
             this.impulse_time += this.game.time.elapsed / 1000;*/
            // debug
            //console.log(this.angle % 360);
            //console.log(this.angular_acceleration);
        };
        Wheel.prototype.updateAngle = function () {
            //console.log(this.game.time.physicsElapsed);
            var theta = this.angular_velocity * this.game.time.physicsElapsed;
            this.angle += Phaser.Math.radToDeg(theta);
            if (this.target_coasting_time != 0) {
                if (this.angular_velocity > 0)
                    this.actual_coasting_time += this.game.time.physicsElapsed;
                else {
                    //console.log("actual time elapsed: "+this.actual_coasting_time);
                    //console.log("difference in time "+(this.target_coasting_time - this.actual_coasting_time));
                    this.actual_coasting_time = 0;
                    this.target_coasting_time = 0;
                }
            }
        };
        /**
         * Apply angular impulse to the wheel for t seconds
         * @param n : tangent force in newtons
         * @param t : for how long in seconds
         */
        Wheel.prototype.applySpin = function (n, t) {
            var _this = this;
            console.log("apply " + n + " newtons for " + t + " seconds");
            this.force = n;
            this.updateAngularAcceleration();
            // after t seconds, nullify force
            this.game.time.events.add(Phaser.Timer.SECOND * t, function () {
                // 1. update angular velocity once more as this is happening before the update callback
                _this.updateAngularVelocity();
                // 2. nullify force and update acceleration
                _this.force = 0;
                _this.updateAngularAcceleration();
            });
        };
        /**
         * Apply angular impulse to the wheel until Wheel.IMPULSE_DEGREES is reached
         * @param n
         */
        Wheel.prototype.applySpin2 = function (n) {
            var _this = this;
            this.force = n;
            this.updateAngularAcceleration();
            var d_a = Phaser.Math.radToDeg(this.angular_acceleration);
            var t = Math.sqrt((Wheel.IMPULSE_DEGREES * 2) / d_a); // t = sqrt(2d / accel)
            console.log("accelerating at " + d_a + " for " + t + " seconds until we reach " + Wheel.IMPULSE_DEGREES + " degrees.");
            this.game.time.events.add(Phaser.Timer.SECOND * t, function () {
                // 1. update angular velocity once more as this is happening before the update callback
                _this.updateAngularVelocity();
                // 2. nullify force and update acceleration
                _this.force = 0;
                _this.updateAngularAcceleration();
                console.log("velocity after impulse is: " + _this.angular_velocity + " at angle: " + _this.angle);
            });
        };
        /**
         * Apply angular impulse to the wheel until Wheel.IMPULSE_DEGREES is reached at a targeted velocity of v
         * Solved using the constant acceleration equation Vf = Vi + (a * t)
         * @param v : target velocity
         */
        Wheel.prototype.applySpin3 = function (w, target_d) {
            var _this = this;
            // 0. store some values first
            var starting_angle = this.angle;
            // 1. solve for t
            var t = (2 * Wheel.IMPULSE_DEGREES) / w;
            // 2. then solve for a
            var d_a = w / t; // accelerations in degrees / s^2
            this.angular_acceleration = Phaser.Math.degToRad(d_a);
            this.game.time.events.add(t * 1000, function () {
                // 1. nullify force
                _this.force = 0;
                _this.updateAngularAcceleration();
                // 2. now we have some missing bits due to the computer's clock not being as accurate as the universe -- so we make up to land as close as we can to target_d
                var d = target_d - (_this.angle - starting_angle); // remaining angular distance
                var w = _this.velocityToReach(d);
                var t = (2 * d) / w;
                _this.setVelocity(w, t);
                console.log("traveled " + (_this.angle - starting_angle) + " degrees out of " + target_d);
                console.log("setting velocity to travel to make up remaining " + d);
            });
        };
        /**
         * Applys a flat angular velocity to the wheel
         * @param w
         */
        Wheel.prototype.setVelocity = function (w, t) {
            this.angular_velocity = Phaser.Math.degToRad(w);
            /**
             * In an effort to achieve precision, we have to account for the fraction of time
             * that is lost as intervals of physicsElapsed cannot land on the exact time needed
             * thus -- we will squash the physics intervals ever so slightly by a time_dilation value
             * to get a more precise estimation
             */
            if (t != undefined) {
                this.target_coasting_time = t;
                var c = 0;
                var i = this.game.time.physicsElapsed;
                while (c < this.target_coasting_time) {
                    c += i;
                }
                c += i;
                this.time_dilation = this.target_coasting_time / c;
                console.log("dilate time by: " + this.time_dilation);
            }
            //console.log("remaining degrees: "+ this.remainingDegreesAfterImpulse());
        };
        /**
         * Return the needed velocity to spin d degrees before stopping
         * @param d : target degrees to spin before stopping
         */
        Wheel.prototype.velocityToReach = function (d) {
            // 1. solve for t
            var t = Math.sqrt((2 * Phaser.Math.degToRad(d)) / Math.abs(Wheel.DRAG));
            // 2. solve for v
            return ((2 * d) / t);
        };
        /**
         * Update Torque and Angular Acceleration
         */
        Wheel.prototype.updateAngularAcceleration = function () {
            // 1. update torque
            this.torque = this.force * Wheel.RADIUS;
            // 2. update angular acceleration
            this.angular_acceleration = this.torque / this.rI;
        };
        /**
         * Update Angular Velocity
         * @param differenceTime : any difference in time that needs to be included in the quantity (for accuracy)
         */
        Wheel.prototype.updateAngularVelocity = function (override) {
            if (override != undefined) {
                this.angular_velocity = override;
                return;
            }
            if (this.angular_acceleration != 0)
                this.angular_velocity += this.angular_acceleration * this.game.time.physicsElapsed;
            else {
                var drag = Math.abs(Wheel.DRAG * (this.game.time.physicsElapsed * this.time_dilation));
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
        };
        Wheel.prototype.remainingDegreesAfterImpulse = function () {
            var degrees_total = 0;
            var degrees_v = Phaser.Math.radToDeg(this.angular_velocity);
            var s = 0;
            while (degrees_v > 0) {
                degrees_total += degrees_v;
                degrees_v -= Wheel.DRAG;
                s++;
            }
            console.log("will take " + s + " seconds to stop");
            return degrees_total;
        };
        Wheel.prototype.degressDuringImpulse = function () {
            return 0; // temp
        };
        return Wheel;
    }(Phaser.Group));
    // physics attributes of the wheel
    Wheel.MASS = 10; // mass in Kgs
    Wheel.RADIUS = 2; // radius in meters
    Wheel.IMPULSE_DEGREES = 45; // how many degrees of spin will impulse be applied to
    Wheel.DRAG = -0.5; // how much negative accelaration in radians / s^2
    WheelOfFortune.Wheel = Wheel;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=wheel.js.map