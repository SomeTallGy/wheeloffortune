module WheelOfFortune{

    export class DebugCheat extends Phaser.Text
    {
        constructor(game:Phaser.Game, x:number, y:number)
        {
            super(game, x, y, "", {
                font: "55px american_captainregular",
                fill: "000000",
                align: "center"
            });
        }
    }
}