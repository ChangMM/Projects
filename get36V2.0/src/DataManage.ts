/**
 * Created by sanxing on 2014/12/12.
 */

class DataManage
{
    public static _rects:Array<any> = [];       //所有的盒子
    public static _data:Array<any> = [];        //所有的数据
    public static _nousedata:Array<any> = [];   //未使用的数据


    public static initData():void
    {
        //for(var i:number=0; i<16; i++)
        //{
        //    DataManage._data[i] = 0;
        //    DataManage._nousedata[i] = i;
        //}
        var rect:Rect;
        for(var i:number=0; i<16; i++)
        {
            rect = new Rect();
            DataManage._rects[i] = rect;
            DataManage._data[i] = 0;
            DataManage._nousedata[i] = i;
        }
    }

    //找一个未使用的方块
    public static selectRect():Rect
    {
        for( var i:number=0; i<16; i++ )
        {
            if( DataManage._rects[i].isUsed == false )
            {
                return DataManage._rects[i];
            }
        }
        return null;
    }

    //添加一个新的方块
    public static  addNewRectToDatas(rect:Rect)
    {
        var index:number = Util.getIndexByLineRow( rect.row, rect.column );
        DataManage._data[index] = rect;
        DataManage.restartData();

    }

    //选择一个新的方块
    public static  selectNewPos():egret.Point
    {
        var index:number = DataManage._nousedata[ Math.floor(DataManage._nousedata.length * Math.random()) ];
        return Util.getPosByIndex(index);
    }

    //重置所有方块
    public static restartData()
    {
        DataManage._nousedata = [];
        for( var i:number=0; i<16; i++)
        {
            if(DataManage._data[i]==0)
            {
                DataManage._nousedata.push(i);
            }
        }
    }

    //重新开始游戏
    public static Restart()
    {
        for(var i:number=0; i<16; i++)
        {
            DataManage._data[i] = 0;
            DataManage._rects[i].restart();
        }
        this.restartData();
        Data.score=0;
        Data._numSum=0;
        GameView.updateScore();
    }

}