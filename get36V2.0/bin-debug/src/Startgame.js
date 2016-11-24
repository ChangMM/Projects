var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by sanxing on 2014/12/13.
 */
var startGamePanel = (function (_super) {
    __extends(startGamePanel, _super);
    function startGamePanel(res) {
        _super.call(this);
        this.btn = new egret.Bitmap();
        this.txt1 = new egret.TextField();
        this.txt2 = new egret.TextField();
        this.draw(res);
        this.createA(res);
    }
    startGamePanel.prototype.draw = function (res) {
        var w = Data.getStageWidth();
        var h = Data.getStageHeight();
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("bgImage");
        this.addChild(bg);
        var logo = new egret.Bitmap();
        logo.texture = res.getTexture("logo");
        logo.width = w;
        logo.height = w;
        logo.y = 10;
        this.addChild(logo);
        this.txt1.height = 60;
        this.txt1.width = Data.getStageWidth();
        this.txt1.text = "点击和为36的两个方块来消除";
        this.txt1.textAlign = egret.HorizontalAlign.CENTER;
        this.txt1.y = w + 40;
        this.txt1.x = 0;
        this.txt1.textColor = 0x30c0e5;
        this.txt2.textColor = 0x30c0e5;
        this.txt2.height = 60;
        this.txt2.width = Data.getStageWidth();
        this.txt2.text = "方块铺满了就输掉了噢";
        this.txt2.y = w + 100;
        this.txt2.x = 0;
        this.txt2.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txt1);
        this.addChild(this.txt2);
        this.btn.texture = res.getTexture("pl_y");
        this.btn.width = 330;
        this.btn.height = 82;
        this.btn.x = (w - 330) / 2;
        this.btn.y = w + 180;
        this.btn.touchEnabled = true;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.addChild(this.btn);
    };
    startGamePanel.prototype.createA = function (res) {
        this.a_img = new A(res);
        this.a_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        this.addChild(this.a_img);
    };
    startGamePanel.prototype.onclick = function (evt) {
        evt.target.clickA();
        this.dispatchEventWith("start");
        this.parent.removeChild(this);
    };
    startGamePanel.prototype.startGame = function () {
        this.dispatchEventWith("start");
        this.parent.removeChild(this);
    };
    return startGamePanel;
})(egret.Sprite);
startGamePanel.prototype.__class__ = "startGamePanel";
