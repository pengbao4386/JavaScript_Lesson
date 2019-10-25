/**
 * 通过原型继承创建一个新对象
 */
function inherit(obj){
    if(obj == null)throw TypeError();

    if(Object.create){
        return Object.create(obj);
    }

    let t = typeof obj;
    if(t !== "object" && t !== "function"){
        function f(){};
        f.prototype = obj;
        return new f();
    }

}

let obj = {x:"这是obj的属性对象值"};
let newObj = inherit(obj);
console.log(obj.x);
console.log(newObj.x);
console.log("====================================================");
newObj.x = "修改为newObj属性值";
console.log(obj.x);
console.log(newObj.x);
delete newObj.x;
console.log(newObj.x);