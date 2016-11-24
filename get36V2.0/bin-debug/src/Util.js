/** 工具类：
 *     some tool functions:
 */
var Util = (function () {
    function Util() {
    }
    Util.getIndexByLineRow = function (row, column) {
        return row * 4 + column;
    };
    //通过盒子中的 行和列 的值，返回盒子的坐标
    Util.getPosByRect = function (val) {
        var point = new egret.Point();
        point.x = 10 + val.width / 2 + (10 + val.width) * val.column;
        point.y = 10 + val.width / 2 + (10 + val.width) * val.row;
        return point;
    };
    Util.getPosByIndex = function (index) {
        var point = new egret.Point();
        point.x = Math.floor(index / 4);
        point.y = Math.floor(index % 4);
        return point;
    };
    return Util;
})();
Util.prototype.__class__ = "Util";
