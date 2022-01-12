//发布者
class Pub{
    constructor(dispatcher){
        this.dispatcher = dispatcher;
        this.id = observed_ids++;
    }

    publish(type){
       this.dispatcher.publish(type, this)
    }
}

//订阅者
class Subscriber{
    constructor(dispatcher){
       this.dispatcher = dispatcher;
       this.id = observer_ids++;
    }

    subscribe(type){
        this.dispatcher.subscribe(type,this);
    }

    doUpdate(type,arg){
        console.log("接受到消息"+arg)
    }
 }


//调度中心
class Dispatcher {
    constructor(){
       this.dispatcher = {};
    }

    //订阅
    subscribe(pub,subscriber){
       if(!this.dispatcher[pub.id]){
          this.dispatcher[pub.id] = [];
       }  
       this.dispatcher[pub.id].push(subscriber);
    }

    //退订
    unsubscribe(pub, subscriber) {
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

    doUpdate(type,st){
        //   super.update(st);
        console.log(this.name+`阅读了--${type}--公众号的文章`);
    }
}


class WeiX extends Pub{
    constructor(name,dispatcher){
        super(dispatcher);
        this.name = name;
    }

    publishArticle(type){
        this.publish(type)
    }
}
 
let dispatcher = new Dispatcher();

//公众号
let wei1 = new WeiX("前端", dispatcher);
let wei2 = new WeiX("数据库", dispatcher);

//读者们
let reader1 = new Reader("小玲", dispatcher);
let reader2 = new Reader("小明", dispatcher);
let reader3 = new Reader("小李", dispatcher);

//读者订阅公众号
reader1.subscribe("前端");
reader2.subscribe("数据库");
reader3.subscribe("数据库");

//公众号发布文章
wei1.publishArticle("前端");
wei1.publishArticle("数据库");
 
/**
 * 小玲阅读了--前端--公众号的文章
 * 小明阅读了--数据库--公众号的文章
 * 小李阅读了--数据库--公众号的文章
 */