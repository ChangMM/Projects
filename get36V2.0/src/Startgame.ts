/**
 * Created by sanxing on 2014/12/13.
 */
class startGamePanel extends egret.Sprite
{
    public  constructor(res:egret.SpriteSheet)
    {
        super();
        this.draw(res);
        this.createA(res);
    }

    private btn:egret.Bitmap = new egret.Bitmap();
    private a_img:A;
    private txt1:egret.TextField = new egret.TextField();
    private txt2:egret.TextField = new egret.TextField();

    private draw(res:egret.SpriteSheet) {
        var w = Data.getStageWidth();
        var h = Data.getStageHeight();

        var bg:egret.Bitmap = new egret.Bitmap();
        bg.texture = RES.getRes("bgImage");
        this.addChild(bg);

        var logo:egret.Bitmap = new egret.Bitmap();
        logo.texture = res.getTexture("logo");
        logo.width = w;
        logo.height = w;
        logo.y=10;
        this.addChild(logo);

        this.txt1.height=60;
        this.txt1.width=Data.getStageWidth();
        this.txt1.text="点击和为36的两个方块来消除";
        this.txt1.textAlign = egret.HorizontalAlign.CENTER;
        this.txt1.y=w+40;
        this.txt1.x=0;
        this.txt1.textColor=0x30c0e5;
        this.txt2.textColor=0x30c0e5;
        this.txt2.height=60;
        this.txt2.width=Data.getStageWidth();
        this.txt2.text="方块铺满了就输掉了噢";
        this.txt2.y=w+100;
        this.txt2.x=0;
        this.txt2.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txt1);
        this.addChild(this.txt2);

        this.btn.texture = res.getTexture("pl_y");
        this.btn.width = 330;
        this.btn.height = 82;
        this.btn.x = (w-330)/2;
        this.btn.y = w+180;
        this.btn.touchEnabled = true;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
        this.addChild(this.btn);

    }
    private createA(res:egret.SpriteSheet)
    {
        this.a_img = new A(res);
        this.a_img.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick,this);
        this.addChild(this.a_img);
    }
    private onclick(evt:egret.TouchEvent)
    {
        evt.target.clickA();
        this.dispatchEventWith("start");
        this.parent.removeChild(this);
    }


    private startGame()
    {
        this.dispatchEventWith("start");
        this.parent.removeChild(this);
    }

}