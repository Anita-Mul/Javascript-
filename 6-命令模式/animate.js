// 定义策略对象
var tween = {
    // 动画已消耗的时间、小球的原始位置、小球的目标位置、动画持续的总时间
    // 返回元素的当前位置
    linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    }
};

// 定义移动对象
var Animate = function(dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
};

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
    this.startTime = +new Date;
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.propertyName = propertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];

    var self = this;
    var timeId = setInterval(function(){
        if(self.step() == false) {
            clearInterval(timeId);
        }
    }, 19);
}

Animate.prototype.step = function() {
    var t = +new Date;
    if(t >= this.startTime + this.duration) {
        this.update(this.endPos);
        return false;
    }

    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
    this.update(pos);
};

Animate.prototype.update = function(pos) {
    this.dom.style[this.propertyName] = pos + 'px';
};

export default Animate;