var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by sanxing on 2014/12/12.
 */
var gameOverPanel = (function (_super) {
    __extends(gameOverPanel, _super);
    function gameOverPanel(res) {
        _super.call(this);
        this.scorePanel = new egret.Bitmap();
        this.sharePanel = new egret.Bitmap();
        this.againPanel = new egret.Bitmap();
        this.res = res;
        this.draw();
        this.addEventListener(egret.Event.ADDED, this.showText, this);
    }
    gameOverPanel.prototype.draw = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        var overPanel = new egret.Bitmap();
        overPanel.height = h;
        overPanel.width = w;
        overPanel.texture = RES.getRes("overbg");
        this.addChild(overPanel);
        this.sharePanel.x = w - 250;
        this.sharePanel.y = 10;
        this.scorePanel.width = w - 100;
        this.scorePanel.height = w - 100;
        this.scorePanel.x = 50;
        this.scorePanel.y = (h - w + 100) / 2;
        this.againPanel.width = 320;
        this.againPanel.height = 80;
        this.againPanel.x = (w - 320) / 2;
        this.againPanel.y = (h - w) / 2 + w;
        this.againPanel.touchEnabled = true;
        this.sharePanel.touchEnabled = true;
        this.addChild(this.sharePanel);
        this.addChild(this.scorePanel);
        this.addChild(this.againPanel);
        this.txt1 = new egret.TextField();
        this.txt1.x = 60;
        this.txt1.y = h / 2 + 40;
        this.txt1.width = w - 120;
        this.txt1.height = 40;
        this.txt1.textColor = 0x000000;
        this.txt1.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txt1);
        this.txt2 = new egret.TextField();
        this.txt2.x = 60;
        this.txt2.y = h / 2 + 100;
        this.txt2.width = w - 120;
        this.txt2.height = 40;
        this.txt2.textColor = 0x000000;
        this.txt2.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txt2);
        this.againPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.sharePanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
        this.scaleX = 0;
        this.scaleY = 0;
        this.alpha = 0;
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400);
    };
    gameOverPanel.prototype.showText = function () {
        this.txt1.text = "你共算出了" + Data.score + "个36";
        if (Data.score < 25) {
            this.txt2.text = "小学数学老师哭晕在厕所";
            this.scorePanel.texture = this.res.getTexture("result4");
            this.sharePanel.texture = this.res.getTexture("share4");
            this.againPanel.texture = this.res.getTexture("again4");
        }
        else if ((Data.score >= 25) && (Data.score < 35)) {
            this.txt2.text = "就比小学生强一丢丢";
            this.scorePanel.texture = this.res.getTexture("result3");
            this.sharePanel.texture = this.res.getTexture("share3");
            this.againPanel.texture = this.res.getTexture("again3");
        }
        else if ((Data.score >= 35) && (Data.score < 45)) {
            this.txt2.text = "总算没辜负老师的栽培";
            this.scorePanel.texture = this.res.getTexture("result2");
            this.sharePanel.texture = this.res.getTexture("share2");
            this.againPanel.texture = this.res.getTexture("again2");
        }
        else if (Data.score >= 45) {
            this.txt2.text = "高考状元就是你！";
            this.scorePanel.texture = this.res.getTexture("result1");
            this.sharePanel.texture = this.res.getTexture("share1");
            this.againPanel.texture = this.res.getTexture("again1");
        }
    };
    gameOverPanel.prototype.startGame = function () {
        this.parent.removeChild(this);
        this.dispatchEventWith("startgame");
    };
    gameOverPanel.prototype.share = function () {
        console.log("分享游戏");
    };
    return gameOverPanel;
})(egret.Sprite);
gameOverPanel.prototype.__class__ = "gameOverPanel";
