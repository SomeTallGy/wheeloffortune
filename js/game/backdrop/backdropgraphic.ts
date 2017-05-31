module WheelOfFortune
{
    export abstract class BackDropGraphic extends Phaser.Group
    {
        protected sprites:Phaser.Sprite[] = [];
        protected group:Phaser.Group;

        constructor(game: Phaser.Game, parent: Phaser.Group, spriteKeys: string[])
        {
            super(game);
            this.group = parent;
            this.group.add(this);
            this.constructSprites(spriteKeys);
        }

        private constructSprites(spriteKeys:string[])
        {
            for (var key of spriteKeys)
            {
                let sprite:Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, key);
                sprite.anchor.setTo(0.5, 0.5);
                this.add(sprite);

                this.sprites.push(sprite);
            }

            // hide second sprite (as it's usually a highlight)
            if(this.sprites.length > 1)
                this.sprites[1].alpha = 0;
        }

        public show(callback?:() => void)
        {
            let tween = this.game.add.tween(this).from( {x: 0, y: 300}, 800, Phaser.Easing.Cubic.Out, true, 300);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }

        public hide(callback?:() => void)
        {
            let tween = this.game.add.tween(this).to( {x: 0, y: -300}, 800, Phaser.Easing.Cubic.In, true);
            if(callback != undefined)
                tween.onComplete.add(callback, this);
        }

        public flash(callback?:() => void)
        {
            if(this.sprites.length > 1)
            {
                let tween = this.game.add.tween(this.sprites[1]).to({alpha: 1}, 200, Phaser.Easing.Linear.None, true, 0, 0, true);
                if (callback != undefined)
                    tween.onComplete.add(callback, this);
            }
        }

        public highlight(callback?:() => void)
        {
            if(this.sprites.length > 1)
            {
                let tween = this.game.add.tween(this.sprites[1]).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true, 0, 0, true);
                if (callback != undefined)
                    tween.onComplete.add(callback, this);
            }
        }

        public dispose()
        {
            this.group.remove(this);
        }

        public reuse()
        {
            this.group.add(this);
        }

    }
}