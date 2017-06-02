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
    var SpinBackDropGraphic = (function (_super) {
        __extends(SpinBackDropGraphic, _super);
        function SpinBackDropGraphic(game, group, spriteKeys) {
            return _super.call(this, game, group, spriteKeys) || this;
        }
        return SpinBackDropGraphic;
    }(WheelOfFortune.BackDropGraphic));
    WheelOfFortune.SpinBackDropGraphic = SpinBackDropGraphic;
    var ApplauseGraphic = (function (_super) {
        __extends(ApplauseGraphic, _super);
        function ApplauseGraphic(game, group, spriteKeys) {
            var _this = _super.call(this, game, group, spriteKeys) || this;
            _this.sprites[0].anchor.setTo(0.5, 0.86);
            return _this;
        }
        ApplauseGraphic.prototype.show = function (callback) {
            var tween = this.game.add.tween(this).from({ x: 0, y: -300 }, 800, Phaser.Easing.Cubic.Out, true);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        ApplauseGraphic.prototype.hide = function (callback) {
            var tween = this.game.add.tween(this).to({ x: 0, y: -300 }, 800, Phaser.Easing.Cubic.In, true);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        return ApplauseGraphic;
    }(WheelOfFortune.BackDropGraphic));
    WheelOfFortune.ApplauseGraphic = ApplauseGraphic;
    var BigWinDropGraphic = (function (_super) {
        __extends(BigWinDropGraphic, _super);
        function BigWinDropGraphic(game, group, spriteKeys) {
            return _super.call(this, game, group, spriteKeys) || this;
        }
        BigWinDropGraphic.prototype.show = function (callback) {
            var tween = this.game.add.tween(this.scale).from({ x: 0, y: 0 }, 800, Phaser.Easing.Cubic.Out, true, 800);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        BigWinDropGraphic.prototype.hide = function (callback) {
            var tween = this.game.add.tween(this.scale).to({ x: 0, y: 0 }, 800, Phaser.Easing.Cubic.In, true);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        return BigWinDropGraphic;
    }(WheelOfFortune.BackDropGraphic));
    WheelOfFortune.BigWinDropGraphic = BigWinDropGraphic;
    var BankruptDropGraphic = (function (_super) {
        __extends(BankruptDropGraphic, _super);
        function BankruptDropGraphic(game, group, spriteKeys) {
            return _super.call(this, game, group, spriteKeys) || this;
        }
        BankruptDropGraphic.prototype.show = function (callback) {
            var tween = this.game.add.tween(this).from({ x: 0, y: -500 }, 800, Phaser.Easing.Cubic.Out, true, 800);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        BankruptDropGraphic.prototype.hide = function (callback) {
            var tween = this.game.add.tween(this).to({ x: 0, y: this.game.height }, 800, Phaser.Easing.Cubic.In, true);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        return BankruptDropGraphic;
    }(WheelOfFortune.BackDropGraphic));
    WheelOfFortune.BankruptDropGraphic = BankruptDropGraphic;
    var LoseATurnGraphic = (function (_super) {
        __extends(LoseATurnGraphic, _super);
        function LoseATurnGraphic(game, group, spriteKeys) {
            return _super.call(this, game, group, spriteKeys) || this;
        }
        LoseATurnGraphic.prototype.show = function (callback) {
            var tween = this.game.add.tween(this).from({ x: 0, y: -500 }, 800, Phaser.Easing.Cubic.Out, true, 800);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        LoseATurnGraphic.prototype.hide = function (callback) {
            var tween = this.game.add.tween(this).to({ x: 0, y: this.game.height }, 800, Phaser.Easing.Cubic.In, true);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        return LoseATurnGraphic;
    }(WheelOfFortune.BackDropGraphic));
    WheelOfFortune.LoseATurnGraphic = LoseATurnGraphic;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=backdropgraphics.js.map