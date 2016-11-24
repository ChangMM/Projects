/**
 * 控制游戏主逻辑
 **/

class Game extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        var rect:Rect=new Rect();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage():void
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("gameres");
    }
    public share():void {//微信分享
        WeixinApi.ready(function(api:WeixinApi){
            var info:WeixinShareInfo = new WeixinShareInfo();
            info.title = "我共消灭了"+Data.score+"对方块。所向披靡，不服来战！！！";
            //两种取数据的方法
            var desc:string = "我共消灭了"+Data.score+"对方块。所向披靡，不服来战！！！";
            info.desc = desc;
            info.link = "http://teamshare.bingyan.net/cmm/version3.0/index.html";
            info.imgUrl = "http://teamshare.bingyan.net/cmm/logo.png";

            api.shareToFriend(info);
            api.shareToTimeline(info);
        });
    }
    public share0():void {//微信分享
        WeixinApi.ready(function(api:WeixinApi){
            var info:WeixinShareInfo = new WeixinShareInfo();
            info.title = "老子就是看你不顺眼！！不服来战！！！";
            //两种取数据的方法
            var desc:string = "老子就是看你不顺眼！！不服来战！！！";
            info.desc = desc;
            info.link = "http://teamshare.bingyan.net/cmm/version3.0/index.html";
            info.imgUrl = "http://teamshare.bingyan.net/cmm/logo.png";

            api.shareToFriend(info);
            api.shareToTimeline(info);
        });
    }
    private gameView:GameView;       //游戏视图 背景层
    private gameLayout:egret.Sprite; //游戏层
    private res:egret.SpriteSheet;   //资源纹理集


    private onGroupComp(){
        this.res= RES.getRes("res_json");
        this.share0();
        this.start();
    }

    private startGamePanel:startGamePanel;
    public start()
    {
        //this._timerPanel.stop();
        if(!this.startGamePanel){
            this.startGamePanel = new startGamePanel(this.res);
            this.startGamePanel.addEventListener("start",this.startPanel,this);
        }
        this.addChild(this.startGamePanel);
    }
    public startPanel()
    {
        this.gameView = new GameView();
        this.gameView.createStaticView(this, this.res);

        this.gameLayout = new egret.Sprite();
        this.gameLayout.y = 250;
        this.addChild( this.gameLayout );

        DataManage.initData();
        this.createTimer();
        this._timerPanel.start();
        this.initRect();
    }
    public initRect()
    {
        for(var i = 0;i<4;i++){
            this.createNewRects();
        }
    }
    public updateRect()
    {
        if(DataManage._nousedata.length>=8){
            for(var i = 0;i<4;i++){
                this.createNewRects();
            }
        }else if((DataManage._nousedata.length>=4)&&(DataManage._nousedata.length<8)){
            for(var i = 0;i<2;i++){
                this.createNewRects();
            }
        }else{
            this.createNewRects();
        }
    }
    private lop:string = "1";
    public updateRect1()
    {
        for(var i=0;i<2;i++){
            if(i==1){
                this.lop="2";
            }
            this.createNewRects();
        }
    }

    public updateRect2()
    {
        this.createNewRects();
    }

    //创建一个新方块
    public createNewRects()
    {
        //寻找一个新方块
        var num1 = Math.floor(34 * Math.random())+1;
        var rect1 = DataManage.selectRect();
        this.createAnRect(this.res,rect1,num1);
        var num0 = 36 - num1;
        var rect0 = DataManage.selectRect();
        this.createAnRect(this.res,rect0,num0);
    }
    public createAnRect(res:egret.SpriteSheet,rect:Rect,num:number)
    {
        var rect = rect;
        if((rect == null)&&(this.lop=="1"))
        {//gameover
            this.gameOver();
            return ;
        }else if((rect == null)&&(this.lop=="2")){
            this.lop="1";
            return ;
        }else{
            this.lop="1";
        }
        var pos = DataManage.selectNewPos();
        //update the data of rect!
        rect.textures = res;
        rect.isUsed = true;
        rect.num=num;
        rect.row = pos.x;
        rect.column = pos.y;
        rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclickRect,this);
        var rectPostion = Util.getPosByRect(rect);
        rect.x = rectPostion.x;
        rect.y = rectPostion.y;
        this.gameLayout.addChild(rect);
        DataManage.addNewRectToDatas( rect );
    }

    private onclickRect(evt:egret.TouchEvent)
    {
        if(evt.target._type==RectType.NONCLICKED){
            Data._numSum+=evt.target.num;
            if(Data._numSum>36){
                Data._numSum=evt.target.num;
                for( var i:number=0; i<16; i++ )
                {
                    if( (DataManage._rects[i].isUsed == true)&&(DataManage._rects[i]._type == RectType.CLICKED) )
                    {
                        var rect=DataManage._rects[i];
                        rect.backToNoraml();
                    }
                }
                evt.target.onRectClick();
                evt.target._type=RectType.CLICKED;
                return null;
            }
            else if(Data._numSum==36){
                evt.target._type=RectType.CLICKED;
                for( var i:number=0; i<16; i++ )
                {
                    if( (DataManage._rects[i].isUsed == true)&&(DataManage._rects[i]._type == RectType.CLICKED) )
                    {
                        var rect=DataManage._rects[i];
                        DataManage._data[Util.getIndexByLineRow(rect.row,rect.column)] = 0;
                        rect.rectHide();
                    }
                }
                DataManage.restartData();
                Data._numSum = 0;
                Data.score++;
                GameView.updateScore();
                return null;
            }
            else if(Data._numSum<36){
                for( var i:number=0; i<16; i++ )
                {
                    if( (DataManage._rects[i].isUsed == true)&&(DataManage._rects[i]._type == RectType.CLICKED) )
                    {
                        var rect=DataManage._rects[i];
                        rect.backToNoraml();
                    }
                }
                evt.target.onRectClick();
                evt.target._type=RectType.CLICKED;
                return null;
            }
        }else{
            evt.target.onRectClick();
            Data._numSum-=evt.target.num;
            evt.target._type=RectType.NONCLICKED;
        }
   }

    private _timerPanel:TimerPanel;
    private createTimer()
    {
        this._timerPanel=new TimerPanel();
        this._timerPanel.addEventListener("updateRect",this.updateRect,this);
        this._timerPanel.addEventListener("updateRect1",this.updateRect1,this);
        this._timerPanel.addEventListener("updateRect2",this.updateRect2,this);
        this._timerPanel.addEventListener("gameover",this.gameOver,this);
        this.addChild(this._timerPanel);
    }

    private gameoverPanel:gameOverPanel;
    private gameOver()
    {
        this._timerPanel.stop();
        if(!this.gameoverPanel){
            this.gameoverPanel = new gameOverPanel(this.res);
            this.gameoverPanel.addEventListener("startgame",this.startGame,this);
        }
        this.addChild(this.gameoverPanel);
        this.share();
    }

    private startGame()
    {
        DataManage.Restart();
        this._timerPanel.start();
        this.initRect();
    }
}