module WheelOfFortune
{
    export class SpinBackDropGraphic extends BackDropGraphic
    {
        constructor(game: Phaser.Game, group: Phaser.Group, spriteKeys: string[])
        {
            super(game, group, spriteKeys);
        }
    }

    export class BigWinDropGraphic extends BackDropGraphic
    {
        constructor(game: Phaser.Game, group: Phaser.Group, spriteKeys: string[])
        {
            super(game, group, spriteKeys);
        }

        public show(callback?:() => void)
        {
            let tween = this.game.add.tween(this.scale).from( {x: 0, y: 0}, 800, Phaser.Easing.Cubic.Out, true);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }

        public hide(callback?:() => void)
        {
            let tween = this.game.add.tween(this.scale).to( {x: 0, y: 0}, 800, Phaser.Easing.Cubic.In, true);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }
    }
}