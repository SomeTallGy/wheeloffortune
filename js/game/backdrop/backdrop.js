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
    var BackDrop = (function (_super) {
        __extends(BackDrop, _super);
        function BackDrop(game) {
            var _this = _super.call(this, game) || this;
            // start up the factory
            _this.factory = new WheelOfFortune.BackDropFactory(_this);
            // init states
            _this.initStates();
            return _this;
        }
        Object.defineProperty(BackDrop.prototype, "state", {
            get: function () { return this._state; },
            set: function (value) {
                this._state = value;
                this._state.execute();
            },
            enumerable: true,
            configurable: true
        });
        BackDrop.prototype.initStates = function () {
            this.spinState = new WheelOfFortune.BackDropSpinState(this);
            this.spinningState = new WheelOfFortune.BackDropSpinningState(this);
            this.bigWinState = new WheelOfFortune.BackDropBigWinState(this);
            this.bankruptState = new WheelOfFortune.BackDropBankruptState(this);
            this.loseATurnState = new WheelOfFortune.BackDropLoseATurnState(this);
        };
        return BackDrop;
    }(Phaser.Group));
    WheelOfFortune.BackDrop = BackDrop;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=backdrop.js.map