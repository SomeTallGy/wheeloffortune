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
var ArcadeWheel = (function (_super) {
    __extends(ArcadeWheel, _super);
    // ######## constructor ########
    function ArcadeWheel(game, sprite) {
        var _this = _super.call(this, game) || this;
        _this.wheelSprite = sprite;
        _this.add(sprite);
        _this.game.physics.startSystem(Phaser.Physics.ARCADE);
        _this.game.physics.enable(_this.wheelSprite, Phaser.Physics.ARCADE);
        _this.wheelSprite.body.angularDrag = 50;
        return _this;
    }
    ArcadeWheel.prototype.update = function () {
    };
    ArcadeWheel.prototype.landOnAngle = function (d) {
        var w = this.velocityToReach(d);
        //let t = (2 * d) / w;
        this.wheelSprite.body.angularVelocity = w;
    };
    ArcadeWheel.prototype.velocityToReach = function (d) {
        // 0. solve for a
        var a = this.wheelSprite.body.angularDrag;
        // 1. solve for t
        var t = Math.sqrt((2 * Phaser.Math.degToRad(d)) / a);
        // 2. solve for v
        return ((2 * d) / t);
    };
    return ArcadeWheel;
}(Phaser.Group));
//# sourceMappingURL=arcadewheel.js.map