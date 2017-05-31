module WheelOfFortune
{
    export enum BackDropGraphicType{
        Spin,
        Spinning,
        Bankrupt,
        LoseATurn,
        BigWin
    }

    interface BackDropGraphicMap {
        [type:number]: BackDropGraphic;
    }

    export class BackDropFactory
    {
        private map: BackDropGraphicMap = {  };
        private group: Phaser.Group;

        constructor(group: Phaser.Group)
        {
            this.group = group;
        }

        public getBackDropGraphic(type:BackDropGraphicType): BackDropGraphic
        {
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
            switch(type){
                case BackDropGraphicType.Spin :
                    return new SpinBackDropGraphic(this.group.game, this.group, ['spin_bdg','spin_hl']);
                    //this.map[type] = new SpinBackDropGraphic(this.group.game, this.group, ['spin_bdg','spin_hl']);
                    //return this.getBackDropGraphic(type);
                case BackDropGraphicType.BigWin :
                    return new BigWinDropGraphic(this.group.game, this.group, ['bigWin']);
                    //this.map[type] = new BigWinDropGraphic(this.group.game, this.group, ['bigWin']);
                    //return this.getBackDropGraphic(type);





                default:
                    return new SpinBackDropGraphic(this.group.game, this.group, ['spin_bdg','spin_hl']);
                    //this.map[type] = new SpinBackDropGraphic(this.group.game, this.group, ['spin_bdg','spin_hl']);
                    //return this.getBackDropGraphic(type);

                /*
                case BackDropType.GoodLuck :

                    break;
                case BackDropType.Bankrupt :

                    break;
                case BackDropType.LoseATurn :

                    break;
                case BackDropType.BigWin :

                    break;
                */
            }
        }
    }
}