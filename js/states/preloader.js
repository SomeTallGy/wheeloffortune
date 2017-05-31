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
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            this.game.load.image('wheel', 'image/wheel.png');
            this.game.load.image('podium', 'image/podiums.png');
            this.game.load.image('arrow', 'image/arrow.png');
            this.game.load.image('bg', 'image/bg.jpg');
            this.game.load.image('logo', 'image/wof_logo.png');
            this.game.load.image('click_play', 'image/click_play.png');
            this.game.load.image('vanna', 'image/vanna-white.png');
            this.game.load.image('spin_bdg', 'image/click_to_spin.png');
            this.game.load.image('spin_hl', 'image/click_to_spin_hl.png');
            this.game.load.image('bigWin', 'image/big_win.png');
        };
        Preloader.prototype.create = function () {
            this.initStates();
            this.game.state.start("Game");
        };
        Preloader.prototype.initStates = function () {
            this.game.state.add("Boot", Boot);
            this.game.state.add("Game", WheelOfFortune.Game);
        };
        Preloader.prototype.setScale = function () {
        };
        return Preloader;
    }(Phaser.State));
    WheelOfFortune.Preloader = Preloader;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=preloader.js.map