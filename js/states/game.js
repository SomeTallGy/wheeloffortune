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
    var GameState;
    (function (GameState) {
        GameState[GameState["Ready"] = 0] = "Ready";
        GameState[GameState["Standby"] = 1] = "Standby";
    })(GameState = WheelOfFortune.GameState || (WheelOfFortune.GameState = {}));
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // backdrop states
            // booleans
            _this.hasStarted = false;
            return _this;
        }
        Game.prototype.create = function () {
            // 1. build game
            this.createBG();
            this.createBackDrop();
            this.createPodium();
            this.createVanna();
            this.createGameWheel();
            // 2. init ui
            this.initUI();
            // 3. init debug
            this.initDebug();
            // 4. start game
            this.startGame();
        };
        Game.prototype.startGame = function () {
            this.backDrop.state = this.backDrop.spinState;
        };
        Game.prototype.newScore = function (value) {
            switch (value) {
                case 0:
                    // bankrupt!
                    this.backDrop.state = this.backDrop.bankruptState;
                    this.gameScore.score = 0;
                    this.gameScore.updateScore();
                    break;
                case -1:
                    // lose turn!
                    this.backDrop.state = this.backDrop.loseATurnState;
                    break;
                case 5000:
                    // big win!
                    this.backDrop.state = this.backDrop.bigWinState;
                    this.gameScore.score += value;
                    this.gameScore.updateScore();
                    break;
                default:
                    this.backDrop.state = this.backDrop.spinState;
                    this.gameScore.score += value;
                    this.gameScore.updateScore();
                    break;
            }
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
        Game.prototype.createPodium = function () {
            var podium = new Phaser.Sprite(this.game, this.game.width * 0.5, this.game.height, 'podium');
            podium.anchor.setTo(0.5, 1);
            this.game.add.existing(podium);
            this.gameScore = new WheelOfFortune.GameScore(this.game, this.game.width * 0.5, podium.top + 58);
            this.gameScore.anchor.setTo(0.5, 0.5);
            this.game.add.existing(this.gameScore);
            this.gameScore.updateScore();
        };
        Game.prototype.createBackDrop = function () {
            this.backDrop = new WheelOfFortune.BackDrop(this.game);
            this.backDrop.centerX = this.game.width * 0.5;
            this.backDrop.centerY = this.game.height * 0.24;
            this.game.add.existing(this.backDrop);
        };
        Game.prototype.createGameWheel = function () {
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
            this.arrow = new Phaser.Sprite(this.game, this.game.width * 0.5, this.wheelGroup.top, 'arrow');
            this.arrow.anchor.setTo(0.5, 0.5);
            // 3. add assets to game
            this.game.add.existing(this.wheelGroup);
            this.game.add.existing(this.arrow);
        };
        Game.prototype.initUI = function () {
            var _this = this;
            this.game.input.onDown.add(function () {
                if (WheelOfFortune.Wheel.spinState == WheelOfFortune.SpinState.Stopped && Game.state == GameState.Ready) {
                    // 1. has started?
                    if (!_this.hasStarted)
                        _this.hasStarted = true;
                    // 2. change game state
                    Game.state = GameState.Standby;
                    // 3. spin wheel
                    if (_this.debugCheat.text == "") {
                        var gameWheel = _this.wheel;
                        var force = 60 + (20 * Math.random());
                        gameWheel.spinWithForce(force);
                        console.log('spinning wheel with ' + force + " newtons of force");
                    }
                    else {
                        var gameWheel = _this.wheel;
                        gameWheel.spinToAngle(gameWheel.valueSegmentTheta(_this.debugCheat.cheatValue) + 360);
                        console.log('CHEAT: spinning wheel to ' + (gameWheel.valueSegmentTheta(_this.debugCheat.cheatValue) + 360) + " degrees");
                        _this.debugCheat.text = "";
                    }
                    //gameWheel.spinToAngle(gameWheel.valueSegmentTheta(0)+360);
                    //this.wheel.landOnAngle(180);
                    //this.wheel.velocityToReach(45);
                    //this.wheel.applySpin3(30);
                    //this.wheel.applySpin2(50);
                    //this.wheel.setVelocity(50);
                    //this.wheel.applySpin(50, 1);
                }
            });
        };
        Game.prototype.initDebug = function () {
            this.debugCheat = new WheelOfFortune.DebugCheat(this.game, this.game.width * 0.5, this.game.height - 20);
            this.debugCheat.anchor.setTo(0.5, 0.5);
            this.game.add.existing(this.debugCheat);
        };
        return Game;
    }(Phaser.State));
    Game.state = GameState.Standby;
    WheelOfFortune.Game = Game;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=game.js.map