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
    var BackDropState = (function () {
        function BackDropState(backdrop) {
            this.backdrop = backdrop;
        }
        Object.defineProperty(BackDropState.prototype, "graphicShown", {
            get: function () { return this._graphicShown; },
            set: function (value) {
                if (this._graphicShown != undefined)
                    this._graphicShown.dispose(); // dispose the old graphic
                this._graphicShown = value;
            },
            enumerable: true,
            configurable: true
        });
        return BackDropState;
    }());
    WheelOfFortune.BackDropState = BackDropState;
    ///////////////// Spin State //////////////////
    var BackDropSpinState = (function (_super) {
        __extends(BackDropSpinState, _super);
        function BackDropSpinState(backdrop) {
            return _super.call(this, backdrop) || this;
        }
        BackDropSpinState.prototype.execute = function () {
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(WheelOfFortune.BackDropGraphicType.Spin);
            this.graphicShown.show(function () {
                WheelOfFortune.Game.state = WheelOfFortune.GameState.Ready;
            });
            WheelOfFortune.Wheel.onSpinChange.add(this.onSpinChange, this);
        };
        BackDropSpinState.prototype.onSpinChange = function (spinState) {
            var _this = this;
            if (spinState == WheelOfFortune.SpinState.Spinning) {
                this.graphicShown.flash(function () {
                    _this.graphicShown.hide(function () {
                        _this.backdrop.state = _this.backdrop.spinningState;
                    });
                });
                WheelOfFortune.Wheel.onSpinChange.remove(this.onSpinChange);
            }
        };
        return BackDropSpinState;
    }(BackDropState));
    WheelOfFortune.BackDropSpinState = BackDropSpinState;
    ///////////////// Spinning State //////////////////
    var BackDropSpinningState = (function (_super) {
        __extends(BackDropSpinningState, _super);
        function BackDropSpinningState(backdrop) {
            return _super.call(this, backdrop) || this;
        }
        BackDropSpinningState.prototype.execute = function () {
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(WheelOfFortune.BackDropGraphicType.Spinning);
            this.graphicShown.show();
            WheelOfFortune.Wheel.onSpinChange.add(this.onSpinChange, this);
        };
        BackDropSpinningState.prototype.onSpinChange = function (spinState) {
            if (spinState == WheelOfFortune.SpinState.Stopped) {
                this.graphicShown.hide();
                WheelOfFortune.Wheel.onSpinChange.remove(this.onSpinChange);
            }
        };
        return BackDropSpinningState;
    }(BackDropState));
    WheelOfFortune.BackDropSpinningState = BackDropSpinningState;
    ///////////////// Big Win State //////////////////
    var BackDropBigWinState = (function (_super) {
        __extends(BackDropBigWinState, _super);
        function BackDropBigWinState(backdrop) {
            return _super.call(this, backdrop) || this;
        }
        BackDropBigWinState.prototype.execute = function () {
            var _this = this;
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(WheelOfFortune.BackDropGraphicType.BigWin);
            this.graphicShown.show();
            this.backdrop.game.time.events.add(Phaser.Timer.SECOND * 2.3, function () {
                _this.graphicShown.hide(function () {
                    _this.backdrop.state = _this.backdrop.spinState;
                });
            });
        };
        return BackDropBigWinState;
    }(BackDropState));
    WheelOfFortune.BackDropBigWinState = BackDropBigWinState;
    ///////////////// Bankrupt State //////////////////
    var BackDropBankruptState = (function (_super) {
        __extends(BackDropBankruptState, _super);
        function BackDropBankruptState(backdrop) {
            return _super.call(this, backdrop) || this;
        }
        BackDropBankruptState.prototype.execute = function () {
            var _this = this;
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(WheelOfFortune.BackDropGraphicType.Bankrupt);
            this.graphicShown.show();
            // hide vanna
            this.backdrop.game.state.getCurrentState().vanna.exit();
            this.backdrop.game.time.events.add(Phaser.Timer.SECOND * 2.3, function () {
                _this.graphicShown.hide(function () {
                    // show vanna
                    _this.backdrop.game.state.getCurrentState().vanna.enter();
                    _this.backdrop.state = _this.backdrop.spinState;
                });
            });
        };
        return BackDropBankruptState;
    }(BackDropState));
    WheelOfFortune.BackDropBankruptState = BackDropBankruptState;
    ///////////////// Lose A Turn State //////////////////
    var BackDropLoseATurnState = (function (_super) {
        __extends(BackDropLoseATurnState, _super);
        function BackDropLoseATurnState(backdrop) {
            return _super.call(this, backdrop) || this;
        }
        BackDropLoseATurnState.prototype.execute = function () {
            var _this = this;
            this.graphicShown = this.backdrop.factory.getBackDropGraphic(WheelOfFortune.BackDropGraphicType.LoseATurn);
            this.graphicShown.show();
            // hide vanna
            this.backdrop.game.state.getCurrentState().vanna.exit();
            this.backdrop.game.time.events.add(Phaser.Timer.SECOND * 2.3, function () {
                _this.graphicShown.hide(function () {
                    // show vanna
                    _this.backdrop.game.state.getCurrentState().vanna.enter();
                    _this.backdrop.state = _this.backdrop.spinState;
                });
            });
        };
        return BackDropLoseATurnState;
    }(BackDropState));
    WheelOfFortune.BackDropLoseATurnState = BackDropLoseATurnState;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=backdropstates.js.map