class GameView extends egret.EventDispatcher
{
    //创建全局静态界面
    public createStaticView(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet):void
    {
        this.createGameBackground( rootLayout );
        this.createTitleBack( rootLayout, res );
        this.createScore(rootLayout,res);
        //this.createRectBackground( rootLayout, res );
    }

    //game background
    private createGameBackground(rootLayout:egret.DisplayObjectContainer)
    {
        var gameBackground:egret.Bitmap= new egret.Bitmap();
        gameBackground.texture = RES.getRes("bgImage");
        rootLayout.addChild(gameBackground);
    }

    //title background
    private createTitleBack(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet):void
    {
       var topbar:egret.Bitmap = new egret.Bitmap();
        topbar.texture = RES.getRes("topImage");
        topbar.width = Data.getStageWidth();
        topbar.height = 80;
        rootLayout.addChild(topbar);
    }

    public static score:egret.TextField;
    private createScore(rootLayout:egret.DisplayObjectContainer,res:egret.SpriteSheet)
    {
        var scoreBar:egret.Bitmap = new egret.Bitmap();
        //var timeBar:egret.Bitmap = new egret.Bitmap();
        scoreBar.texture = RES.getRes("btnImage");
        //timeBar.texture = res.getTexture("btnbg");
       // scoreBar.width = (Data.getStageWidth()-140)/2;
        //timeBar.width = (Data.getStageWidth()-140)/2;
        //scoreBar.height = 80;
       // timeBar.height = 80;
        scoreBar.x = Data.getStageWidth()-300;
        scoreBar.y = 130;
       // timeBar.x =scoreBar.width+110;
       // timeBar.y = 130;

        GameView.score = new egret.TextField();
        GameView.score.width = 300;
        GameView.score.height = 60;
        GameView.score.y=130;
        GameView.score.x= Data.getStageWidth()-300;
        GameView.score.textColor= 0xffffff;
        GameView.score.textAlign =egret.HorizontalAlign.CENTER;
        GameView.score.verticalAlign =egret.VerticalAlign.MIDDLE;
        GameView.score.text="score:0";

        rootLayout.addChild(scoreBar);
       // rootLayout.addChild(timeBar);
        rootLayout.addChild(GameView.score);
    }
    public static updateScore(){
        GameView.score.text= "score:"+Data.score;
    }
}