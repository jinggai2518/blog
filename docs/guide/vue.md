# vue3基础
## 一些tips
### v-once
* 标签使用v-once表示标签只被渲染一次，以后即使数据改变也不重新渲染
```js
    const app = Vue.createApp({
        data(){
            return {
                count:1
            }
        },
        template: `
            <div @click='count+=1' v-once>
                {{count}}    
            </div>   
            `
    })
```
### ref
* ref用于获取dom节点，在需要获取的节点上添加ref='count'，使用需要在mounted之中(之前dom节点都没有创建完成)
```js
const app = Vue.createApp({
        data(){
            return {
                count:1
            }
        },
        mounted(){
            console.log(this.$refs.count)
        },
        template: `
            <div >
                <div ref='count'>
                {{count}}
                </div>    
            </div>   

            `
    })
    app.mount('#root')

```
* ref用于获取子组件这个对象，同时可以使用子组件中的方法
```js
const app = Vue.createApp({
        data(){
            return {
                count:1
            }
        },
        mounted(){
            console.log(this.$refs.common)
            this.$refs.common.sayHello();
        },
        template: `
            <div >
                <common-item  ref='common'/>  
            </div>   

            `
    })
    app.component('common-item', {
        methods:{
            sayHello(){
                alert('hello');
            }

        },
        template: `     
             <div> hello world</div>
            `
    });
    app.mount('#root')
```
### provide和inject
* 用于多层嵌套传递参数的
```js
    const app = Vue.createApp({
        data(){
            return {
                count:1
            }
        },
        provide:{
            count:1
        },
        template: `
            <div >
                <child  :count='count'/>  
            </div>   
            `
    })
    app.component('child', {
        template: `     
                <child-child/>
            `
    });
    app.component('child-child', {
        inject:['count'],
        template: `     
             <div> {{count}}</div>
            `
    });
    app.mount('#root')
```
* 注意：在provide这里无法使用this.count如果需要使用需要将provide转成函数对象
* 这里需要注意 使用provide传递的值不是双向绑定的，之后修改this.count无法传递给子组件
```js
 provide(){
     return {
         count:this.count;
     }
 }

```

## 组件
### 父子组件之间的通信

#### $emit方法
```js
const test = {
    props:['count'],
    emits:{
        addOne:(count) =>{
            if(count>0){
                return ture;
            }
            return false;
        }
    },//emits属性可以统计子组件向外传递的参数，同时还可以做值的校验，值可以是对象也可以是数组['addOne']
    methods:{
           addOne(){
                this.$emit('addOne',this.count+4);//使用$emit通知父组件
           } 

    },
        template:`
               <div @click ='addOne' >{{count}}</div>
        `

 } 
 const app =  Vue.createApp({
      data(){
          return {
             count:1
            }
      },
      methods:{
        handAddOne(e){
            this.count=e;
        }

      },
        template:`
        <div>
           <counter :count ='count' @add-one = 'handAddOne'/>   
        </div>
        `
        //使用@add-one监听传递时间，注意此处驼峰要改成-，监听出发handAddOne方法
    })
    app.component('counter',test);
    app.mount('#root')
```

使用V-model传递值
```js
const test = {
    props:['modelValue'],//此处必须要使用modelValue变量,如果使用其他变量父组件传值的时候需要v-model:xxx =‘’
    methods:{
        handleItemClick(){
                this.$emit('update:modelValue', this.modelValue + 4 );
           } 

    },
        template:`
               <div @click ='handleItemClick' >{{modelValue}}</div>
        `

 } 
 const app =  Vue.createApp({
      data(){
          return {
             count:1
            }
      },
        template:`
           <counter v-model ='count' />
        `
    })
    app.component('counter',test);
    app.mount('#root')

```
传值的时候给v-model加上修饰符
```js
 props:{
        'count':String,
        'countModifiers':{
            default:() =>({})
        }
    },//如果v-model没有传入修饰符则使用default作为它的值，没有声明count这里用modelValue和modelModifiers
    methods:{
        handleItemClick(){
                let newVlaue = this.count +'b';
                if(this.countModifiers.uppercase){
                    newVlaue = newVlaue.toUpperCase();
                }
                this.$emit('update:count', newVlaue);
           } ,
       
    },
    mounted(){
        console.log(this.countModifiers)
    },
        template:`
               <div @click ='handleItemClick' >{{count}}</div>
        `

 } 
 const app =  Vue.createApp({
      data(){
          return {
             count:'a'
            }
      },
     
        template:`
           <counter v-model:count.uppercase ='count'  />
        `
    })//这里传入的时候如果没有count就是使用modelValue
    app.component('counter',test);
    app.mount('#root')

```

