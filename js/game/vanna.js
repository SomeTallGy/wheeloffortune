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
    var Vanna = (function (_super) {
        __extends(Vanna, _super);
        // ######## constructor ########
        function Vanna(game, x, y, key) {
            var _this = _super.call(this, game, x, y, key) || this;
            _this.shown = new Phaser.Point(x, y);
            _this.hidden = new Phaser.Point(game.width, y + 100);
            _this.x = _this.hidden.x;
            _this.y = _this.hidden.y;
            return _this;
        }
        Vanna.prototype.enter = function () {
            this.game.add.tween(this).to({ x: this.shown.x, y: this.shown.y }, 800, Phaser.Easing.Cubic.Out, true);
        };
        Vanna.prototype.exit = function () {
            this.game.add.tween(this).to({ x: this.hidden.x, y: this.hidden.y }, 700, Phaser.Easing.Cubic.In, true);
        };
        return Vanna;
    }(Phaser.Sprite));
    WheelOfFortune.Vanna = Vanna;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=vanna.js.map