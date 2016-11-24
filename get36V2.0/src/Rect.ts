/**
 * Created by sanxing on 2014/12/12.
 *   每个子单元对应的数字与颜色是相对应的
 *
 *
 */
class Rect extends egret.Bitmap
{
    public isUsed:boolean= false; //是否使用
    public _num:number   = 13;       //数字
    public row:number    = 0;         //行
    public column:number = 0;      //列
    public _type:string  = RectType.NONCLICKED;//单元格类型，可点击与否，默认可点击
    public textures:egret.SpriteSheet;

    public constructor()
    {
        super();
        this.touchEnabled = true;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.width = Data.getRectWidth();
        this.height = Data.getRectWidth();
        this.addEventListener(egret.Event.ADDED, this.draw, this);
        this.addEventListener(egret.Event.LEAVE_STAGE, this.rectHide, this);
    }

    //添加到显示列表
    private draw()
    {
        this.scaleX = 0;
        this.scaleY = 0;
        this.alpha  = 0;
        var tw=egret.Tween.get(this);
        tw.to({scaleX:1.2,scaleY:1.2,alpha:1,rotation:720},200);
        tw.call(this.backToScale);
    }
    private clickDraw()
    {
        if(this._type==RectType.NONCLICKED)
        {
            this.scaleX = 0;
            this.scaleY = 0;
            this.alpha  = 0;
            this.rotation = 0;
            egret.Tween.get(this).to({scaleX:1,scaleY:1,rotation:15,alpha:1},200);
        }else{
            this.scaleX = 0;
            this.scaleY = 0;
            this.alpha  = 0;
            egret.Tween.get(this).to({scaleX:1,scaleY:1,rotation:0,alpha:1},200);
        }
    }

    public backToNoraml()
    {
        //this.scaleX = 0;
        //this.scaleY = 0;
        //this.alpha  = 0;
        var tw = egret.Tween.get(this);
        tw.to({scaleX:1.05,scaleY:1.05,rotation:-20,alpha:1},20);
        tw.to({scaleX:1.1,scaleY:1.1,rotation:20,alpha:1},20);
        tw.to({scaleX:1.15,scaleY:1.15,rotation:-20,alpha:1},20);
        tw.to({scaleX:1.2,scaleY:1.2,rotation:20,alpha:1},20);
        tw.to({scaleX:1.25,scaleY:1.25,rotation:0,alpha:1},20);
        tw.call(this.backToNoramlScale);
        this._type = RectType.NONCLICKED;
    }

    //当期代表的数字
    public get num():number {
        return this._num;
    }

    //设置当前的数字值
    public set num(value:number)
    {
        this._num = value;
        this.texture = this.textures.getTexture("num"+this._num);
    }


    public get type():string
    {
        return this._type;
    }
    public set type(val:string)
    {
        this._type = val;
        if(this._type == RectType.CLICKED){
            this.texture = this.textures.getTexture("num"+2);//测试
        }else{
            this.texture = this.textures.getTexture("num"+8);//测试
        }
        this.draw();
    }

    public onRectClick()
    {
        //if(this._type == RectType.CLICKED){
        //    this.texture = this.textures.getTexture("number"+8);//测试
        //    this._type = RectType.NONCLICKED;
        //}else{
        //    this.texture = this.textures.getTexture("number"+2);//测试
        //    this._type = RectType.CLICKED;
        //}
        this.clickDraw();
    }

    public rectHide()
    {
        var tw = egret.Tween.get(this);
        tw.to({scaleX:0,scaleY:0,rotation:-720,alpha:0},200);
        tw.call(this.restart);
    }

    public backToScale()
    {
        egret.Tween.get(this).to({scaleX:1,scaleY:1},200);
    }
    public backToNoramlScale()
    {
        egret.Tween.get(this).to({scaleX:1,scaleY:1},100);
    }


    //重置单元格信息
    public restart()
    {
        if(this.parent)
        {
            this.parent.removeChild( this );
        }
        this.isUsed = false;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.row = 0;
        this.column = 0;
        this._type = RectType.NONCLICKED;
    }
}