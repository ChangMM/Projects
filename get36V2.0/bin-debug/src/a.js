var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function (_super) {
    __extends(A, _super);
    function A(res) {
        _super.call(this);
        this.texture = res.getTexture("a");
        this.width = 82;
        this.height = 82;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.x = (Data.getStageWidth() - 330) / 2 + 215;
        this.y = Data.getStageWidth() + 201;
        this.touchEnabled = true;
        this.addEventListener(egret.Event.ADDED, this.draw, this);
    }
    //添加到显示列表
    A.prototype.draw = function () {
        this.scaleX = 0;
        this.scaleY = 0;
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 0.5, scaleY: 0.5, rotation: 0 }, 400);
        tw.to({ scaleX: 1.2, scaleY: 1.2, rotation: 735 }, 200);
        tw.call(this.backToScale);
    };
    A.prototype.backToScale = function () {
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    A.prototype.clickA = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1.05, scaleY: 1.05, rotation: -30, alpha: 1 }, 50);
        tw.to({ scaleX: 1.1, scaleY: 1.1, rotation: 30, alpha: 1 }, 50);
        tw.to({ scaleX: 1.15, scaleY: 1.15, rotation: -30, alpha: 1 }, 50);
        tw.to({ scaleX: 1.2, scaleY: 1.2, rotation: 30, alpha: 1 }, 50);
        tw.to({ scaleX: 1.25, scaleY: 1.25, rotation: 0, alpha: 1 }, 50);
    };
    return A;
})(egret.Bitmap);
A.prototype.__class__ = "A";
