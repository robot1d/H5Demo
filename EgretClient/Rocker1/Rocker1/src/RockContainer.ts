/**
 *
 * @author 
 *
 */
class RockContainer extends egret.DisplayObjectContainer{
    
    private _socket: Socket;
    
    private _upPressedCount: number = 0;
    
    private _upReleasedCount: number = 0;
    
    private _downPressedCount: number = 0;
    
    private _downReleasedCount: number = 0;
    
//    private _debugTf: egret.TextField;
    
    public constructor(private _ip: string, private _port: number) {
        super();
        var stage: egret.Stage = egret.MainContext.instance.stage;
        var cx = stage.stageWidth / 2;
        var cy = stage.stageHeight / 2;
        
        var okBtn: Btn = new Btn("ok");
        this.addChild(okBtn);        
        okBtn.addEventListener("released", this.onOKClicked, this);
        okBtn.addEventListener("pressed", this.onOKTouchBegan, this);
        okBtn.addEventListener("releasedOut", this.onOKClicked, this);
        okBtn.x = cx - (330 >> 1) + 366;
        okBtn.y = cy - (182 >> 1) + 115;
        
        var backBtn: Btn = new Btn("back");
        this.addChild(backBtn);
        backBtn.addEventListener("released", this.onBackClicked, this);
        backBtn.x = cx - (207 >> 1) + 486;
        backBtn.y = cy - (223 >> 1) - 163;
        
        var menuBtn: Btn = new Btn("menu");
        this.addChild(menuBtn);
        menuBtn.addEventListener("released", this.onMenuClicked, this);
        menuBtn.x = cx - (207 >> 1) + 219;
        menuBtn.y = cy - (223 >> 1) - 163;
        
        var rightBtn: Btn = new Btn("right");
        this.addChild(rightBtn);
        rightBtn.addEventListener("released", this.onRightClicked, this);
        rightBtn.addEventListener("pressed", this.onRightTouchBegan, this);
        rightBtn.addEventListener("releasedOut", this.onRightClicked, this);
        rightBtn.x = cx - (207 >> 1) - 41;
        rightBtn.y = cy - (223 >> 1) - 8;
        
        var downBtn: Btn = new Btn("down");
        this.addChild(downBtn);
        downBtn.addEventListener("released", this.onDownClicked, this);
        downBtn.addEventListener("pressed", this.onDownTouchBegan, this);
        downBtn.addEventListener("releasedOut", this.onDownClicked, this);
        downBtn.x = cx - (207 >> 1) - 292;
        downBtn.y = cy - (223 >> 1) + 137;
        
        var leftBtn: Btn = new Btn("left");
        this.addChild(leftBtn);
        leftBtn.addEventListener("released", this.onLeftClicked, this);
        leftBtn.addEventListener("pressed", this.onLeftTouchBegan, this);
        leftBtn.addEventListener("releasedOut", this.onLeftClicked, this);
        leftBtn.x = cx - (207 >> 1) - 538;
        leftBtn.y = cy - (223 >> 1) - 8;
        
        var upBtn: Btn = new Btn("up");
        this.addChild(upBtn);
        upBtn.addEventListener("released", this.onUpClicked, this);
        upBtn.addEventListener("pressed", this.onUpTouchBegan, this);
        upBtn.addEventListener("releasedOut", this.onUpClicked, this);
        upBtn.x = cx - (207 >> 1) - 292;
        upBtn.y = cy - (223 >> 1) - 163;
        
        var versionTf: egret.TextField = new egret.TextField();        
        versionTf.text = "1.9";
        versionTf.x = stage.stageWidth - versionTf.width;
        versionTf.y = stage.stageHeight - 30;
        this.addChild(versionTf);
        
//        var debugTf: egret.TextField = new egret.TextField();
//        debugTf.x = stage.stageWidth- 300;
//        debugTf.y = stage.stageHeight - 150;
//        this.addChild(debugTf);
//        this._debugTf = debugTf;
        
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	
//    private onEnterFrame(evt:egret.Event){
//        if(this._socket) {
//            if(this._upReleasedCount == this._upPressedCount && this._downPressedCount == this._downReleasedCount) {
//                this._socket.send("None");
//            }
//        }        
//    }
	
    private onOKClicked(evt:egret.Event){
        this.send("okReleased");
    }
    
    private onOKTouchBegan(evt:egret.Event){
        this.send("okPressed");
    }
    
    private onBackClicked(evt:egret.Event){
        this.send("back");
    }
    
    private onMenuClicked(evt:egret.Event){
        this.send("menu");
    }
    
    private onRightClicked(evt:egret.Event){
        this.send("rightReleased");
    }
    
    private onRightTouchBegan(evt: egret.Event) {
        this.send("rightPressed");
    }
    
    private onDownClicked(evt:egret.Event){
        this._downReleasedCount++;
        this.send("downReleased");
        if(this._upReleasedCount == this._upPressedCount && this._downPressedCount == this._downReleasedCount) {
            this._socket.send("None");
        }
    }
    
    private onDownTouchBegan(evt: egret.Event) {
        this._downPressedCount++;
        this.send("downPressed");
    }
    
    private onLeftClicked(evt:egret.Event){
        this.send("leftReleased");
    }
    
    private onLeftTouchBegan(evt: egret.Event) {
        this.send("leftPressed");
    }
    
    private onUpClicked(evt:egret.Event){
        this._upReleasedCount++;
        this.send("upReleased");
        if(this._upReleasedCount == this._upPressedCount && this._downPressedCount == this._downReleasedCount) {
            this._socket.send("None");
        }
    }
    
    private onUpTouchBegan(evt: egret.Event) {
        this._upPressedCount++;
        this.send("upPressed");
    }
    
    private send(msg:string){
        if(!this._socket) {
            this.tryConnect();
        } else {
            this._socket.send(msg);
        }
//        this._debugTf.text = "Up按下:" + this._upPressedCount + "\nUp抬起:" + this._upReleasedCount + "\ndown按下:" + this._downPressedCount + "\ndown抬起:" + this._downReleasedCount;
    }
    
    private tryConnect() {
        if(this._ip != "" && this._port != 0){
            this._socket = new Socket();
            this._socket.connect(this._ip, this._port);   
        }
    }
}
