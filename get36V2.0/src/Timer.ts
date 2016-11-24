/**
 * Created by sanxing on 2014/12/12.
 */
class TimerPanel extends  egret.Sprite
{
    public constructor()
    {
        super();
        this.draw();
        this.createTimer();
    }

    private txt:egret.TextField;
    private draw()
    {
        this.txt = new egret.TextField();
        this.txt.width = (Data.getStageWidth()-140)/2;
        this.txt.height = 80;
        this.txt.y=130;
        this.txt.x= (Data.getStageWidth()-140)/2+110;
        this.txt.textColor= 0xffffff;
        this.txt.textAlign =egret.HorizontalAlign.CENTER;
        this.txt.verticalAlign =egret.VerticalAlign.MIDDLE;
        this.txt.text="time:30'00''";
        //this.addChild(this.txt);
    }

    private _timer:egret.Timer;
    private _num = 50000;
    private createTimer()
    {
        this._timer = new egret.Timer(100,this._num);
        this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerEnd,this);
    }

    private _timers = 0;
    private onTimer()
    {
        //if((this._timers%3)==0){
        //    this.dispatchEventWith("updateRect");
        //}
        if((this._timers!=0)&&(this._timers%12==0)&&(this._timers<120)){
            this.dispatchEventWith("updateRect2");
        }
        else if((this._timers>=120)&&(this._timers<240)&&(this._timers%8==0)){
            if(this._timers%32==0){
                this.dispatchEventWith("updateRect1");
            }else{
                this.dispatchEventWith("updateRect2");
            }
        }else if((this._timers>=240)&&(this._timers%5==0)){
            if(this._timers%20==0){
                this.dispatchEventWith("updateRect1");
            }else{
                this.dispatchEventWith("updateRect2");
            }
        }
        this._timers+=1;
        //this.txt.text ="time:"+this._timers+"'00''";
    }

    private onTimerEnd()
    {
        //this.txt.text ="time:00'00''";
        this.dispatchEventWith("gameover");
    }

    public start()
    {
        //this.txt.text="time:50'00''";
        this._timers = 0;
        this._timer.reset();
        this._timer.start();
    }
    public stop()
    {
        this._timer.stop();
    }
}