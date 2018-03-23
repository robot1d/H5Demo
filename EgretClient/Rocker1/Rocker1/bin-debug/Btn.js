/**
 *
 * @author
 *
 */
var Btn = (function (_super) {
    __extends(Btn, _super);
    function Btn(resName) {
        _super.call(this);
        this._isPressed = false;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleasedOutside, this);
        this._bmd = new egret.Bitmap(RES.getRes(resName));
        this.addChild(this._bmd);
    }
    var d = __define,c=Btn;p=c.prototype;
    p.onTouchBegan = function (evt) {
        this._isPressed = true;
        this.dispatchEvent(new egret.Event("pressed"));
    };
    p.onTouchEnded = function (evt) {
        if (this._isPressed) {
            this._isPressed = false;
            this.dispatchEvent(new egret.Event("released"));
        }
    };
    p.onTouchReleasedOutside = function (evt) {
        if (this._isPressed) {
            this._isPressed = false;
            this.dispatchEvent(new egret.Event("releasedOut"));
        }
    };
    return Btn;
})(egret.DisplayObjectContainer);
egret.registerClass(Btn,"Btn");
