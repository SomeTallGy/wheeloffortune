module WheelOfFortune{

    export class GameScore extends Phaser.Text
    {

        // states and signals
        public score: number = 0;
        private displayedScore: DisplayedScore = new DisplayedScore();

        constructor(game:Phaser.Game, x:number, y:number)
        {
            super(game, x, y, "", {
                font: "55px american_captainregular",
                fill: "000000",
                align: "center"
            });
        }

        public updateScore(): void
        {
            console.log("add to score: "+(this.score - this.displayedScore.value));
            let tween:Phaser.Tween = this.game.add.tween(this.displayedScore).to( {value:this.score}, 1000, Phaser.Easing.Cubic.Out, true);
            tween.onUpdateCallback(()=>{
                let n:number = Math.round(this.displayedScore.value);
                this.text = '$'+this.numberWithCommas(n);
            });
        }

        // Disclaimer :: I borrowed this Regex code from stack overflow -- i shalt not take credit for this awesome little gem!
        private numberWithCommas(x:number):string {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    }

    class DisplayedScore
    {
        public value: number = 0;
    }
}