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
    var DebugCheat = (function (_super) {
        __extends(DebugCheat, _super);
        function DebugCheat(game, x, y) {
            var _this = _super.call(this, game, x, y, "", {
                font: "25px american_captainregular",
                fill: "FF0000",
                align: "center"
            }) || this;
            _this.text = "";
            _this.initKeyboard();
            return _this;
        }
        DebugCheat.prototype.initKeyboard = function () {
            this.game.input.keyboard.addCallbacks(this, this.keyPress);
        };
        DebugCheat.prototype.keyPress = function (e) {
            // get numbers only
            if (e.keyCode >= 48 && e.keyCode <= 57) {
                var n = e.keyCode - 48;
                if (this.text.length < 1 || this.text.length >= 2)
                    this.text = String(n); // add first character or override and set back to 1 character
                else if (this.text.length < 2)
                    this.text += String(n); // add second character
                // make sure it's less than 23
                if (+this.text <= 23)
                    this.cheatValue = +this.text;
                else
                    this.cheatValue = 23;
                // reassert text
                this.text = String(this.cheatValue);
            }
        };
        return DebugCheat;
    }(Phaser.Text));
    WheelOfFortune.DebugCheat = DebugCheat;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=debug.js.map