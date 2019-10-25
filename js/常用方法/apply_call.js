//1. 每个函数都包含两个非继承而来的方法：call()方法和apply()方法。
//2. 相同点：这两个方法的作用是一样的。
//换句话说，就是为了改变函数体内部this的指向


function fruits(){}
        
fruits.prototype = {
    color: "red",
    say: function(){
        console.log("My color is " + this.color);
    }
};

var apple = new fruits;
apple.say();

console.log("=================================分界线==========================================");

//当想另外一个对象想使用fruits中的say方法时不用重新写，使用call和apply可以实现“劫持”别人的方法。
var another = {
    color: "yellow"
};

apple.say();                //My color is red
apple.say.call(another);    //My color is yellow
apple.say.apply(another);   //My color is yellow

// 区别：参数书写方式不同
// call(thisObj, arg1, arg2, arg3, arg4);
// apply(thisObj, [args]);
// thisObj：call和apply第一个参数是一样的，该参数将替代Function类里面的this对象 ===>> 个人理解 another对象将代替say方法里面的this对象
// arg1,arg2....：是一个个的参数，
// args：一个数组或类数组，是一个参数列表。

console.log("=================================分界线==========================================");

//改变函数作用域
var name = "小白";
var obj = {
    name: "小红"
};

function sayName() {
    return this.name;
}
console.log(sayName.call(this));   //小白 这里的this相当于window对象
console.log(sayName.call(obj));    //小红

console.log("=================================分界线==========================================");

//实现js继承
//父类
function Person(name, height) {
    this.sayInfo = function() {
        return "姓名：" + name + ", 身高：" + height + ", 体重：" + this.weight;
    }
}
//子类
function Chinese(name, height, weight) {
    Person.call(this, name, height);
    this.weight = weight;
    
    this.nation = function() {
        console.log("我是中国人");
    }
}
//子类
function America(name, height, weight) {
    Person.apply(this, [name, height]);
    this.weight = weight;
}

// call和apply实质是改变了Person的this指向为Chinese和America,并调用该函数

let chiness = new Chinese("成龙", "178cm", "60kg");
console.log(chiness.sayInfo());    //姓名：成龙, 身高：178cm, 体重：60kg
let america = new America("jack", "180cm", "55kg");
console.log(america.sayInfo());    //姓名：jack, 身高：180cm, 体重：55kg