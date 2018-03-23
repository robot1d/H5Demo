/**
 *
 * @author
 *
 */
var RockContainer = (function (_super) {
    __extends(RockContainer, _super);
    //    private _debugTf: egret.TextField;
    function RockContainer(_ip, _port) {
        _super.call(this);
        this._ip = _ip;
        this._port = _port;
        this._upPressedCount = 0;
        this._upReleasedCount = 0;
        this._downPressedCount = 0;
        this._downReleasedCount = 0;
        var stage = egret.MainContext.instance.stage;
        var cx = stage.stageWidth / 2;
        var cy = stage.stageHeight / 2;
        var okBtn = new Btn("ok");
        this.addChild(okBtn);
        okBtn.addEventListener("released", this.onOKClicked, this);
        okBtn.addEventListener("pressed", this.onOKTouchBegan, this);
        okBtn.addEventListener("releasedOut", this.onOKClicked, this);
        okBtn.x = cx - (330 >> 1) + 366;
        okBtn.y = cy - (182 >> 1) + 115;
        var backBtn = new Btn("back");
        this.addChild(backBtn);
        backBtn.addEventListener("released", this.onBackClicked, this);
        backBtn.x = cx - (207 >> 1) + 486;
        backBtn.y = cy - (223 >> 1) - 163;
        var menuBtn = new Btn("menu");
        this.addChild(menuBtn);
        menuBtn.addEventListener("released", this.onMenuClicked, this);
        menuBtn.x = cx - (207 >> 1) + 219;
        menuBtn.y = cy - (223 >> 1) - 163;
        var rightBtn = new Btn("right");
        this.addChild(rightBtn);
        rightBtn.addEventListener("released", this.onRightClicked, this);
        rightBtn.addEventListener("pressed", this.onRightTouchBegan, this);
        rightBtn.addEventListener("releasedOut", this.onRightClicked, this);
        rightBtn.x = cx - (207 >> 1) - 41;
        rightBtn.y = cy - (223 >> 1) - 8;
        var downBtn = new Btn("down");
        this.addChild(downBtn);
        downBtn.addEventListener("released", this.onDownClicked, this);
        downBtn.addEventListener("pressed", this.onDownTouchBegan, this);
        downBtn.addEventListener("releasedOut", this.onDownClicked, this);
        downBtn.x = cx - (207 >> 1) - 292;
        downBtn.y = cy - (223 >> 1) + 137;
        var leftBtn = new Btn("left");
        this.addChild(leftBtn);
        leftBtn.addEventListener("released", this.onLeftClicked, this);
        leftBtn.addEventListener("pressed", this.onLeftTouchBegan, this);
        leftBtn.addEventListener("releasedOut", this.onLeftClicked, this);
        leftBtn.x = cx - (207 >> 1) - 538;
        leftBtn.y = cy - (223 >> 1) - 8;
        var upBtn = new Btn("up");
        this.addChild(upBtn);
        upBtn.addEventListener("released", this.onUpClicked, this);
        upBtn.addEventListener("pressed", this.onUpTouchBegan, this);
        upBtn.addEventListener("releasedOut", this.onUpClicked, this);
        upBtn.x = cx - (207 >> 1) - 292;
        upBtn.y = cy - (223 >> 1) - 163;
        var versionTf = new egret.TextField();
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
    var d = __define,c=RockContainer;p=c.prototype;
    //    private onEnterFrame(evt:egret.Event){
    //        if(this._socket) {
    //            if(this._upReleasedCount == this._upPressedCount && this._downPressedCount == this._downReleasedCount) {
    //                this._socket.send("None");
    //            }
    //        }        
    //    }
    p.onOKClicked = function (evt) {
        this.send("okReleased");
    };
    p.onOKTouchBegan = function (evt) {
        this.send("okPressed");
    };
    p.onBackClicked = function (evt) {
        this.send("back");
    };
    p.onMenuClicked = function (evt) {
        this.send("menu");
    };
    p.onRightClicked = function (evt) {
        this.send("rightReleased");
    };
    p.onRightTouchBegan = function (evt) {
        this.send("rightPressed");
    };
    p.onDownClicked = function (evt) {
        this._downReleasedCount++;
        this.send("downReleased");
        if (this._upReleasedCount == this._upPressedCount && this._downPressedCount == this._downReleasedCount) {
            this._socket.send("None");
        }
    };
    p.onDownTouchBegan = function (evt) {
        this._downPressedCount++;
        this.send("downPressed");
    };
    p.onLeftClicked = function (evt) {
        this.send("leftReleased");
    };
    p.onLeftTouchBegan = function (evt) {
        this.send("leftPressed");
    };
    p.onUpClicked = function (evt) {
        this._upReleasedCount++;
        this.send("upReleased");
        if (this._upReleasedCount == this._upPressedCount && this._downPressedCount == this._downReleasedCount) {
            this._socket.send("None");
        }
    };
    p.onUpTouchBegan = function (evt) {
        this._upPressedCount++;
        this.send("upPressed");
    };
    p.send = function (msg) {
        if (!this._socket) {
            this.tryConnect();
        }
        else {
            this._socket.send(msg);
        }
        //        this._debugTf.text = "Up按下:" + this._upPressedCount + "\nUp抬起:" + this._upReleasedCount + "\ndown按下:" + this._downPressedCount + "\ndown抬起:" + this._downReleasedCount;
    };
    p.tryConnect = function () {
        if (this._ip != "" && this._port != 0) {
            this._socket = new Socket();
            this._socket.connect(this._ip, this._port);
        }
    };
    return RockContainer;
})(egret.DisplayObjectContainer);
egret.registerClass(RockContainer,"RockContainer");
