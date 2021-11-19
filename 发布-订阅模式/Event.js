var Event = (function() {
    var clientList = {},
        listen,
        trigger,
        remove;

    listen = function(key, fn) {
        if(!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    };

    // 触发这个事件
    trigger = function() {
        var key = Array.prototype.shift.call(arguments),
            fns = clientList[key];
        
        if(!fns || fns.length === 0) {
            return false;
        }

        for(var i = 0, fn; fn = fns[i++]; ) {
            fn.apply(this, arguments);
        }
    };

    // 移除这个事件
    remove = function(key, fn) {
        var fns = clientList[key];
        if(!fns) {
            return false;
        }

        if(!fn) {
            fns && (fns.length = 0);
        } else {
            for(var l = fns.length - 1; l >= 0; i--) {
                var _fn = fns[l];
                if(_fn === fn) {
                    fns.splice(l, 1);
                }
            }
        }
    };

    return {
        listen: listen,
        trigger: trigger,
        remove: remove
    };
})();

export default Event;