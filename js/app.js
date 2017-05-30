"use strict";
///<reference path="../node_modules/@types/phaser/phaser.d.ts" />
var WheelOfFortune;
(function (WheelOfFortune) {
    var WheelOfFortuneGame = (function () {
        function WheelOfFortuneGame() {
            this.game = new Phaser.Game(416, 740, Phaser.CANVAS, 'content', { create: this.create });
        }
        WheelOfFortuneGame.prototype.create = function () {
            this.game.state.add("Preloader", WheelOfFortune.Preloader, true);
        };
        return WheelOfFortuneGame;
    }());
    WheelOfFortune.WheelOfFortuneGame = WheelOfFortuneGame;
    window.onload = function () {
        new WheelOfFortuneGame();
    };
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=app.js.map