module WheelOfFortune
{
    import Point = Phaser.Point;

    export class Vanna extends Phaser.Sprite
    {
        private shown: Phaser.Point;
        private hidden: Phaser.Point;

        // ######## constructor ########
        constructor(game:Phaser.Game, x:number, y:number, key:string)
        {
            super(game, x, y, key);
            this.shown = new Phaser.Point(x, y);
            this.hidden = new Phaser.Point(game.width, y + 100);

            this.x = this.hidden.x;
            this.y = this.hidden.y;
        }

        public enter()
        {
            this.game.add.tween(this).to( {x: this.shown.x, y: this.shown.y}, 800, Phaser.Easing.Cubic.Out, true);
        }

        public exit()
        {
            this.game.add.tween(this).to( {x: this.hidden.x, y: this.hidden.y}, 700, Phaser.Easing.Cubic.In, true);
        }
    }
}