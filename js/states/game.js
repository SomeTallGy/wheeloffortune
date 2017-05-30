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
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Game.prototype.create = function () {
            this.createBG();
            this.createUI();
            this.createVanna();
            this.createGameWheel();
            // debug
        };
        Game.prototype.createBG = function () {
            var bg = new Phaser.Image(this.game, 0, 0, 'bg');
            this.game.add.existing(bg);
        };
        Game.prototype.createVanna = function () {
            this.vanna = new WheelOfFortune.Vanna(this.game, this.game.width * 0.5, this.game.height * 0.35, 'vanna');
            this.vanna.scale.setTo(0.8, 0.8);
            this.game.add.existing(this.vanna);
            this.vanna.enter();
        };
        Game.prototype.createUI = function () {
            var podium = new Phaser.Sprite(this.game, this.game.width / 2, this.game.height, 'podium');
            podium.anchor.setTo(0.5, 1);
            this.game.add.existing(podium);
        };
        Game.prototype.createGameWheel = function () {
            var _this = this;
            // 1. create a GameWheel
            var sprite = new Phaser.Sprite(this.game, 0, 0, 'wheel');
            sprite.anchor.setTo(0.5, 0.5);
            this.wheel = new WheelOfFortune.GameWheel(this.game, sprite);
            // 2. create a group to hold the wheel
            this.wheelGroup = new Phaser.Group(this.game);
            this.wheelGroup.add(this.wheel);
            this.wheelGroup.centerX = this.game.width * 0.5;
            this.wheelGroup.centerY = this.game.height * 1.05;
            this.wheelGroup.scale.set(1.2, 1);
            // 2. create arrow
            this.arrow = new Phaser.Sprite(this.game, this.game.width / 2, this.wheelGroup.top, 'arrow');
            this.arrow.anchor.setTo(0.5, 0.5);
            // 3. add assets to game
            this.game.add.existing(this.wheelGroup);
            this.game.add.existing(this.arrow);
            // 4. add a simple interaction to spin the wheel
            this.game.input.onDown.add(function () {
                if (WheelOfFortune.Wheel.spinState == WheelOfFortune.SpinState.Stopped) {
                    //(<GameWheel>this.wheel).landOnAngle(720);
                    _this.wheel.landOnAngle2(360);
                    //this.wheel.landOnAngle(180);
                    //this.wheel.velocityToReach(45);
                    //this.wheel.applySpin3(30);
                    //this.wheel.applySpin2(50);
                    //this.wheel.setVelocity(50);
                    //this.wheel.applySpin(50, 1);
                }
            });
        };
        return Game;
    }(Phaser.State));
    WheelOfFortune.Game = Game;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=game.js.map