### 插槽
* 插槽传递的可以是html结构也可以是变量甚至可以是其他组件，字符串数字等，**slot标签上不可以绑定事件**
* slot的作用域
1. 父模版里调用的数据属性，使用的都是父模版里的数据
2. 子模版里调用的数据属性，使用的都是子模版里的数据

* slot中间的为默认值
 ```js
 //slot插槽 <slot></slot>
    const test = {
        methods:{
            handleClick(){
                alert(123)
            }
        },
        template:`
           <div>
                <input />
                <span @click='handleClick'>
                <slot>default value</slot>
                </span>
            </div>
        `
    } 
   
    const app =  Vue.createApp({
    template:`
           <myform>
                <zj/>
            </myform>
            <myform>
                <button>提交</button>
            </myform>
        `
    })
    app.component('zj',{
        template:'<div>zj</div>'
    })
    app.component('myform',test);
    app.mount('#root')
 ```
 #### 具名插槽
 * 注意具名插槽 父组件调用时候的写法 v-slot:footer ，此处不需要引号
 * v-slot:footer可以简写为#footer
```js
const test = {
        template: `
           <div>
             <slot name='header'></slot>
               <div> content </div>
             <slot name='footer'></slot>
            </div>
        `
    }

    const app = Vue.createApp({
        template: `     
                <layout>
                    <template #header>
                        <div>header</div>
                    </template>
                    <template v-slot:footer>
                        <div>footer</div>
                    </template>    
                </layout>
            `
    })

    app.component('layout', test);
    app.mount('#root')


```
#### 作用域插槽

```js
const test = {
        data(){
            return {
                list:[1,2,3]
            }
        },
        template: `
           <div>
                <slot v-for='item in list' :item='item'/>
           </div>
        `
    }

    const app = Vue.createApp({
        template: `     
                <list v-slot='{slotProps}'>
                    <span>{{slotProps.item}}</span>
                <list/>
            `
    })
    //这里的写法可以使用es6 的解构写法
    // <list v-slot='{item}'>
    //  <span>{{item}}</span>
    // <list/>

    app.component('list', test);
    app.mount('#root')

```
### 动态组件
* 动态组件：根据数据的变化，使用component这个标签，来随时动态的切换组件
* keep-alive标签可以缓存input框中的内容，切回来以后依然保存值
```js
 const test = {
        template: `
            <input />
        `
    }
    const app = Vue.createApp({
        data(){
            return {
                currentItem:'input-item'
            }
        },
        methods:{
            handleClick(){
                this.currentItem= this.currentItem==='input-item'?'common-item':'input-item'
            }
        },
        template: `
             <keep-alive>
                <component :is='currentItem'/>
             </keep-alive>   
            <button @click='handleClick'> 切换</button>
            `
    })
    app.component('common-item', {
        template: `     
             <div> hello world</div>
            `
    });

    app.component('input-item', test);
    app.mount('#root')
```
### 异步组件
* 异步组件: 是异步执行组件的逻辑
```js
    const AsynCommonItem = Vue.defineAsyncComponent(()=>{
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve({
                        template:`<div>这是一个异步组件</div>`
                    })
                },4000)
            })
    })

    const app = Vue.createApp({
        template: `
                <common-item />
                <asyn-common-item/>
            `
    })
    app.component('common-item', {
        template: `     
             <div> hello world</div>
            `
    });
    app.component('asyn-common-item',AsynCommonItem)
  
    app.mount('#root')
```

## 动画/过渡效果

### 基础过渡动画绑定事件

#### 使用class
* return animate里面的变量会把css里面声明的赋给div
```css
       @keyframes leftToRight {
            0%{
                transform: translateX(-100px);
            }
            50%{
                transform: translateX(100px);
            }
            100%{
                transform: translateX(0);
            }
        }
        
        .animation{
            animation: leftToRight 3s;
        }
        .transition{
            transition: 3s background-color ease;
        }
        .blue{
            background: blue;
        }
        .green{
            background: green;
        }
```
```js
//过渡、动画
    const app = Vue.createApp({
        data(){
            return {
                animate:{
                    transition:true,
                    animation: true,
                    blue:true,
                    green:false
                },
            }
        },
        methods:{
            handleClick(){
                this.animate.blue = !this.animate.blue; 
                this.animate.green = !this.animate.green;
            }
        },
        template: `
            <div>
              <div :class='animate' >hello world</div>
              <button @click='handleClick'>切换</button>
            </div>   

            `
    })
   
    app.mount('#root')

```
#### 使用style

