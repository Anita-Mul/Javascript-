let ids = 0;
let observer_ids = 0;

//订阅者
class Subscriber {
    constructor(dispatcher) {
      this.dispatcher = dispatcher;
      this.id = observer_ids++;
    }

    subscribe(type) {
       this.dispatcher.subscribe(type, this);
    }

    doUpdate(type, arg) {
        console.log("接受到消息" + arg)
    }
}

//调度中心
class Dispatcher {
    constructor() {
        this.dispatcher = {};
        this.id = ids++;
    }

    //订阅
    subscribe(type,subscriber) {
        if(!this.dispatcher[type]) {
            this.dispatcher[type] = [];
        }  
        this.dispatcher[type].push(subscriber);
    }

    //退订
    unsubscribe(type, subscriber) {
        let subscribers = this.dispatcher[type];
        if (!subscribers || !subscribers.length) return;
        this.dispatcher[type] = subscribers.filter(item => { 
            return item.id !== subscriber.id
        });
    }

    //发布
    publish(type, args) {
        let subscribers = this.dispatcher[type];
        if (!subscribers || !subscribers.length) return;
        subscribers.forEach(subscriber => {
            subscriber.doUpdate(type, args);
        });        
    }
}

class Reader extends Subscriber{
    constructor(name, dispatcher){
      super(dispatcher);
      this.name = name;
    }

    doUpdate(type, st){
      //   super.update(st);
        console.log(this.name + `阅读了--${type}--公众号的文章`);
    }
}

class WeiX extends Dispatcher{
    constructor(name){
       super();
       this.name = name;
    }
    publishArticle(type){
       this.publish(type)
    }
}

//微信公众号平台
let wx1 = new WeiX();

//读者们
let reader1 = new Reader("小玲",wx1);
let reader2 = new Reader("小明",wx1);
let reader3 = new Reader("小李",wx1);

//读者订阅公众号
reader1.subscribe("前端");
reader2.subscribe("数据库");
reader3.subscribe("数据库");

//公众号发布文章
wx1.publishArticle("前端");
wx1.publishArticle("数据库");
