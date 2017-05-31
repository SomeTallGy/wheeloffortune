module WheelOfFortune{

    export class DebugCheat extends Phaser.Text
    {
        public cheatValue:number;

        constructor(game:Phaser.Game, x:number, y:number)
        {
            super(game, x, y, "", {
                font: "25px american_captainregular",
                fill: "FF0000",
                align: "center"
            });

            this.text = "";

            this.initKeyboard();
        }

        private initKeyboard()
        {
            this.game.input.keyboard.addCallbacks(this, this.keyPress);
        }

        private keyPress(e: KeyboardEvent)
        {
            // get numbers only
            if(e.keyCode >= 48 && e.keyCode <= 57) {
                let n = e.keyCode - 48;
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
        }

    }
}