/**
 * 用于储存游戏中的各种数据
 *  static function:
 *      getStageHeight:返回舞台的宽度
 *      getRectWidth  :每个单元格的宽度
 *
 **/
class Data
{
    public static score:number = 0;
    private static _rectWidth:number = 0;
    public static _numSum:number = 0;


    public static getRectWidth():number
    {
        if(Data._rectWidth == 0)
        {
            Data._rectWidth = (egret.MainContext.instance.stage.stageWidth-50)/4;
        }
        return Data._rectWidth;
    }

    public static getStageHeight():number
    {
        return egret.MainContext.instance.stage.stageHeight;
    }
    public static getStageWidth():number
    {
        return egret.MainContext.instance.stage.stageWidth;
    }
}