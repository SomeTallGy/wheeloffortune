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
    var BigWinDropGraphic = (function (_super) {
        __extends(BigWinDropGraphic, _super);
        function BigWinDropGraphic(game, group, spriteKeys) {
            return _super.call(this, game, group, spriteKeys) || this;
        }
        BigWinDropGraphic.prototype.show = function (callback) {
            var tween = this.game.add.tween(this.scale).from({ x: 0, y: 0 }, 800, Phaser.Easing.Cubic.Out, true);
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
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=backdropgraphics.js.map