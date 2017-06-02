module WheelOfFortune
{
    export class SpinBackDropGraphic extends BackDropGraphic
    {
        constructor(game: Phaser.Game, group: Phaser.Group, spriteKeys: string[])
        {
            super(game, group, spriteKeys);
        }
    }

    export class ApplauseGraphic extends BackDropGraphic
    {
        constructor(game: Phaser.Game, group: Phaser.Group, spriteKeys: string[])
        {
            super(game, group, spriteKeys);
            this.sprites[0].anchor.setTo(0.5, 0.86);
        }

        public show(callback?:() => void)
        {
            let tween = this.game.add.tween(this).from( {x: 0, y: -300}, 800, Phaser.Easing.Cubic.Out, true);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }

        public hide(callback?:() => void)
        {
            let tween = this.game.add.tween(this).to( {x: 0, y: -300}, 800, Phaser.Easing.Cubic.In, true);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
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
            let tween = this.game.add.tween(this.scale).from( {x: 0, y: 0}, 800, Phaser.Easing.Cubic.Out, true, 800);
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

    export class BankruptDropGraphic extends BackDropGraphic
    {
        constructor(game: Phaser.Game, group: Phaser.Group, spriteKeys: string[])
        {
            super(game, group, spriteKeys);
        }

        public show(callback?:() => void)
        {
            let tween = this.game.add.tween(this).from( {x: 0, y: -500}, 800, Phaser.Easing.Cubic.Out, true, 800);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }

        public hide(callback?:() => void)
        {
            let tween = this.game.add.tween(this).to( {x: 0, y: this.game.height}, 800, Phaser.Easing.Cubic.In, true);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }
    }

    export class LoseATurnGraphic extends BackDropGraphic
    {
        constructor(game: Phaser.Game, group: Phaser.Group, spriteKeys: string[])
        {
            super(game, group, spriteKeys);
        }

        public show(callback?:() => void)
        {
            let tween = this.game.add.tween(this).from( {x: 0, y: -500}, 800, Phaser.Easing.Cubic.Out, true, 800);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }

        public hide(callback?:() => void)
        {
            let tween = this.game.add.tween(this).to( {x: 0, y: this.game.height}, 800, Phaser.Easing.Cubic.In, true);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }
    }


}