/** 工具类：
 *     some tool functions:
 */
class Util
{
    public static  getIndexByLineRow(row:number,column:number):number
    {
        return row*4+column;
    }

    //通过盒子中的 行和列 的值，返回盒子的坐标
    public static getPosByRect(val:Rect):egret.Point
    {
        var point:egret.Point = new egret.Point();
        point.x = 10 +val.width/2 + ( 10 + val.width )*val.column;
        point.y = 10 + val.width/2 +( 10 + val.width )*val.row;
        return point;
    }

    public static getPosByIndex(index:number):egret.Point
    {
        var point:egret.Point = new egret.Point();
        point.x = Math.floor( index / 4 );
        point.y = Math.floor( index % 4 );
        return point;
    }

}