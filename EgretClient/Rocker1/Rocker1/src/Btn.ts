/**
 *
 * @author 
 *
 */
class Btn extends egret.DisplayObjectContainer {

    private _bmd: egret.Bitmap;
    
    private _isPressed: boolean = false;

    public constructor(resName: string) {
        super();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleasedOutside, this);

        this._bmd = new egret.Bitmap(RES.getRes(resName));
        this.addChild(this._bmd);
    }

    private onTouchBegan(evt: egret.TouchEvent) {
        this._isPressed = true;
        this.dispatchEvent(new egret.Event("pressed"));
    }

    private onTouchEnded(evt: egret.TouchEvent) {
        if(this._isPressed){
            this._isPressed = false;
            this.dispatchEvent(new egret.Event("released"));
        }
    }

    private onTouchReleasedOutside(evt: egret.TouchEvent) {
        if(this._isPressed) {
            this._isPressed = false;
            this.dispatchEvent(new egret.Event("releasedOut"));
        }        
    }
}
