"use strict";
var WheelOfFortune;
(function (WheelOfFortune) {
    var BackDropGraphicType;
    (function (BackDropGraphicType) {
        BackDropGraphicType[BackDropGraphicType["Spin"] = 0] = "Spin";
        BackDropGraphicType[BackDropGraphicType["Spinning"] = 1] = "Spinning";
        BackDropGraphicType[BackDropGraphicType["Bankrupt"] = 2] = "Bankrupt";
        BackDropGraphicType[BackDropGraphicType["LoseATurn"] = 3] = "LoseATurn";
        BackDropGraphicType[BackDropGraphicType["BigWin"] = 4] = "BigWin";
    })(BackDropGraphicType = WheelOfFortune.BackDropGraphicType || (WheelOfFortune.BackDropGraphicType = {}));
    var BackDropFactory = (function () {
        function BackDropFactory(group) {
            this.map = {};
            this.group = group;
        }
        BackDropFactory.prototype.getBackDropGraphic = function (type) {
            // backDropGraphic flyweight
            /*
            if(this.map[type] != undefined)
            {
                let graphic:BackDropGraphic = this.map[type];
                graphic.reuse();
                return graphic;
            }
            */
            // make a new graphic
            switch (type) {
                case BackDropGraphicType.Spin:
                    return new WheelOfFortune.SpinBackDropGraphic(this.group.game, this.group, ['spin_bdg', 'spin_hl']);
                //this.map[type] = new SpinBackDropGraphic(this.group.game, this.group, ['spin_bdg','spin_hl']);
                //return this.getBackDropGraphic(type);
                case BackDropGraphicType.BigWin:
                    return new WheelOfFortune.BigWinDropGraphic(this.group.game, this.group, ['bigWin']);
                //this.map[type] = new BigWinDropGraphic(this.group.game, this.group, ['bigWin']);
                //return this.getBackDropGraphic(type);
                default:
                    return new WheelOfFortune.SpinBackDropGraphic(this.group.game, this.group, ['spin_bdg', 'spin_hl']);
            }
        };
        return BackDropFactory;
    }());
    WheelOfFortune.BackDropFactory = BackDropFactory;
})(WheelOfFortune || (WheelOfFortune = {}));
//# sourceMappingURL=backdropfactory.js.map