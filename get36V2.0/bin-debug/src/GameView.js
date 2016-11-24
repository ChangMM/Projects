var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.apply(this, arguments);
    }
    //创建全局静态界面
    GameView.prototype.createStaticView = function (rootLayout, res) {
        this.createGameBackground(rootLayout);
        this.createTitleBack(rootLayout, res);
        this.createScore(rootLayout, res);
        //this.createRectBackground( rootLayout, res );
    };
    //game background
    GameView.prototype.createGameBackground = function (rootLayout) {
        var gameBackground = new egret.Bitmap();
        gameBackground.texture = RES.getRes("bgImage");
        rootLayout.addChild(gameBackground);
    };
    //title background
    GameView.prototype.createTitleBack = function (rootLayout, res) {
        var topbar = new egret.Bitmap();
        topbar.texture = RES.getRes("topImage");
        topbar.width = Data.getStageWidth();
        topbar.height = 80;
        rootLayout.addChild(topbar);
    };
    GameView.prototype.createScore = function (rootLayout, res) {
        var scoreBar = new egret.Bitmap();
        //var timeBar:egret.Bitmap = new egret.Bitmap();
        scoreBar.texture = RES.getRes("btnImage");
        //timeBar.texture = res.getTexture("btnbg");
        // scoreBar.width = (Data.getStageWidth()-140)/2;
        //timeBar.width = (Data.getStageWidth()-140)/2;
        //scoreBar.height = 80;
        // timeBar.height = 80;
        scoreBar.x = Data.getStageWidth() - 300;
        scoreBar.y = 130;
        // timeBar.x =scoreBar.width+110;
        // timeBar.y = 130;
        GameView.score = new egret.TextField();
        GameView.score.width = 300;
        GameView.score.height = 60;
        GameView.score.y = 130;
        GameView.score.x = Data.getStageWidth() - 300;
        GameView.score.textColor = 0xffffff;
        GameView.score.textAlign = egret.HorizontalAlign.CENTER;
        GameView.score.verticalAlign = egret.VerticalAlign.MIDDLE;
        GameView.score.text = "score:0";
        rootLayout.addChild(scoreBar);
        // rootLayout.addChild(timeBar);
        rootLayout.addChild(GameView.score);
    };
    GameView.updateScore = function () {
        GameView.score.text = "score:" + Data.score;
    };
    return GameView;
})(egret.EventDispatcher);
GameView.prototype.__class__ = "GameView";
