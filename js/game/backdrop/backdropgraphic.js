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
    var BackDropGraphic = (function (_super) {
        __extends(BackDropGraphic, _super);
        function BackDropGraphic(game, parent, spriteKeys) {
            var _this = _super.call(this, game) || this;
            _this.sprites = [];
            _this.group = parent;
            _this.group.add(_this);
            _this.constructSprites(spriteKeys);
            return _this;
        }
        BackDropGraphic.prototype.constructSprites = function (spriteKeys) {
            for (var _i = 0, spriteKeys_1 = spriteKeys; _i < spriteKeys_1.length; _i++) {
                var key = spriteKeys_1[_i];
                var sprite = new Phaser.Sprite(this.game, 0, 0, key);
                sprite.anchor.setTo(0.5, 0.5);
                this.add(sprite);
                this.sprites.push(sprite);
            }
            // hide second sprite (as it's usually a highlight)
            if (this.sprites.length > 1)
                this.sprites[1].alpha = 0;
        };
        BackDropGraphic.prototype.show = function (callback) {
            var tween = this.game.add.tween(this).from({ x: 0, y: 300 }, 800, Phaser.Easing.Cubic.Out, true);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        BackDropGraphic.prototype.hide = function (callback) {
            var tween = this.game.add.tween(this).to({ x: 0, y: -300 }, 800, Phaser.Easing.Cubic.In, true);
            if (callback != undefined)
                tween.onComplete.add(callback, this);
        };
        BackDropGraphic.prototype.flash = function (callback) {
            if (this.sprites.length > 1) {
                var tween = this.game.add.tween(this.sprites[1]).to({ alpha: 1 }, 200, Phaser.Easing.Linear.None, true, 0, 0, true);
                if (callback != undefined)
                    tween.onComplete.add(callback, this);
            }
        };
        BackDropGraphic.prototype.highlight = function (callback) {
            if (this.sprites.length > 1) {
                var tween = this.game.add.tween(this.sprites[1]).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
                if (callback != undefined)
                    tween.onComplete.add(callback, this);
            }
        };
        BackDropGraphic.prototype.dispose = function () {
            this.group.remove(this);
        };
        BackDropGraphic.prototype.reuse = function () {
            this.group.add(this);
        };
        return BackDropGraphic;
    }(Phaser.Group));
    WheelOfFortune.BackDropGraphic = BackDropGraphic;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=backdropgraphic.js.map