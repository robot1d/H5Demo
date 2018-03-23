/**
 *
 * @author 
 *
 */

enum DIR {
    left, up, right, down, leftDown, leftUp, rightDown, rightUp
}

class Rocker extends egret.DisplayObjectContainer {

    private _ball: egret.Bitmap;

    private _bg: egret.Bitmap;

    private _dir: DIR;

    public constructor() {
        super();

        this._dir = DIR.down;

        this._bg = new egret.Bitmap(RES.getRes("rockBg"));
        this.addChild(this._bg);

        this._ball = new egret.Bitmap(RES.getRes("rockBtn"));
        this._ball.x = this._ball.y = 60 - 17;
        this.addChild(this._ball);

        var stage: egret.Stage = egret.MainContext.instance.stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoved, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    }

    private onTouchMoved(evt: egret.TouchEvent): void {
//        console.log("evt.currentTarget = ", evt.currentTarget, "evt.target", evt.target);
        if(evt.target == this.stage){
            var angle: number = this.getRad(this.x + 60, this.y + 60, evt.stageX, evt.stageY);

            if(Math.pow(evt.stageX - this.x - 60, 2) + Math.pow(evt.stageY - this.y - 60, 2) >= 3600) {
                var p: egret.Point = this.getAngelePosition(60, angle);
                this._ball.x = p.x + 60 - 17;
                this._ball.y = p.y + 60 - 17;
            } else {
                this._ball.x = evt.stageX - this.x - 17;
                this._ball.y = evt.stageY - this.y - 17;
            }
        
            //判断方向
            var dir: DIR;
            if(angle >= -0.39 && angle < 0.39) {
                dir = DIR.right;
            } else if(angle >= 0.39 && angle < 1.17) {
                dir = DIR.rightDown;
            } else if(angle >= 1.17 && angle < 1.95) {
                dir = DIR.down;
            } else if(angle >= 1.95 && angle < 2.73) {
                dir = DIR.leftDown;
            } else if(angle >= 2.73 || angle < -2.73) {
                dir = DIR.left;
            } else if(angle >= -2.73 && angle < -1.95) {
                dir = DIR.leftUp;
            } else if(angle >= -1.95 && angle < -1.17) {
                dir = DIR.up;
            } else /*if(angle >= -1.17 && angle < -0.39)*/ {
                dir = DIR.rightUp;
            }
            if(this._dir != dir) {
                this._dir = dir;
                this.dispatchEvent(new egret.Event(egret.Event.CHANGE, false, false, this._dir));
            }   
        }
    }

    private onTouchEnded(evt: egret.TouchEvent): void {
        if(evt.target == this.stage){
            egret.Tween.get(this._ball).to({ x: 60 - 17, y: 60 - 17 }, 0.2);
            this.dispatchEvent(new egret.Event("stopMove"));    
        }
    }
    
    //获取当前摇杆与用户触屏点的角度
    private getRad(px1: number, py1: number, px2: number, py2: number): number {
        //得到两点x的距离
        var x: number = px2 - px1;
        //得到两点y的距离
        var y: number = py1 - py2;
        //算出斜边长度
        var xie: number = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        //得到这个角度的余弦值(通过三角函数中的店里：角度余弦值=斜边/斜边)
        var cosAngle: number = x / xie;
        //通过反余弦定理获取到期角度的弧度
        var rad: number = Math.acos(cosAngle);
        //注意：当触屏的位置Y坐标<摇杆的Y坐标，我们要去反值-0~-180
        if(py2 < py1) {
            rad = -rad;
        }
        return rad;
    }

    private getAngelePosition(r: number, angle: number): egret.Point {
        return new egret.Point(r * Math.cos(angle), r * Math.sin(angle));
    }
}