* 通过 :style 和：class可以将对象animate或者styleObj动态添加到div上
```js
  const app = Vue.createApp({
        data(){
            return {
                animate:{
                    transition:true,
                    animation: true,
                    blue:true,
                    green:false
                },
                styleObj:{
                    background:"blue"
                }
            }
        },
        methods:{
            handleClick(){
                this.styleObj.background = this.styleObj.background=='blue'?"green":"blue"
            }
        },
        template: `
            <div>
              <div class='transition' :style='styleObj' >hello world</div>
              <button @click='handleClick'>切换</button>
            </div>   

            `
    })

```
### 单元素组件的过渡
* 通过transition标签使得里面的元素在v-if或者v-show的时候添加动画效果
* 如果transition name='hello'标签使用了name,那么css的v-enter-active需要修改为 hello-enter-active
```css
* 也可以在transition上声明 enter-active-class='hello'
 @keyframes shake{
            0%{
                transform: translateX(-100px);
            }
            50%{
                transform: translateX(-50px);
            }
            100%{
                transform: translateX(50px);
            }
        }
        .v-enter-from{}
        .v-enter-to{}
        .v-enter-active{
            animation:shake 3s;
        }
        .hello-enter-active{
            animation:shake 3s;
        }
       .v-leave-active{
        animation:shake 3s;
       }
```
```js
  //单元素单组件入场和出场动画
    const app = Vue.createApp({
        data(){
            return {
               show: false
            }
        },
        methods:{
            handleClick(){
                this.show = !this.show;
            }
        },
        template: `
            <div>
              <transition name='hello'>
                <div v-if='show'>hello world</div>
              </transition>
              <button @click='handleClick'>切换</button>
            </div>   
            `
    })
   
    app.mount('#root')
```
* 如果动画和过渡时间不一致,在transition标签上加上 type='transition'，会以transition的时间为准，同理如果是animation
* 使用:duration = "1000"可以同时控制过渡和动画时间为1秒，:duration 可以接收对象{enter:1000,leave:3000}控制入场和出场

### 使用js编写过渡动画
* 使用vue的钩子实现js的动画效果，性能并不如css
```js
 //单元素单组件入场和出场动画
    const app = Vue.createApp({
        data(){
            return {
               show: false
            }
        },
        methods:{
            handleClick(){
                this.show = !this.show;
            },
            handleBeforeEnter(el){
                el.style.color ='red'
            },
            handleEnterActive(el,done){
              const animation = setInterval(()=>{
                    const color = el.style.color;
                    if(color ==='red'){
                        el.style.color ='blue';
                    }else{
                        el.style.color ='red'
                    }
                },1000)
                setTimeout(() => {
                    clearInterval(animation);
                    done();
                },5000)
            },
            handleEnterEnd(){
                console.log(123)
            }
           
        },
        template: `
            <div>
              <transition 
                :css='false'
                @before-enter='handleBeforeEnter'   el
                @enter='handleEnterActive'  el done(执行完成的回调)
                @after-enter ="handleEnterEnd" el
                @before-leave=
                @leave=
                @leave-after=
              >
                <div v-show='show'>hello world</div>
              </transition>
              <button @click='handleClick'>切换</button>
            </div>   
            `
    })
   
    app.mount('#root')
```
### 列表动画
```css
.list-item{
           display: inline-block;
           margin-right: 1em;
       }
       .v-enter-from{
           opacity: 0;
           transform: translateY(30px);
       }
       .v-enter-active{
           transition: all 1s ease-in;
       }
       .v-enter-to{
           opacity: 1;
           transform: translateY(0);
       }
       .v-move{           //这个属性默认是列表的其他元素的动画效果
           transition: all 1s ease-in;
       }
```
* 注意：使用transition-group里面的元素必须要写:key="item"否则会报错
```js
 //列表动画的实现
    const app = Vue.createApp({
        data(){
            return {
               list: [1,2,3,4,5,6]
            }
        },
        methods:{
           handleClick(){
               this.list.unshift(this.list.length +1)
           }
           ,
        },
        template: `
            <div>
             <transition-group>   
              <span class='list-item' v-for='item in list' :key="item">{{item}}</span> 
             </transition-group>
              <button @click='handleClick'>增加</button>
            </div>   
            `
    })
   
```
### 状态动画
* 类似于数字滚动的效果
```js
  const app = Vue.createApp({
        data(){
            return {
               number:1,
               animateNumber:1
            }
        },
        methods:{
           handleClick(){
               this.number = 10;
               if(this.animateNumber>=10){
                   return false;
               }
               let currentNumber = this.animateNumber;
               const animation = setInterval(()=>{
                   
                   this.animateNumber +=1;
                   if(this.animateNumber === this.number){
                       clearInterval(animation);
                   }
               },100)
           }
           ,
        },
        template: `
            <div>
               <span>{{animateNumber}}</span>
              <button @click='handleClick'>增加</button>
            </div>   
            `
    })
   
    app.mount('#root')
```