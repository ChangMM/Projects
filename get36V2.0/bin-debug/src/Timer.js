var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by sanxing on 2014/12/12.
 */
var TimerPanel = (function (_super) {
    __extends(TimerPanel, _super);
    function TimerPanel() {
        _super.call(this);
        this._num = 50000;
        this._timers = 0;
        this.draw();
        this.createTimer();
    }
    TimerPanel.prototype.draw = function () {
        this.txt = new egret.TextField();
        this.txt.width = (Data.getStageWidth() - 140) / 2;
        this.txt.height = 80;
        this.txt.y = 130;
        this.txt.x = (Data.getStageWidth() - 140) / 2 + 110;
        this.txt.textColor = 0xffffff;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.txt.text = "time:30'00''";
        //this.addChild(this.txt);
    };
    TimerPanel.prototype.createTimer = function () {
        this._timer = new egret.Timer(100, this._num);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerEnd, this);
    };
    TimerPanel.prototype.onTimer = function () {
        //if((this._timers%3)==0){
        //    this.dispatchEventWith("updateRect");
        //}
        if ((this._timers != 0) && (this._timers % 12 == 0) && (this._timers < 120)) {
            this.dispatchEventWith("updateRect2");
        }
        else if ((this._timers >= 120) && (this._timers < 240) && (this._timers % 8 == 0)) {
            if (this._timers % 32 == 0) {
                this.dispatchEventWith("updateRect1");
            }
            else {
                this.dispatchEventWith("updateRect2");
            }
        }
        else if ((this._timers >= 240) && (this._timers % 5 == 0)) {
            if (this._timers % 20 == 0) {
                this.dispatchEventWith("updateRect1");
            }
            else {
                this.dispatchEventWith("updateRect2");
            }
        }
        this._timers += 1;
        //this.txt.text ="time:"+this._timers+"'00''";
    };
    TimerPanel.prototype.onTimerEnd = function () {
        //this.txt.text ="time:00'00''";
        this.dispatchEventWith("gameover");
    };
    TimerPanel.prototype.start = function () {
        //this.txt.text="time:50'00''";
        this._timers = 0;
        this._timer.reset();
        this._timer.start();
    };
    TimerPanel.prototype.stop = function () {
        this._timer.stop();
    };
    return TimerPanel;
})(egret.Sprite);
TimerPanel.prototype.__class__ = "TimerPanel";
