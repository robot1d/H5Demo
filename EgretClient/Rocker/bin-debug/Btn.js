/**
 *
 * @author
 *
 */
var Btn = (function (_super) {
    __extends(Btn, _super);
    function Btn(content) {
        _super.call(this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleasedOutside, this);
        this._bmd = new egret.Bitmap(RES.getRes("btn_normal"));
        this.addChild(this._bmd);
        var tf = new egret.TextField();
        tf.width = 104;
        tf.height = 50;
        tf.text = content;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(tf);
    }
    var d = __define,c=Btn;p=c.prototype;
    p.onTouchBegan = function (evt) {
        this._bmd.texture = RES.getRes("btn_down");
    };
    p.onTouchEnded = function (evt) {
        this._bmd.texture = RES.getRes("btn_normal");
    };
    p.onTouchReleasedOutside = function (evt) {
        this._bmd.texture = RES.getRes("btn_normal");
    };
    return Btn;
})(egret.DisplayObjectContainer);
egret.registerClass(Btn,"Btn");
