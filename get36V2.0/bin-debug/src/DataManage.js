/**
 * Created by sanxing on 2014/12/12.
 */
var DataManage = (function () {
    function DataManage() {
    }
    DataManage.initData = function () {
        //for(var i:number=0; i<16; i++)
        //{
        //    DataManage._data[i] = 0;
        //    DataManage._nousedata[i] = i;
        //}
        var rect;
        for (var i = 0; i < 16; i++) {
            rect = new Rect();
            DataManage._rects[i] = rect;
            DataManage._data[i] = 0;
            DataManage._nousedata[i] = i;
        }
    };
    //找一个未使用的方块
    DataManage.selectRect = function () {
        for (var i = 0; i < 16; i++) {
            if (DataManage._rects[i].isUsed == false) {
                return DataManage._rects[i];
            }
        }
        return null;
    };
    //添加一个新的方块
    DataManage.addNewRectToDatas = function (rect) {
        var index = Util.getIndexByLineRow(rect.row, rect.column);
        DataManage._data[index] = rect;
        DataManage.restartData();
    };
    //选择一个新的方块
    DataManage.selectNewPos = function () {
        var index = DataManage._nousedata[Math.floor(DataManage._nousedata.length * Math.random())];
        return Util.getPosByIndex(index);
    };
    //重置所有方块
    DataManage.restartData = function () {
        DataManage._nousedata = [];
        for (var i = 0; i < 16; i++) {
            if (DataManage._data[i] == 0) {
                DataManage._nousedata.push(i);
            }
        }
    };
    //重新开始游戏
    DataManage.Restart = function () {
        for (var i = 0; i < 16; i++) {
            DataManage._data[i] = 0;
            DataManage._rects[i].restart();
        }
        this.restartData();
        Data.score = 0;
        Data._numSum = 0;
        GameView.updateScore();
    };
    DataManage._rects = []; //所有的盒子
    DataManage._data = []; //所有的数据
    DataManage._nousedata = []; //未使用的数据
    return DataManage;
})();
DataManage.prototype.__class__ = "DataManage";
