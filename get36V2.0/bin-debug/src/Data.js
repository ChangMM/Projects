/**
 * 用于储存游戏中的各种数据
 *  static function:
 *      getStageHeight:返回舞台的宽度
 *      getRectWidth  :每个单元格的宽度
 *
 **/
var Data = (function () {
    function Data() {
    }
    Data.getRectWidth = function () {
        if (Data._rectWidth == 0) {
            Data._rectWidth = (egret.MainContext.instance.stage.stageWidth - 50) / 4;
        }
        return Data._rectWidth;
    };
    Data.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    Data.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    Data.score = 0;
    Data._rectWidth = 0;
    Data._numSum = 0;
    return Data;
})();
Data.prototype.__class__ = "Data";
