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
    var GameWheel = (function (_super) {
        __extends(GameWheel, _super);
        function GameWheel(game, sprite) {
            var _this = _super.call(this, game, sprite) || this;
            _this.valueList = [
                5000,
                600,
                300,
                700,
                450,
                350,
                800,
                -1,
                300,
                400,
                600,
                0,
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
            // 1. get the theta of each value segment
            _this.segmentTheta = 360 / _this.valueList.length;
            // 2. offset sprite's angle by half of a segment's theta (so we have clean angles to work with)
            _this.wheelSprite.angle -= _this.segmentTheta * 0.5;
            // 3. apply the opposite to the groups's angle for presentation
            _this.angle += _this.segmentTheta * 0.5;
            // debug
            console.log("Game Wheel Created! Adjusted angle by " + (_this.segmentTheta * 0.5));
            return _this;
        }
        GameWheel.prototype.update = function () {
            _super.prototype.update.call(this);
            // debug
            // console.log(this.currentValue());
        };
        /**
         * get current value at angle
         * @returns {number}
         */
        GameWheel.prototype.currentValue = function () {
            return this.valueList[Math.floor(this.angle % 360 / this.segmentTheta)];
        };
        /**
         * get the angle of the value segment
         * @param index : index of valueList
         * @returns {number}
         */
        GameWheel.prototype.valueSegmentTheta = function (index) {
            return (index * this.segmentTheta) + (this.segmentTheta * 0.5);
        };
        GameWheel.prototype.landOnAngle = function (d) {
            var w = this.velocityToReach(d);
            var t = (2 * d) / w;
            this.setVelocity(w, t);
            console.log("should take " + t);
        };
        GameWheel.prototype.landOnAngle2 = function (d) {
            var orig_d = d;
            d -= WheelOfFortune.Wheel.IMPULSE_DEGREES + (this.segmentTheta * 0.5);
            var w = this.velocityToReach(d);
            this.applySpin3(w, orig_d);
        };
        return GameWheel;
    }(WheelOfFortune.Wheel));
    WheelOfFortune.GameWheel = GameWheel;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=gamewheel.js.map