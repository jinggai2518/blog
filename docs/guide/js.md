# js
## js继承

首先创建一个父类
```javascript
//父类
function Person(name){ //给构造函数添加属性和方法
        this.name = name;
        this.sum = function(){
            alert(this.name)
        }
}
Person.prototype.age = 10;//给构造函数添加了原型属性
```
### 1、原型链继承
```javascript
function Per(){
    this.name ='ker';
}
Per.prototype = new　Person();//主要
var per1 = new Per();
console.log(per1.age);//10
//使用 instanceof 判断元素是否在另一个元素的原型链上
//per1 继承了Person 的属性，返回true
console.log(per1 instanceof Person);//true
```
* 重点：让新实例的原型等于父类的实例。
* 特点：实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。（新实例不会继承父类实例的属性！）
* 缺点： 1. 新实例无法向父类构造函数传参。  
　　　  2. 继承单一。  
　　　  3. 所有新实例都会共享父类实例的属性。（原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）
### 2、借用构造函数
```js
//借用构造函数
function Con(){
    Person.call(this,"jer");//重点
    this.age = 12;
}
var con1 = new Con();
console.log(con1.name);//'jer'
console.log(con1.age);//12
console.log(con1 instanceof Person);//false
```
* 重点：用.call()和.apply()将父类构造函数引入子类函数（在子类函数中做了父类函数的自执行（复制））
* 特点：
1. 只继承了父类构造函数的属性，没有继承父类原型的属性。   
2. 解决了原型链继承缺点1、2、3。  
3. 可以继承多个构造函数属性（call多个）。  
4. 在子实例中可向父实例传参。  


* 缺点：
1. 只能继承父类构造函数的属性。  
2. 无法实现构造函数的复用。（每次用每次都要重新调用）  
3. 每个新实例都有父类构造函数的副本，臃肿。

## 防抖和节流
### debounce 防抖函数
```js
function debounce(fn, delay = 200) {
    if (typeof fn !== 'function') { // 参数类型为函数
        throw new TypeError('fn is not a function');
    }
    
    let lastFn = null; 
    return function(...args) {
        if (lastFn) {
             clearTimeout(lastFn);
        }
        let lastFn = setTimeout(() => {
            lastFn = null;
            fn.call(this, ...args);
        }, delay);
    }
}
```
### throttle 节流函数
```js
// fn 是需要执行的函数
// wait 是时间间隔
const throttle = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}

// DEMO
// 执行 throttle 函数返回新函数
const betterFn = throttle(() => console.log('fn 函数执行了'), 1000)
// 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
setInterval(betterFn, 10)
```