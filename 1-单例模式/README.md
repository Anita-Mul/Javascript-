## 定义
 - 保证一个类仅有一个实例，并提供一个访问它的全局访问点
 - 例：
    线程池、全局缓存、浏览器中的window对象

## 写法
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