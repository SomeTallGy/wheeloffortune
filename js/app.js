"use strict";
///<reference path="../node_modules/@types/phaser/phaser.d.ts" />
///<reference path="../node_modules/@types/pixi/pixi.d.ts" />
var WheelOfFortune;
(function (WheelOfFortune) {
    var WheelOfFortuneGame = (function () {
        function WheelOfFortuneGame() {
            this.game = new Phaser.Game(416, 740, Phaser.CANVAS, 'content', { create: this.create });
            //this.game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'content', {create: this.create});  // for testing different dimensions
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