/**
 * Created by mebius on 14-7-22.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStage, this);
    }
    Game.prototype.onAddStage = function () {
        egret.Profiler.getInstance().run();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("gameres");
    };
    //加载完成
    Game.prototype.onGroupComp = function () {
        //生成纹理集
        this.res = RES.getRes("res_json");
        //创建游戏静态界面
        this.gameView = new GameView();
        this.gameView.createStaticView(this, this.res);
        this.gameView.addEventListener("gameRestart", this.onRestart, this);
        //创建游戏层
        this.gameLayout = new egret.Sprite();
        this.gameLayout.y = 105;
        this.addChild(this.gameLayout);
        //计时器
        this._time = new egret.Timer(110, 1);
        this._time.addEventListener(egret.TimerEvent.TIMER, this.onTimerComplete, this);
        //初始化游戏数据
        DataManage.createAllRect(this.res);
        //创建两个新方块
        this.createNewRect();
        this.createNewRect();
        //添加事件管理
        this.eventManage = new EventManage();
        this.eventManage.addEvent();
        this.eventManage.addEventListener("keyDowns", this.keyDowns, this);
    };
    //创建一个新方块
    Game.prototype.createNewRect = function () {
        //寻找一个未使用的位置
        var pos = DataManage.selectNewPos();
        //寻找一个新方块
        var rect = DataManage.selectNewRect();
        //更新盒子的状态
        rect.isUsed = true;
        rect.num = 2;
        rect.row = pos.x;
        rect.column = pos.y;
        var rectpost = Util.getPosByRect(rect);
        rect.x = rectpost.x;
        rect.y = rectpost.y;
        DataManage.addNewRectToDatas(rect);
        this.gameLayout.addChild(rect);
    };
    //键盘按下，或者移动事件发生
    Game.prototype.keyDowns = function () {
        this.gameView.updateScrore();
        //判断是否游戏结束
        if (DataManage.isGameOver()) {
            console.log("游戏结束"); //弹出结束面板
            this.gameView.showGameOverLayout();
        }
        else {
            this._time.start();
        }
    };
    //计时器完成
    Game.prototype.onTimerComplete = function () {
        DataManage.isRunning = true;
        if (DataManage._nousedata.length != 0 && DataManage.isHaveMoveRect == true) {
            DataManage.isHaveMoveRect = false;
            this.createNewRect();
        }
    };
    //重新开始游戏
    Game.prototype.onRestart = function () {
        this.gameView.updateScrore();
        this.createNewRect();
        this.createNewRect();
    };
    return Game;
})(egret.DisplayObjectContainer);
//# sourceMappingURL=Game.js.map