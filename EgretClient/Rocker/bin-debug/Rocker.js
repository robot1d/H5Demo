/**
 *
 * @author
 *
 */
var DIR;
(function (DIR) {
    DIR[DIR["left"] = 0] = "left";
    DIR[DIR["up"] = 1] = "up";
    DIR[DIR["right"] = 2] = "right";
    DIR[DIR["down"] = 3] = "down";
    DIR[DIR["leftDown"] = 4] = "leftDown";
    DIR[DIR["leftUp"] = 5] = "leftUp";
    DIR[DIR["rightDown"] = 6] = "rightDown";
    DIR[DIR["rightUp"] = 7] = "rightUp";
})(DIR || (DIR = {}));
var Rocker = (function (_super) {
    __extends(Rocker, _super);
    function Rocker() {
        _super.call(this);
        this._dir = 3 /* down */;
        this._bg = new egret.Bitmap(RES.getRes("rockBg"));
        this.addChild(this._bg);
        this._ball = new egret.Bitmap(RES.getRes("rockBtn"));
        this._ball.x = this._ball.y = 60 - 17;
        this.addChild(this._ball);
        var stage = egret.MainContext.instance.stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoved, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    }
    var d = __define,c=Rocker;p=c.prototype;
    p.onTouchMoved = function (evt) {
        //        console.log("evt.currentTarget = ", evt.currentTarget, "evt.target", evt.target);
        if (evt.target == this.stage) {
            var angle = this.getRad(this.x + 60, this.y + 60, evt.stageX, evt.stageY);
            if (Math.pow(evt.stageX - this.x - 60, 2) + Math.pow(evt.stageY - this.y - 60, 2) >= 3600) {
                var p = this.getAngelePosition(60, angle);
                this._ball.x = p.x + 60 - 17;
                this._ball.y = p.y + 60 - 17;
            }
            else {
                this._ball.x = evt.stageX - this.x - 17;
                this._ball.y = evt.stageY - this.y - 17;
            }
            //判断方向
            var dir;
            if (angle >= -0.39 && angle < 0.39) {
                dir = 2 /* right */;
            }
            else if (angle >= 0.39 && angle < 1.17) {
                dir = 6 /* rightDown */;
            }
            else if (angle >= 1.17 && angle < 1.95) {
                dir = 3 /* down */;
            }
            else if (angle >= 1.95 && angle < 2.73) {
                dir = 4 /* leftDown */;
            }
            else if (angle >= 2.73 || angle < -2.73) {
                dir = 0 /* left */;
            }
            else if (angle >= -2.73 && angle < -1.95) {
                dir = 5 /* leftUp */;
            }
            else if (angle >= -1.95 && angle < -1.17) {
                dir = 1 /* up */;
            }
            else {
                dir = 7 /* rightUp */;
            }
            if (this._dir != dir) {
                this._dir = dir;
                this.dispatchEvent(new egret.Event(egret.Event.CHANGE, false, false, this._dir));
            }
        }
    };
    p.onTouchEnded = function (evt) {
        if (evt.target == this.stage) {
            egret.Tween.get(this._ball).to({ x: 60 - 17, y: 60 - 17 }, 0.2);
            this.dispatchEvent(new egret.Event("stopMove"));
        }
    };
    //获取当前摇杆与用户触屏点的角度
    p.getRad = function (px1, py1, px2, py2) {
        //得到两点x的距离
        var x = px2 - px1;
        //得到两点y的距离
        var y = py1 - py2;
        //算出斜边长度
        var xie = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        //得到这个角度的余弦值(通过三角函数中的店里：角度余弦值=斜边/斜边)
        var cosAngle = x / xie;
        //通过反余弦定理获取到期角度的弧度
        var rad = Math.acos(cosAngle);
        //注意：当触屏的位置Y坐标<摇杆的Y坐标，我们要去反值-0~-180
        if (py2 < py1) {
            rad = -rad;
        }
        return rad;
    };
    p.getAngelePosition = function (r, angle) {
        return new egret.Point(r * Math.cos(angle), r * Math.sin(angle));
    };
    return Rocker;
})(egret.DisplayObjectContainer);
egret.registerClass(Rocker,"Rocker");
