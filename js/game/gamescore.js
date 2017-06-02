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
    var GameScore = (function (_super) {
        __extends(GameScore, _super);
        function GameScore(game, x, y) {
            var _this = _super.call(this, game, x, y, "", {
                font: "55px american_captainregular",
                fill: "000000",
                align: "center"
            }) || this;
            // states and signals
            _this.score = 0;
            _this.displayedScore = new DisplayedScore();
            return _this;
        }
        GameScore.prototype.updateScore = function () {
            var _this = this;
            console.log("add to score: " + (this.score - this.displayedScore.value));
            var tween = this.game.add.tween(this.displayedScore).to({ value: this.score }, 1000, Phaser.Easing.Cubic.Out, true);
            tween.onUpdateCallback(function () {
                var n = Math.round(_this.displayedScore.value);
                _this.text = '$' + _this.numberWithCommas(n);
            });
        };
        // Disclaimer :: I borrowed this Regex code from stack overflow -- i shalt not take credit for this awesome little gem!
        GameScore.prototype.numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        return GameScore;
    }(Phaser.Text));
    WheelOfFortune.GameScore = GameScore;
    var DisplayedScore = (function () {
        function DisplayedScore() {
            this.value = 0;
        }
        return DisplayedScore;
    }());
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=gamescore.js.map