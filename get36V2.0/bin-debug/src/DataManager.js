/**
 * Created by sanxing on 2014/12/12.
 */
var DataManage = (function () {
    function DataManage() {
    }
    DataManage.initData = function () {
        for (var i = 0; i < 16; i++) {
            DataManage._data[i] = 0;
            DataManage._nousedata[i] = i;
        }
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
        for (var i = 1; i < 16; i++) {
            if (DataManage._data[i] == 0) {
                DataManage._nousedata.push(i);
            }
        }
    };
    DataManage._data = []; //所有的数据
    DataManage._nousedata = []; //未使用的数据
    return DataManage;
})();
DataManage.prototype.__class__ = "DataManage";
