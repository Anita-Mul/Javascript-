let observer_ids = 0;

//观察者类
class Observer {
    constructor() {
       this.id = observer_ids++;
    }

    //观测到变化后的处理
    update(ob){
       console.log("观察者" + this.id + `-检测到被观察者${ob.id}变化`);
    }
}
 

 