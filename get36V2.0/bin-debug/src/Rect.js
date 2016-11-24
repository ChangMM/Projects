var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by sanxing on 2014/12/12.
 *   每个子单元对应的数字与颜色是相对应的
 *
 *
 */
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.call(this);
        this.isUsed = false; //是否使用
        this._num = 13; //数字
        this.row = 0; //行
        this.column = 0; //列
        this._type = RectType.NONCLICKED; //单元格类型，可点击与否，默认可点击
        this.touchEnabled = true;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.width = Data.getRectWidth();
        this.height = Data.getRectWidth();
        this.addEventListener(egret.Event.ADDED, this.draw, this);
        this.addEventListener(egret.Event.LEAVE_STAGE, this.rectHide, this);
    }
    //添加到显示列表
    Rect.prototype.draw = function () {
        this.scaleX = 0;
        this.scaleY = 0;
        this.alpha = 0;
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1.2, scaleY: 1.2, alpha: 1, rotation: 720 }, 200);
        tw.call(this.backToScale);
    };
    Rect.prototype.clickDraw = function () {
        if (this._type == RectType.NONCLICKED) {
            this.scaleX = 0;
            this.scaleY = 0;
            this.alpha = 0;
            this.rotation = 0;
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, rotation: 15, alpha: 1 }, 200);
        }
        else {
            this.scaleX = 0;
            this.scaleY = 0;
            this.alpha = 0;
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 }, 200);
        }
    };
    Rect.prototype.backToNoraml = function () {
        //this.scaleX = 0;
        //this.scaleY = 0;
        //this.alpha  = 0;
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 1.05, scaleY: 1.05, rotation: -20, alpha: 1 }, 20);
        tw.to({ scaleX: 1.1, scaleY: 1.1, rotation: 20, alpha: 1 }, 20);
        tw.to({ scaleX: 1.15, scaleY: 1.15, rotation: -20, alpha: 1 }, 20);
        tw.to({ scaleX: 1.2, scaleY: 1.2, rotation: 20, alpha: 1 }, 20);
        tw.to({ scaleX: 1.25, scaleY: 1.25, rotation: 0, alpha: 1 }, 20);
        tw.call(this.backToNoramlScale);
        this._type = RectType.NONCLICKED;
    };
    Object.defineProperty(Rect.prototype, "num", {
        //当期代表的数字
        get: function () {
            return this._num;
        },
        //设置当前的数字值
        set: function (value) {
            this._num = value;
            this.texture = this.textures.getTexture("num" + this._num);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (val) {
            this._type = val;
            if (this._type == RectType.CLICKED) {
                this.texture = this.textures.getTexture("num" + 2); //测试
            }
            else {
                this.texture = this.textures.getTexture("num" + 8); //测试
            }
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.onRectClick = function () {
        //if(this._type == RectType.CLICKED){
        //    this.texture = this.textures.getTexture("number"+8);//测试
        //    this._type = RectType.NONCLICKED;
        //}else{
        //    this.texture = this.textures.getTexture("number"+2);//测试
        //    this._type = RectType.CLICKED;
        //}
        this.clickDraw();
    };
    Rect.prototype.rectHide = function () {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 0, scaleY: 0, rotation: -720, alpha: 0 }, 200);
        tw.call(this.restart);
    };
    Rect.prototype.backToScale = function () {
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    Rect.prototype.backToNoramlScale = function () {
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    //重置单元格信息
    Rect.prototype.restart = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.isUsed = false;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.row = 0;
        this.column = 0;
        this._type = RectType.NONCLICKED;
    };
    return Rect;
})(egret.Bitmap);
Rect.prototype.__class__ = "Rect";
