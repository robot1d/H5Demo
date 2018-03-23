/**
 *
 * @author 
 *
 */
class Btn extends egret.DisplayObjectContainer {
    
    private _bmd: egret.Bitmap;
    
	public constructor(content:string) {
        super();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleasedOutside, this);
        
        this._bmd = new egret.Bitmap(RES.getRes("btn_normal"));
        this.addChild(this._bmd);
        
        var tf: egret.TextField = new egret.TextField();
        tf.width = 104; tf.height = 50;
        tf.text = content;
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(tf);
	}
	
    private onTouchBegan(evt:egret.TouchEvent){
        this._bmd.texture = RES.getRes("btn_down");
    }
    
    private onTouchEnded(evt: egret.TouchEvent) {
        this._bmd.texture = RES.getRes("btn_normal");
    }
    
    private onTouchReleasedOutside(evt: egret.TouchEvent) {
        this._bmd.texture = RES.getRes("btn_normal");
    }
}
