var partEvent = {
    listen: function(clientList, key, fn) {
        if(!clientList[key]) {
            clientList[key] = [];
        }
        clientList[key].push(fn);
    },

    trigger: function(clientList, key, args) {
        var fns = clientList[key];

        if(!fns || fns.length === 0) {
            return false;
        }

        for(let fn of fns) {
            fn.apply(null, args);
        }
    }, 

    remove: function(clientList, key, fn) {
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
    }, 

    one: function(clientList, key, fn) {
        this.remove(clientList, key, fn);
    }
};


var Event = (function(){
    var namespaceTotal = {};

    var createSpace = function(namespace = '_default') {
        if(!namespaceTotal[namespace]) {
            namespaceTotal[namespace] = {};
        }

        var space = namespaceTotal[namespace];

        return {
            one: function(key, fn, last) {
                partEvent.one(space, key, fn);
            },
            listen: function(key, fn) {
                partEvent.listen(space, key, fn)
            },
            remove: function(key, fn) {
                partEvent.remove(space, key, fn);
            },
            trigger: function(key, ...args) {
                console.log(namespaceTotal);
                partEvent.trigger(space, key, args);
            },
        }
    };

    return {
        create: createSpace,
        one: createSpace().one,
        listen: createSpace().listen,
        remove: createSpace().remove,
        trigger: createSpace().trigger
    };
})();

export default Event;

var test = {
    "space1": {
        "click": [function],
    },
}