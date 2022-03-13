## 单例模式
###### 定义
 - 保证一个类仅有一个实例，并提供一个访问它的全局访问点
 - 例：
    线程池、全局缓存、浏览器中的window对象

###### 写法
 - 通用写法
    ```js
    var Example = (function() {
        var instance;

        return function() {
            if(!instance) {
                ...
            }

            return instance;
        }
    })();

    var a = new Example();
    var b = new Example();

    alert(a === b);
    ```
 - 对象字面量
    ```js
    var namespace1 = {
        a: function() {
            alert(1);
        },
        b: function() {
            alert(2);
        },
    };
    ```
 - 使用闭包封装私有变量
    ```js
    var user = (function() {
        var __name = 'jack',
            __age = 19;
        
        return {
            getUserInfo: function() {
                return __name + '_' + __age;
            }
        }
    })();
    ```
***
## 策略模式
 - 定义策略类
    ```js
    var strategies = {
        "S": function(salary) {
            return salary * 4;
        },
        "A": function(salary) {
            return salary * 3;
        },
        "B": function(salary) {
            return salary * 2;
        }
    };
    ```
 - 定义调用函数
    ```js
    var calculateBonus = function(level, salary) {
        return strategies[level](salary);
    };
    ```
 - 当一件事情的发生对应多种策略，可以在调用函数的方式上做文章【4 - 表单校验】
***
## 代理模式
 - 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问
 - 意思就是访问硬件或者网络啥的需要时间，代理在这个时间里干点啥，体验好
 - 事情原本的做法
    ```js
    var myImage = (function() {
        var imgNode = document.createElement('img');
        document.body.appendChild(imgNode);

        return {
            setSrc: function(src) {
                imgNode.src = src;
            }
        };
    })();
    ```
 - 控制访问 function
    ```js
    var proxyImage = (function() {
        var img = new Image;
        img.onload = function() {
            // myImage.setSrc(this.src);
            // 变得太快，看不出效果，所以加了定时器
            setTimeout(() => {
                myImage.setSrc(img.src);
            }, 1000);
        };

        return {
            setSrc: function(src) {
                // loading   
                myImage.setSrc('https://pic3.zhimg.com/v2-d0e1883a8b5126baeaf677cfcd3a302e_b.webp');
                // real
                img.src = src;
            },  
        };
    })();

    proxyImage.setSrc("https://pic2.zhimg.com/v2-227d2013bf43c562113f2dc6d918f7d5_b.jpg");
    ```
## 命令模式
 - 命令集合
    ```js
    var SubMenu = {
        add: function() {
            console.log('增加子菜单');
        },
        del: function() {
            console.log('删除子菜单');
        }
    };
    ```
 - 添加命令
    ```js
    var AddSubMenuCommand = function(receiver) {
        // return function() {
        //     receiver.add();
        // };
        return {
            execute: function() {
                receiver.add();
            }
        };
    };

    // 或者，也可以直接写成这样
    var openQQCommand = {
        execute: function() {
            console.log('登录QQ');
        }
    };
    ```
 - 执行命令
    ```js
    var setCommand = function(button, command) {
        // button.onclick = function() {
        //     func();
        // }
        button.onclick = function() {
            command.execute();
        };
    };
    ```
***
## 组合命令
 - 父类
    ```js
    var Folder = function(name) {
        this.name = name;
        this.parent = null;  // 头节点的父节点为空
        this.files = [];
    };

    Folder.prototype.add = function(file) {
        file.parent = this;      // 设置父对象
        this.files.push(file);
    };

    Folder.prototype.scan = function() {
        for(var i = 0, file, files = this.files; file = files[i++]; ) {
            file.scan();
        };
    };
    ```
 - 子类
    ```js
    var File = function(name) {
        this.name = name;
    };

    File.prototype.add = function() {
        throw new Error('文件下面不能再添加文件');
    };

    File.prototype.scan = function() {
        console.log('开始扫描文件：' + this.name);
    };

    File.prototype.remove = function() {
        if(!this.parent) {
            return;
        }

        for(var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if(file === this) {
                files.splice(l, 1);
            }
        }
    };
    ```
