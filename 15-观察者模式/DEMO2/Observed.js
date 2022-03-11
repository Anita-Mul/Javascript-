let observed_ids = 0;

//被观察者列
class Observed {
    constructor() {
       this.observers = [];
       this.id=observed_ids++;
    }

    //添加观察者
    addObserver(observer) {
       this.observers.push(observer);
    }

    //删除观察者
    removeObserver(observer) {
       this.observers = this.observers.filter(o => {
          return o.id != observer.id;
       });
    }

    //通知所有的观察者
    notify() {
       this.observers.forEach(observer => {
          observer.update(this);
       });
    }
}
 