***
## 模板方法模式
 - 父类
    ```js
    var Beverage = function() {};

    Beverage.prototype.boilWater = function() {
        console.log('把水煮沸');
    };

    Beverage.prototype.brew = function() {
        throw new Error('子类必须重写brew方法');
    };

    Beverage.prototype.init = function() {
        this.boilWater();
        this.brew();
    };
    ```
 - 子类
    ```js
    var Coffee = function() {};

    Coffee.prototype = new Beverage();
    Coffee.prototype.brew = function() {
        console.log('用沸水冲泡咖啡');
    }
    ```
 - 不需要继承的方法
    ```js
    var Beverage = function(param) {
        var boilWater = function() {
            console.log('把水煮沸');
        };

        var brew = param.brew || function() {
            throw new Error('必须传递brew方法');
        };

        var F = function() {};

        F.prototype.init = function() {
            boilWater();
            brew();
        };

        return F;
    };

    var Coffee = Beverage({
        brew: function() {
            console.log('用沸水冲泡咖啡');
        }
    });
    ```
***
## 享元模式
 - 传入创建对象的方法，对象池存储对象
    ```js
    var objectPoolFactory = function(createObjFn) {
            var objectPool = [];
            return {
                create: function() {
                    var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
                    return obj;
                },
                recover: function(obj) {
                    objectPool.push(obj);
                }
            }
        };
    ```
 - 传入创建对象的方法
    ```js
    var iframeFactory = objectPoolFactory(function() {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.onload = function() {
            iframe.onload = null;
            iframeFactory.recover(iframe);
        };

        return iframe;
    });
    ```
***
## 职责链模式
 - 链的数据结构
    ```js
    var Chain = function(fn) {
        this.fn = fn;
        this.successor = null;
    };

    // 指定在链中的下一个节点
    Chain.prototype.setNextSuccessor = function(successor) {
        return this.successor = successor;
    };

    // 既可以让函数返回 'nextSuccessor' 来调用下一个，也可以在函数中调用 next() 来调用下一个
    Chain.prototype.passRequest = function() {
        // 在一条链上传递的是相同的参数 arguments
        var ret = this.fn.apply(this, arguments);

        if(ret === 'nextSuccessor') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments);
        }

        return ret; 
    };

    Chain.prototype.next = function() {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    };
    ```
 - 在 function 上绑定 after
    ```js
    Function.prototype.after = function(fn) {
        var self = this;
        return function() {
            var ret = self.apply(this,arguments);
            if(ret === 'nextSuccessor') {
                return fn.apply(this, arguments);
            }
            return ret;
        }
    };

    var order = order500.after(order200).after(orderNormal);
    ```
***
## 装饰者模式
 - 主要功能
    ```js
    var plane = {
        fire: function(){
            console.log( '发射普通子弹' );
        }
    }
    // ——————————————————————————————————
    var Plane = function() {};
    Plane.prototype.fire = function() {
        console.log('发射普通子弹');
    };
    ```
 - 装饰方法
    ```js
    var missileDecorator = function(){
        console.log( '发射导弹' );
    }
    // ——————————————————————————————————
    var MissileDecorator = function(plane) {
        this.plane = plane;
    };
    MissileDecorator.prototype.fire = function() {
        this.plane.fire();
        console.log('发射导弹');
    };
    ```
 - 装饰
    ```js
    var fire1 = plane.fire;

    plane.fire = function(){
        fire1();
        missileDecorator();
    }
    ```
 - AOP 装饰函数
    ```js
    Function.prototype.before = function( beforefn ){
        var __self = this;                         
        return function(){                         
            beforefn.apply( this, arguments );       
                                                    
            return __self.apply( this, arguments );  
                                                    
        }
    }

    Function.prototype.after = function( afterfn ){
        var __self = this;
        return function(){
            var ret = __self.apply( this, arguments );
            afterfn.apply( this, arguments );
            return ret;
        }
    };
    ```
***

